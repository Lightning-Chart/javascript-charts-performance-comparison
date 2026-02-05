# Public comparison of LightningChart® JS performance against other JavaScript charting libraries.

LightningChart JS is a performance-oriented data visualization solution for JavaScript.
The purpose of this open-source repository is to display the performance differences between LightningChart JS and just about every viable alternative in JavaScript charting market.

This test suite covers **24**[\*](#on-which-basis-were-the-solutions-included-in-testing-selected) **different JavaScript-based data visualization solutions**:

- [LightningChart® JS](https://lightningchart.com/js-charts/) (v9.1.0)
- [Highcharts](https://www.highcharts.com/integrations/javascript/) (v13.1.1)
- [amCharts](https://www.amcharts.com/javascript-charts/) (v5.21.5)
- [Plotly](https://plotly.com/javascript/) (v4.2.0)
- [Apache ECharts](https://echarts.apache.org/en/index.html) (v6.1.0)
- [dvxCharts](https://www.dvxcharts.com/) (v5.1.0.0)
- [SciChart.JS](https://www.scichart.com/javascript-chart-features/) (v6.0.15)
- [Dygraphs](https://dygraphs.com/) (v2.2.2)
- [CanvasJS](https://canvasjs.com/) (v3.17.9)
- [ZingChart](https://www.zingchart.com/) (v2.9.16-1)
- [C3.js](https://c3js.org/) (v0.7.20)
- [Taucharts](https://taucharts.com/) (v2.8.0)
- [Shield UI](https://www.shieldui.com/products/chart) (v1.7.45)
- [μPlot](https://github.com/leeoniya/uPlot) (v1.6.32)
- [AnyChart](https://www.anychart.com/) (v9.0.0)
- [ApexCharts.js](https://apexcharts.com/) (v8.7.0)
- [DevExtreme](https://js.devexpress.com/jQuery/) (v26.1.6)
- [Chart.js](https://www.chartjs.org/) (v4.6.1)
- [TOAST UI](https://ui.toast.com/tui-chart) (v4.6.1)
- [Smoothie Charts](http://smoothiecharts.org/) (v1.36.1)
- [Epoch](https://epochjs.github.io/epoch/) (v0.8.4)
- [Google Charts](https://developers.google.com/chart) (v52)
- [FusionCharts (FusionTime)](https://www.fusioncharts.com/fusiontime) (v4.2.3)
- [ChartGPU](https://github.com/ChartGPU/ChartGPU/tree/main) (v0.4.0)

**3 different performance metrics**:

1. Data Loading Speed
2. Streaming Data Performance
3. Maximum Data Capacity

and **5 different use cases**:

1. Line charts
2. Scatter charts
3. Area charts
4. Step charts
5. Spline charts

**Last update: 16th November 2026**

Some important performance metrics are still outside the scope of this benchmark suite, such as: interactions performance (panning, zooming, changing time view, using cursor, etc.) and dynamic resize performance (resizing window).

## Disclaimer

Without context and numbers, users have a very difficult time understanding actual performance differences between solutions. Unfortunately, it is excessively common for products to be marketed with claims such as "Extreme Performance", or "5x More Performance". Yet, when comparing the same application it may perform very badly compared to another solution.

This is the very reason, why this project exists - to evolve from the empty claims to **proven, reproducable, numerical test results** and contribute to a clearer understanding of performance in this industry, guided by factual reporting. We do not claim any trademarks of competing companies mentioned, and all such trademarks are the property of their respective owners.

We have invested a lot of effort in implementing the 120 different test applications (24 libraries, 5 use cases for each). If you find any problems in our benchmark code, let us know by opening an issue in GitHub.

The test measurements are gathered using an automated benchmark script, which means that there can be no bias from:

- Using different screen/monitor sizes (hardcoded test window size for all tests)
- Human error in measurement (script does all measurements the same way)
- Accumulating resource load (every benchmark is run in a fresh sandbox environment)

The performance comparison project is to be used only for **comparing** performance benchmarks within 1 run. The scores can't be reliably used for later analysis between different machines, hardware or product versions.

## Summary of results

- On average, LightningChart JS loads data 10380 times faster than other data visualization solutions.
- On average, LightningChart JS is 676560 times more performant than other data visualization solutions when it comes to streaming data applications.
- On average, LightningChart JS can display 109010 times larger data sets than other data visualization solutions.

## Data Loading Speed

How fast can each data visualization solution do a cold-start, load a static data set and display the data visualization on the screen? ([\*](#what-is-included-in-data-loading-speed-test-loadtimeseconds))

Data loading speed score is defined as

<!-- numChannels x dataPerCh / loadTimeSeconds -->

$$
\frac{{\text{numChannels} \times \text{dataPerCh}}}{{\text{loadTimeSeconds}}}
$$

In the below table you can see how other solutions Loading speed results fare against LightningChart JS.

| Solution          | Line Charts      | Scatter Charts | Area Charts     | Spline Charts    | Step Charts     |
| :---------------- | :--------------- | :------------- | :-------------- | :--------------- | :-------------- |
| LightningChart JS | Fastest          | Fastest        | Fastest         | Fastest          | Fastest         |
| ChartGPU          | 38.7x slower     | -              | 39.8x slower    | 40.0x slower     | 80.5x slower    |
| SciChart.JS       | 9.2x slower      | 1.7x slower    | 7.6x slower     | 7172.2x slower   | 8.3x slower     |
| amCharts          | 3206.4x slower   | 231.0x slower  | 3436.8x slower  | 3317.6x slower   | 3586.4x slower  |
| AnyChart          | 8023.6x slower   | 1099.8x slower | 9185.9x slower  | 9588.3x slower   | 9326.4x slower  |
| ApexCharts.js     | 34790.8x slower  | 2499.9x slower | 43961.3x slower | -                | 33967.8x slower |
| C3.js             | 10660.8x slower  | 510.0x slower  | 10708.9x slower | 10830.4x slower  | 9228.8x slower  |
| CanvasJS          | 2397.2x slower   | 29.0x slower   | 2812.6x slower  | 3057.4x slower   | 2440.6x slower  |
| Chart.js          | -                | 454.2x slower  | 9180.5x slower  | -                | -               |
| DevExtreme        | 6967.8x slower   | -              | 7509.1x slower  | 15419.8x slower  | 13420.3x slower |
| dvxCharts         | 187.1x slower    | -              | 356.9x slower   | 25295.0x slower  | 198.5x slower   |
| Dygraphs          | 174.7x slower    | 37.9x slower   | 174.9x slower   | 183.4x slower    | 155.7x slower   |
| Apache ECharts    | 278.8x slower    | -              | 301.8x slower   | 283.8x slower    | 293.0x slower   |
| FusionCharts      | 101481.6x slower | -              | 99015.9x slower | 100252.6x slower | 98447.1x slower |
| Google Charts     | 9682.8x slower   | 800.6x slower  | 10350.2x slower | 10233.4x slower  | -               |
| Highcharts        | 1175.2x slower   | 478.3x slower  | 1838.3x slower  | 1654.9x slower   | 1479.4x slower  |
| Plotly            | 120.0x slower    | 743.3x slower  | 117.0x slower   | 1519.3x slower   | 680.3x slower   |
| Shield UI         | 1337.6x slower   | 519.7x slower  | 1625.0x slower  | 2401.5x slower   | 1826.4x slower  |
| Smoothie Charts   | -                | -              | -               | -                | -               |
| Taucharts         | 48027.6x slower  | 2464.1x slower | 47149.6x slower | 47380.9x slower  | 45688.6x slower |
| TOAST UI          | 5879.0x slower   | 658.9x slower  | 6792.0x slower  | 5892.9x slower   | -               |
| μPlot             | 7.5x slower      | 43.7x slower   | 7.8x slower     | 86.0x slower     | 55.5x slower    |
| ZingChart         | 2372.4x slower   | 801.9x slower  | 2635.9x slower  | 2334.5x slower   | 2595.6x slower  |

**On average, LightningChart JS loads data 10380 times faster than other data visualization solutions.**

[More information how these results were compiled](#more-information-about-data-loading-speed-results).

## Streaming Data Performance

How efficiently can each data visualization solution consume and display **streaming data** (data points coming in very small time intervals)?

Performance score is defined as

<!-- numChannels x newDataPerSecond x FPS -->

$$
\text{numChannels} \times \text{newDataPerSecond} \times \text{FPS}
$$

In the below table you can see how other solutions Performance results fare against LightningChart JS.

| Solution          | Line Charts     | Scatter Charts | Area Charts   | Spline Charts   | Step Charts    |
| :---------------- | :-------------- | :------------- | :------------ | :-------------- | :------------- |
| LightningChart JS | Best score      | Best score     | Best score    | Best score      | Best score     |
| ChartGPU          | 40x worse       | -              | 460x worse    | 40x worse       | 730x worse     |
| SciChart.JS       | 200x worse      | 2.9x worse     | 130x worse    | 7720x worse     | 130x worse     |
| amCharts          | 199310x worse   | 1590x worse    | 144810x worse | 204910x worse   | 148600x worse  |
| AnyChart          | 1308180x worse  | 30230x worse   | 988390x worse | 1462490x worse  | 950400x worse  |
| ApexCharts.js     | 919470x worse   | 16270x worse   | 617850x worse | -               | 645270x worse  |
| C3.js             | 249980x worse   | 1670x worse    | 180790x worse | 271430x worse   | 141110x worse  |
| CanvasJS          | 333330x worse   | 810x worse     | 156560x worse | 491300x worse   | 221490x worse  |
| Chart.js          | -               | 180x worse     | 14370x worse  | -               | -              |
| DevExtreme        | 11446820x worse | -              | 567800x worse | 21396880x worse | 6350580x worse |
| dvxCharts         | 6790x worse     | -              | 8760x worse   | 754110x worse   | 8450x worse    |
| Dygraphs          | 2720x worse     | 200x worse     | 2520x worse   | 6340x worse     | 3840x worse    |
| Apache ECharts    | 18830x worse    | -              | 17310x worse  | 25120x worse    | 13950x worse   |
| FusionCharts      | -               | -              | -             | -               | -              |
| Google Charts     | 472760x worse   | 4820x worse    | 333820x worse | 503970x worse   | -              |
| Highcharts        | 59870x worse    | 3290x worse    | 53820x worse  | 92280x worse    | 48170x worse   |
| Plotly            | 125540x worse   | 18690x worse   | 90840x worse  | 297980x worse   | 78610x worse   |
| Shield UI         | 112890x worse   | 6590x worse    | 81330x worse  | 188490x worse   | 81060x worse   |
| Smoothie Charts   | 7500x worse     | -              | 5000x worse   | 7500x worse     | 5010x worse    |
| Taucharts         | 990050x worse   | 7790x worse    | 738320x worse | 1037370x worse  | 670960x worse  |
| TOAST UI          | -               | -              | -             | -               | -              |
| μPlot             | 4260x worse     | 410x worse     | 2990x worse   | 19020x worse    | 11040x worse   |
| ZingChart         | 1087840x worse  | 36080x worse   | 997730x worse | 1342220x worse  | 923140x worse  |

**On average, LightningChart JS is 676560 times more performant than other data visualization solutions when it comes to streaming data applications.**

[More information how these results were compiled](#more-information-about-streaming-data-performance-results).

## Maximum Data Capacity

How large data sets can be visualized with each solution?
Scores are measured as number of data points across all channels.

In the below table you can see how other solutions data capacities fare against LightningChart JS.

## Maximum Data Capacity

| Solution          | Line Charts           | Scatter Charts        | Area Charts           | Spline Charts         | Step Charts           |
| :---------------- | :-------------------- | :-------------------- | :-------------------- | :-------------------- | :-------------------- |
| LightningChart JS | Largest data capacity | Largest data capacity | Largest data capacity | Largest data capacity | Largest data capacity |
| ChartGPU          | 80.0x smaller         | -                     | 80.0x smaller         | 80.0x smaller         | 80.0x smaller         |
| SciChart.JS       | 80.0x smaller         | 30.0x smaller         | 80.0x smaller         | 80.0x smaller         | 80.0x smaller         |
| amCharts          | 16000.0x smaller      | 1500.0x smaller       | 16000.0x smaller      | 16000.0x smaller      | 16000.0x smaller      |
| AnyChart          | 160000.0x smaller     | 15000.0x smaller      | 160000.0x smaller     | 160000.0x smaller     | 160000.0x smaller     |
| ApexCharts.js     | 160000.0x smaller     | 150000.0x smaller     | 160000.0x smaller     | -                     | 160000.0x smaller     |
| C3.js             | 16000.0x smaller      | 1500.0x smaller       | 16000.0x smaller      | 16000.0x smaller      | 16000.0x smaller      |
| CanvasJS          | 16000.0x smaller      | 150.0x smaller        | 16000.0x smaller      | 16000.0x smaller      | 16000.0x smaller      |
| Chart.js          | -                     | 1500.0x smaller       | 16000.0x smaller      | -                     | -                     |
| DevExtreme        | 16000.0x smaller      | -                     | 160000.0x smaller     | 160000.0x smaller     | 160000.0x smaller     |
| dvxCharts         | 1600.0x smaller       | -                     | 1600.0x smaller       | 160000.0x smaller     | 1600.0x smaller       |
| Dygraphs          | 1600.0x smaller       | 150.0x smaller        | 1600.0x smaller       | 1600.0x smaller       | 1600.0x smaller       |
| Apache ECharts    | 1600.0x smaller       | -                     | 1600.0x smaller       | 1600.0x smaller       | 1600.0x smaller       |
| FusionCharts      | 1600000.0x smaller    | -                     | 1600000.0x smaller    | 1600000.0x smaller    | 1600000.0x smaller    |
| Google Charts     | 16000.0x smaller      | 15000.0x smaller      | 16000.0x smaller      | 16000.0x smaller      | -                     |
| Highcharts        | 16000.0x smaller      | 1500.0x smaller       | 16000.0x smaller      | 16000.0x smaller      | 16000.0x smaller      |
| Plotly            | 320.0x smaller        | 15000.0x smaller      | 320.0x smaller        | 16000.0x smaller      | 16000.0x smaller      |
| Shield UI         | 16000.0x smaller      | 1500.0x smaller       | 16000.0x smaller      | 16000.0x smaller      | 16000.0x smaller      |
| Smoothie Charts   | 160000.0x smaller     | -                     | 160000.0x smaller     | 160000.0x smaller     | 160000.0x smaller     |
| Taucharts         | 160000.0x smaller     | 15000.0x smaller      | 160000.0x smaller     | 160000.0x smaller     | 160000.0x smaller     |
| TOAST UI          | 160000.0x smaller     | 15000.0x smaller      | 160000.0x smaller     | 160000.0x smaller     | -                     |
| μPlot             | 80.0x smaller         | 37.5x smaller         | 80.0x smaller         | 84.2x smaller         | 72.7x smaller         |
| ZingChart         | 16000.0x smaller      | 15000.0x smaller      | 16000.0x smaller      | 16000.0x smaller      | 16000.0x smaller      |

**On average, LightningChart JS can process 109010 times larger data sets than other data visualization solutions.**

[More information how these results were compiled](#more-information-about-max-data-capacity-results).

This test was performed with ~40 GB RAM free on the machine. With WASM64 mode, LCJS can utilize ALL available RAM on the machine which means that the data capacity test result scales up linearly with amount of RAM.
The same is **not** true for any other library.

## LightningChart JS Capabilities

These are the most impressive previously recorded feats with LightningChart JS.
Obviously, the achievable results differ based on hardware so we can't claim that everyone can reproduce these. The results in question were recorded with a medium-level desktop computer oriented for software development.

- Maximum confirmed data set visualized as an interactive Line Chart: **29 000 million data points**
- Massive data set with 100 million data points can be loaded and displayed from cold start in **1.07 seconds**
- LightningChart JS can display 200 channels simultaneously with 50 000 Hz data stream rate per channel, adding up to a grand total of **10 million data points consumed every second and refreshed at 60 FPS**.

## Clarifications

### On which basis were the solutions included in testing selected?

We have included almost every JavaScript-based data visualization library that we could find, as long as there was even small hints about active usage.

- Both commercial and non-commercial libraries.
- Open-source and closed source libraries.
- Real-time oriented hardware accelerated libraries.
- Almost 10 year old industry favorites.
- Even small players, like `Epoch` and `ChartGPU`.

### What is included in Data Loading Speed test "loadTimeSeconds"?

- Setting up rendering frameworks, licenses and all steps that are required charts to be displayed.
- All chart processing time between initiating the chart creation and displaying it, including chart method calls.
- Any extra waiting time that is required before the chart is visible on the display.

### More information about Data Loading Speed results

For each solution and tested feature, the same test routine is executed.

1. First, find the approximate pain point (data set size) where the solution & feature combination starts to show visible delay in processing.

This is done by starting with small data set size, and steadily increasing it until the `loadTimeSeconds` measurement becomes higher than 3 seconds, but no higher than 10 seconds.
The tested data set sizes are always `[200, 1_000, 10_000, 100_000, 1_000_000, 5_000_000, 10_000_000, 50_000_000, 100_000_000]`.
Number of channels is initially `10`. Increased by increments of `10` if larger data sets needed.

2. Repeat the test 5 times.

3. Use the median of measured `loadTimeSeconds` scores as the final value used for calculating the Data Loading Speed score.

$$
\frac{{\text{numChannels} \times \text{dataPerCh}}}{{\text{loadTimeSeconds}}}
$$

4. The final score indicates how fast the chart library can process and display data. This score can be compared between different charts linearly, even if they work with completely different data set sizes.

"-" result indicates that the particular combination of test type, solution and tested feature is not supported by the benchmark app. Full support table can be found [here](https://github.com/Lightning-Chart/javascript-charts-performance-comparison/blob/main/supported.md).

> The Data Loading Speed benchmarks are only to be used for COMPARISON purposes!

The benchmarks are NOT a fair indication of "how fast solution X can load data".
The test is performed like this:

1. Create chart with all the data supplied immediately.
2. Wait for next animation frame.
3. Take a screenshot of the whole page using Puppeteer.

As you can see, taking the screenshot is extra loading time that is not necessary in normal use cases.
However, this is required to confirm that the chart is ready and still responsive.

This also doesn't necessarily mean that the chart is visible on the physical display - the Puppeteer screenshot can finish successfully with the chart properly displayed BEFORE it appears on the display. This seems to give some biased advantage to slower SVG/Canvas based charts.

### More information about Streaming Data Performance results

For each solution and tested feature, the same test routine is executed.

1. First, find the approximate pain point (data set size) where the solution & feature combination starts to clearly struggle.

This is done by starting with small data set size, and steadily increasing it until the `FPS` measurement drops below `55`.
The tested data set sizes are always `[200, 1_000, 10_000, 100_000, 1_000_000, 5_000_000, 10_000_000, 50_000_000, 100_000_000]`.
Number of channels is initially `10`. Increased by increments of `10` if larger data sets needed. Stream rate is set to `1/10`th of the total displayed data count per channel.

2. Run the streaming performance test uninterrupted for 15 seconds, measuring FPS during the entire time. At test end, considering count of displayed frames and test duration, calculate FPS value used for calculating the Streaming Data Performance score.

$$
\text{numChannels} \times \text{newDataPerSecond} \times \text{FPS}
$$

3. The final score indicates how much incoming data the chart can handle in a scrolling update manner (display new data, roll old data out). The value combines both amount of incoming data as well as how well the chart is holding up (FPS).

"-" result indicates that the particular combination of test type, solution and tested feature is not supported by the benchmark app. Full support table can be found [here](https://github.com/Lightning-Chart/javascript-charts-performance-comparison/blob/main/supported.md).

Frames are counted using `requestAnimationFrame`. This assumes that the chart does not delay displaying data updates in some asynchronous manner.

### More information about Max Data Capacity results

For each solution and tested feature, the same test routine is executed.

1. Find the highest amount of data points that the chart can successfully load and display without crashing.

This is done by starting with small data set size, and steadily increasing it until the chart can no longer perform the test.
The tested data set sizes are `[500, 1_000, 10_000, 100_000, 1_000_000, 5_000_000, 10_000_000, 50_000_000, 100_000_000]` with `10` channels.

The solutions capable of handling large data sets (atm. LightningChart JS, SciChart.JS, μPlot and ChartGPU) are additionally tested further in a max data capacity mode, with exactly the same rules for each of them:

- Data is given to the chart in chunks with the library's own data input method, waiting for the chart to render after each chunk.
- The test fails if no progress is made within 60 seconds.
- The data set size per channel is increased up to `100_000_000`, after which the number of channels is increased.
- The X axis is fixed to the full data range, and the result is only accepted if the rendered chart shows data across the whole chart area. This rejects results where a chart silently draws nothing or only part of the data.

"-" result indicates that the particular combination of test type, solution and tested feature is not supported by the benchmark app. Full support table can be found [here](https://github.com/Lightning-Chart/javascript-charts-performance-comparison/blob/main/supported.md).

## Visualization errors

All visualization errors encountered during the tests are listed [here](https://github.com/Lightning-Chart/javascript-charts-performance-comparison/blob/main/extra-info.md).

## Replicating performance test results

All benchmark code is open-source and found in this repository under `bench` folder.

You can run tests with commands `npm i` and `npm start`

The test can be configured by editing `bench/index.js` `config` variable.

Please remember:

- Results are hardware specific. They can only be compared between measurements done with 1 same device.
- While test measurements are recorded automatically, every single test run has to be manually verified
    - If chart crashes or doesn't show completely then the measurement is not valid.
- [Full disclaimer](#disclaimer)

Running all the tests according to the documented procedure takes about 7 hours, not counting writing down and analyzing the results.
