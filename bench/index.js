/* eslint-disable no-async-promise-executor */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-promise-executor-return */
import puppeteer from 'puppeteer'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { PNG } from 'pngjs'

const findNewerChrome = () => {
    if (process.env.CHROME_PATH) return process.env.CHROME_PATH
    const installed = [
        path.join(process.env['PROGRAMFILES'] || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe'),
        path.join(process.env['PROGRAMFILES(X86)'] || 'C:/Program Files (x86)', 'Google/Chrome/Application/chrome.exe'),
        path.join(process.env['LOCALAPPDATA'] || '', 'Google/Chrome/Application/chrome.exe'),
    ].find((p) => fs.existsSync(p))
    if (installed) return installed
    try {
        const cacheDir = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome')
        if (!fs.existsSync(cacheDir)) return undefined
        const versions = fs
            .readdirSync(cacheDir)
            .map((d) => {
                const m = d.match(/^win64-(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
                return m ? { name: d, v: m.slice(1).map(Number) } : null
            })
            .filter(Boolean)
            .sort((a, b) => {
                for (let i = 0; i < 4; i++) if (a.v[i] !== b.v[i]) return b.v[i] - a.v[i]
                return 0
            })
        for (const v of versions) {
            const exe = path.join(cacheDir, v.name, 'chrome-win64', 'chrome.exe')
            if (fs.existsSync(exe)) return exe
        }
    } catch {}
    return undefined
}

const config = {
    windowWidth: 2000,
    windowHeight: 1000,
    repeatCount: 1,
    channels: 10,
    appendTestDurationMs: 0,
    save: false,
    test: 'test-lcjs.html',
    dataSetSize: 1_000_000,
    maxCapacityTest: false,
    maxCapacityChunkSize: 5_000_000,
    disableTimeouts: false,
    feature: 'line',
    timeoutMs: 15000,
}
const serverPort = Number(process.env.PORT) || 8080

// When a test errors/times out the page is closed while its handlers may still be awaiting page calls. Those
// rejections are expected - don't let them crash the process (which would discard the remaining repeats).
process.on('unhandledRejection', (reason) => {
    console.log('unhandled rejection (ignored)', String(reason).slice(0, 200))
})

const browser = await puppeteer.launch({
    headless: false,
    executablePath: findNewerChrome(),
    args: [
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--override-plugin-power-saver-for-testing=never',
        '--disable-extensions-http-throttling',
        '--enable-unsafe-webgpu',
        '--enable-features=Vulkan',
        '--ignore-gpu-blocklist',
        // Keep rendering at full rate when the window is covered, the screen is locked or the display is off.
        '--disable-backgrounding-occluded-windows',
        '--disable-features=CalculateNativeWinOcclusion',
        `--window-size=${config.windowWidth + 100},${config.windowHeight + 200}`,
    ],
    // defaultViewport: null,
    // NOTE: For debugging
    // slowMo: 500,
})

const median = (numbers) => {
    const len = numbers.length
    if (len % 2 === 1) {
        return numbers[Math.floor(len / 2)]
    }
    return (numbers[len / 2 - 1] + numbers[len / 2]) / 2
}

const runTest = (config) => {
    config.appendPointsPerSecond = config.appendPointsPerSecond !== undefined ? config.appendPointsPerSecond : (config.dataSetSize * 1) / 10
    const scheduleTimeout = (callback, delayMs) => (config.disableTimeouts ? undefined : setTimeout(callback, delayMs))

    return new Promise(async (resolve) => {
        const page = await browser.newPage()
        let timeout
        const loadingTimeoutMs = config.maxCapacityTest ? Math.max(config.timeoutMs || 15_000, 30_000) : config.timeoutMs || 15_000
        const setLoadingTimeout = () => {
            clearTimeout(timeout)
            timeout = scheduleTimeout(async () => {
                console.log('timeout B')
                resolve({ error: true })
                await page.close()
            }, loadingTimeoutMs)
        }
        page.on('console', async (msg) => {
            const text = msg.text()
            console.log('stdout', text)
            if (msg.type() === 'error' && !(text.includes('404') || text.includes('ERR_CONNECTION_REFUSED'))) {
                console.error(`Error occurred: ${text}`)
                // await new Promise(resolve => setTimeout(resolve, 100000))
                clearTimeout(timeout)
                resolve({ error: true })
                await page.close()
            }
        })
        page.on('error', async (event) => {
            // Puppeteer emits 'error' when the page crashes (e.g. Chrome's "Out of Memory" error page). Fail immediately
            // instead of waiting for the loading timeout.
            console.log('PAGE CRASHED', String(event))
            clearTimeout(timeout)
            resolve({ error: true })
            await page.close().catch(() => {})
        })
        await page.setViewport({
            width: config.windowWidth,
            height: config.windowHeight,
            deviceScaleFactor: 0,
        })
        await page.evaluate(() => {
            window.moveTo(0, 0)
            window.resizeTo(screen.width, screen.height)
        })
        // await new Promise((resolve) => setTimeout(resolve, 10_000));
        await page.exposeFunction('error', async () => {
            console.log('error reported by bench app')
            resolve({ error: true })
            await page.close()
        })
        await page.exposeFunction('testSetup', () => config)
        await page.exposeFunction('testReadyToBegin', async () => {
            const metrics0 = await page.metrics()
            let metrics1
            let loadTimeSeconds
            let loadJSHeapUsedSize
            let loadScriptDurationSeconds
            let loadingTestFinished = false
            await page.exposeFunction('loadingTestFinished', async (testStart, testEnd) => {
                const tReceivedMessage = performance.now()
                // Take a full screen screenshot using puppeteer. This forces the on-going GPU process to unclog in order to read-back pixel data from the display.
                const buffer = await page.screenshot({
                    type: 'png',
                })
                const tAppUnclogged = performance.now()
                const loadingSpeedResultMs = testEnd - testStart + (tAppUnclogged - tReceivedMessage)
                clearTimeout(timeout)
                timeout = scheduleTimeout(async () => {
                    console.log('timeout C')
                    resolve({ error: true })
                    await page.close()
                }, 5_000 + config.appendTestDurationMs)
                // NOTE: For debugging whether chart actually displayed the data
                // await page.screenshot({ path: 'screenshot.png', type: 'png' })
                metrics1 = await page.metrics()
                loadTimeSeconds = loadingSpeedResultMs / 1000
                loadJSHeapUsedSize = metrics1.JSHeapUsedSize - metrics0.JSHeapUsedSize
                loadScriptDurationSeconds = metrics1.ScriptDuration - metrics0.ScriptDuration

                // Confirm that the chart was visible in the screenshot by analysing the png.
                // We simply check that there is any non white pixel in the screenshot.
                // If some chart has any scenario where this might be the case even before the chart is visible, then those must be confirmed individually.
                const png = PNG.sync.read(buffer)
                let anyNonWhitePixel = false
                for (var y = 0; y < png.height; y++) {
                    for (var x = 0; x < png.width; x++) {
                        var i = (png.width * y + x) << 2
                        const r = png.data[i]
                        const g = png.data[i + 1]
                        const b = png.data[i + 2]
                        const a = png.data[i + 3]
                        if (r !== 255 || g !== 255 || b !== 255) {
                            anyNonWhitePixel = true
                            break
                        }
                    }
                    if (anyNonWhitePixel) break
                }
                if (!anyNonWhitePixel) {
                    console.log('screenshot is completely white')
                    resolve({ error: true })
                    await page.close()
                }
                // Render check (every test of every library): the data must actually be drawn. Some libraries silently draw
                // nothing (or only part of the data) above their limits, and axes/labels alone pass the non-white check above.
                // Series are drawn in saturated colors, chart backgrounds/grids/labels are not, so require a minimum share of
                // saturated pixels. Runs on the screenshot taken above, after the load time was measured, so it does not
                // affect the measured results.
                {
                    let saturated = 0
                    for (let i = 0; i < png.data.length; i += 4) {
                        const r = png.data[i]
                        const g = png.data[i + 1]
                        const b = png.data[i + 2]
                        if (Math.max(r, g, b) - Math.min(r, g, b) > 80) saturated += 1
                    }
                    const share = saturated / (png.width * png.height)
                    // Coverage: drawn data spans the whole plot width (in max capacity mode every library's X axis is fixed
                    // to [0, dataSetSize], so a library that keeps only part of the data leaves part of the plot empty). Split the middle 80% of the width into 8 bands and require series-colored pixels in each
                    // one, so a library that keeps or draws only part of the data fails instead of passing on the rest.
                    const bands = 8
                    const bandShares = []
                    for (let band = 0; band < bands; band++) {
                        const x0 = Math.floor(png.width * (0.1 + (0.8 * band) / bands))
                        const x1 = Math.floor(png.width * (0.1 + (0.8 * (band + 1)) / bands))
                        let n = 0
                        for (let y = 0; y < png.height; y++)
                            for (let x = x0; x < x1; x++) {
                                const i = (png.width * y + x) << 2
                                const r = png.data[i]
                                const g = png.data[i + 1]
                                const b = png.data[i + 2]
                                if (Math.max(r, g, b) - Math.min(r, g, b) > 80) n += 1
                            }
                        bandShares.push(n / ((x1 - x0) * png.height))
                    }
                    const minBand = Math.min(...bandShares)
                    console.log(
                        `render check: series-colored pixels ${(share * 100).toFixed(2)} %, lowest band ${(minBand * 100).toFixed(2)} %`,
                    )
                    if (share < 0.002 || minBand < 0.002) {
                        console.log('render check FAILED: data was not drawn')
                        // Keep the screenshot of the failed render for inspection.
                        fs.writeFileSync(`${config.test}.png`, PNG.sync.write(png))
                        clearTimeout(timeout)
                        resolve({ error: true })
                        await page.close()
                        return
                    }
                }
                loadingTestFinished = true
                // For manual confirmation via file
                fs.writeFileSync(`${config.test}.png`, PNG.sync.write(png))
            })
            await page.exposeFunction('maxCapacityInputProgress', async () => {
                if (!loadingTestFinished) {
                    setLoadingTimeout()
                }
            })
            await page.exposeFunction('appendTestFinished', async (timestamp, appendFPS) => {
                if (!loadingTestFinished) {
                    if (!config.disableTimeouts) {
                        await new Promise((resolve) => setTimeout(resolve, 3000))
                    }
                }
                clearTimeout(timeout)
                const metrics2 = await page.metrics()
                const appendScriptDurationSeconds = metrics2.ScriptDuration - metrics1.ScriptDuration
                const appendJSHeapUsedSize = metrics2.JSHeapUsedSize - metrics1.JSHeapUsedSize
                await page.close()
                resolve({
                    loadTimeSeconds,
                    loadJSHeapUsedSize,
                    loadScriptDurationSeconds,
                    appendScriptDurationSeconds,
                    appendFPS,
                    appendJSHeapUsedSize,
                })
            })
            setLoadingTimeout()
            await page.evaluate(() => {
                requestAnimationFrame(() => {
                    window.testStart = window.performance.now()
                    window.testPerform()
                })
            })
        })
        timeout = scheduleTimeout(async () => {
            console.log('timeout A')
            resolve({ error: true })
            await page.close()
        }, 60_000)
        await page.goto(`http://localhost:${serverPort}/${config.test}`)
    })
}

const results = []
for (let i = 0; i < config.repeatCount; i += 1) {
    const result = await runTest(config)
    console.log(`\t${i + 1}/${config.repeatCount}`, result)
    if (result.error) {
        continue
    }
    results.push(result)
}

if (results.length > 0) {
    const loadTimeSeconds = median(results.map((test) => test.loadTimeSeconds))
    const loadJSHeapUsedSize = median(results.map((test) => test.loadJSHeapUsedSize))
    const loadScriptDurationSeconds = median(results.map((test) => test.loadScriptDurationSeconds))
    const appendScriptDurationSeconds = median(results.map((test) => test.appendScriptDurationSeconds))
    const appendFPS = median(results.map((test) => test.appendFPS))
    const appendJSHeapUsedSize = median(results.map((test) => test.appendJSHeapUsedSize))

    const testResults = {
        loadTimeSeconds,
        loadJSHeapUsedSize,
        loadScriptDurationSeconds,
        appendScriptDurationSeconds,
        appendFPS,
        appendJSHeapUsedSize,
    }
    console.log(`MEDIAN SCORE:${JSON.stringify(testResults)}`)

    if (config.save) {
        let data = {}
        const filePath = path.resolve(process.env.DATA_FILE || 'data.json')
        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath))
        }
        data[config.test] = data[config.test] || {}
        data[config.test][JSON.stringify(config)] = testResults
        fs.writeFileSync(filePath, JSON.stringify(data))
    }
}

await browser.close()
