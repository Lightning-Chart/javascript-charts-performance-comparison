// Standalone browser harness. Puppeteer replaces testSetup before this script runs.
const defaultStandaloneConfig = {
    windowWidth: 2000,
    windowHeight: 1000,
    repeatCount: 1,
    save: false,
    test: 'test-lcjs.html',
    channels: 10,
    dataSetSize: 10_000_000,
    appendPointsPerSecond: 10_000,
    appendTestDurationMs: 0,
    feature: 'line',
    maxCapacityTest: false,
    maxCapacityChunkSize: 2_000_000,
    disableTimeouts: false,
}

const readStandaloneConfig = () => {
    const params = new URLSearchParams(window.location.search)
    const config = { ...defaultStandaloneConfig }
    const numberKeys = new Set(['channels', 'dataSetSize', 'appendPointsPerSecond', 'appendTestDurationMs', 'maxCapacityChunkSize'])
    const booleanKeys = new Set(['maxCapacityTest', 'disableTimeouts'])

    for (const [key, value] of params) {
        if (numberKeys.has(key)) {
            const parsed = Number(value)
            if (Number.isFinite(parsed)) config[key] = parsed
        } else if (booleanKeys.has(key)) {
            config[key] = value === 'true' || value === '1'
        } else if (key === 'feature') {
            config.feature = value
        }
    }
    return config
}

window.testSetup =
    window.testSetup ||
    (() =>
        new Promise((resolve) => {
            const config = readStandaloneConfig()
            const getHeapUsedSize = () => window.performance.memory?.usedJSHeapSize ?? null
            const difference = (end, start) => (typeof end === 'number' && typeof start === 'number' ? end - start : null)
            let metrics0
            let metrics1
            let loadTimeSeconds
            let loadJSHeapUsedSize
            window.testReadyToBegin = () => {
                metrics0 = getHeapUsedSize()
                window.testStart = window.performance.now()
                window.testPerform()
                console.log('start', config)
            }
            window.loadingTestFinished = (tStart, tNow) => {
                metrics1 = getHeapUsedSize()
                loadTimeSeconds = (tNow - tStart) / 1000
                loadJSHeapUsedSize = difference(metrics1, metrics0)
                console.log('loading test', tNow - tStart)
            }
            window.maxCapacityInputProgress = (sampleCount) => {
                console.log('max-capacity progress', sampleCount, '/', config.dataSetSize)
            }
            window.appendTestFinished = (timestamp, appendFPS) => {
                console.log('test finished', { timestamp, appendFPS })
                const metrics2 = getHeapUsedSize()
                const testResults = {
                    loadTimeSeconds,
                    loadJSHeapUsedSize,
                    loadScriptDurationSeconds: null,
                    appendScriptDurationSeconds: null,
                    appendFPS,
                    appendJSHeapUsedSize: difference(metrics2, metrics1),
                }
                const dataEntry = {
                    [config.test]: {
                        [JSON.stringify(config)]: testResults,
                    },
                }
                console.log(`MANUAL DATA.JSON ENTRY:${JSON.stringify(dataEntry)}`)
            }
            window.error = (error) => {
                console.error('test error', error)
            }
            resolve(config)
        }))
