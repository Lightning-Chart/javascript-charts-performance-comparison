# Public comparison of LightningChart® JS performance against other JavaScript charting libraries.

LightningChart JS is a performance-oriented data visualization solution for JavaScript.
The purpose of this open-source repository is to display the performance differences between LightningChart JS and just about every viable alternative in JavaScript charting market.

This test suite covers **23**[\*](#on-which-basis-were-the-solutions-included-in-testing-selected) **different JavaScript-based data visualization solutions**:

- [LightningChart® JS](https://lightningchart.com/js-charts/) (v8.2.0)
- [Highcharts](https://www.highcharts.com/integrations/javascript/) (v12.5.0)
- [amCharts](https://www.amcharts.com/javascript-charts/) (v5.15.5)
- [Plotly](https://plotly.com/javascript/) (v3.3.1)
- [Apache ECharts](https://echarts.apache.org/en/index.html) (v6.0.0)
- [dvxCharts](https://www.dvxcharts.com/) (v5.1.0.0)
- [SciChart.JS](https://www.scichart.com/javascript-chart-features/) (v5.0.170)
- [Dygraphs](https://dygraphs.com/) (v2.2.1)
- [CanvasJS](https://canvasjs.com/) (v1.8.3)
- [ZingChart](https://www.zingchart.com/) (v2.9.16)
- [C3.js](https://c3js.org/) (v0.7.20)
- [Taucharts](https://taucharts.com/) (v2)
- [Shield UI](https://www.shieldui.com/products/chart) (v1.7.45)
- [μPlot](https://github.com/leeoniya/uPlot) (v1.6.32)
- [AnyChart](https://www.anychart.com/) (v8.14.1)
- [ApexCharts.js](https://apexcharts.com/) (v5.3.6)
- [DevExtreme](https://js.devexpress.com/jQuery/) (v25.2.3)
- [Chart.js](https://www.chartjs.org/) (v4.5.1)
- [TOAST UI](https://ui.toast.com/tui-chart) (v4.6.1)
- [Smoothie Charts](http://smoothiecharts.org/) (v1.36.1)
- [Epoch](https://epochjs.github.io/epoch/) (v0.8.4)
- [Google Charts](https://developers.google.com/chart) (April 2023 version - couldn't get latest version working, please open pull request)
- [FusionCharts (FusionTime)](https://www.fusioncharts.com/fusiontime) (v3.21.1 - couldn't get latest version working, please open pull request)

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

**Last update: 5th February 2026**

Some important performance metrics are still outside the scope of this benchmark suite, such as: interactions performance (panning, zooming, changing time view, using cursor, etc.) and dynamic resize performance (resizing window).

## Disclaimer

Without context and numbers, users have a very difficult time understanding actual performance differences between solutions. Unfortunately, it is excessively common for products to be marketed with claims such as "Extreme Performance", or "5x More Performance". Yet, when comparing the same application it may perform very badly compared to another solution.

This is the very reason, why this project exists - to evolve from the empty claims to **proven, reproducable, numerical test results** and contribute to a clearer understanding of performance in this industry, guided by factual reporting. We do not claim any trademarks of competing companies mentioned, and all such trademarks are the property of their respective owners.

We have invested a lot of effort in implementing the 115 different test applications (23 libraries, 5 use cases for each). If you find any problems in our benchmark code, let us know by opening an issue in GitHub.

The test measurements are gathered using an automated benchmark script, which means that there can be no bias from:

- Using different screen/monitor sizes (hardcoded test window size for all tests)
- Human error in measurement (script does all measurements the same way)
- Accumulating resource load (every benchmark is run in a fresh sandbox environment)

The performance comparison project is to be used only for **comparing** performance benchmarks within 1 run. The scores can't be reliably used for later analysis between different machines, hardware or product versions.

## Summary of results

- On average, LightningChart JS loads data 14410 times faster than other data visualization solutions.
- On average, LightningChart JS is 810420 times more performant than other data visualization solutions when it comes to streaming data applications.
- On average, LightningChart JS can display 90540 times larger data sets than other data visualization solutions.

## Data Loading Speed

How fast can each data visualization solution do a cold-start, load a static data set and display the data visualization on the screen? ([\*](#what-is-included-in-data-loading-speed-test-loadtimeseconds))

Data loading speed score is defined as

<!-- numChannels x dataPerCh / loadTimeSeconds -->

$$
\frac{{\text{numChannels} \times \text{dataPerCh}}}{{\text{loadTimeSeconds}}}
$$

In the below table you can see how other solutions Loading speed results fare against LightningChart JS.

| Solution          | Line Charts     | Scatter Charts | Area Charts     | Spline Charts   | Step Charts     |
| :---------------- | :-------------- | :------------- | :-------------- | :-------------- | :-------------- |
| LightningChart JS | Fastest         | Fastest        | Fastest         | Fastest         | Fastest         |
| SciChart.JS       | 7.7x slower     | 1.8x slower    | 6.2x slower     | 6174.6x slower  | 6.4x slower     |
| amCharts          | 3814.4x slower  | 626.2x slower  | 4489.3x slower  | 4344.9x slower  | 4469.5x slower  |
| AnyChart          | 8034.1x slower  | 3472.9x slower | 11319.5x slower | 10334.9x slower | 8742.1x slower  |
| ApexCharts.js     | 71193.1x slower | 8717.9x slower | 81194.9x slower | -               | 63855.9x slower |
| C3.js             | 15576.5x slower | 1258.4x slower | 17288.4x slower | 17232.2x slower | 12924.8x slower |
| CanvasJS          | 4633.2x slower  | 164.2x slower  | 4555.3x slower  | 5614.4x slower  | 4305.1x slower  |
| Chart.js          | -               | 1684.7x slower | 17707.9x slower | -               | -               |
| DevExtreme        | 7474.7x slower  | -              | 7950.2x slower  | 15657.7x slower | 12015.7x slower |
| dvxCharts         | 181.9x slower   | -              | 376.3x slower   | 21669.8x slower | 220.0x slower   |
| Dygraphs          | 129.7x slower   | 177.4x slower  | 147.6x slower   | 162.7x slower   | 113.5x slower   |
| Apache ECharts    | 294.1x slower   | -              | 372.7x slower   | 309.4x slower   | 276.2x slower   |
| Highcharts        | 1131.4x slower  | 1150.7x slower | 1921.4x slower  | 1581.3x slower  | 1272.8x slower  |
| Plotly            | 113.0x slower   | 1515.9x slower | 110.2x slower   | 2098.1x slower  | 799.7x slower   |
| Shield UI         | 1428.5x slower  | 1934.1x slower | 1667.0x slower  | 2416.7x slower  | 1641.4x slower  |
| Smoothie Charts   | -               | -              | -               | -               | -               |
| Taucharts         | 45954.8x slower | 3414.1x slower | 48565.6x slower | 47903.8x slower | 41681.5x slower |
| TOAST UI          | 23137.4x slower | 6303.1x slower | 80667.7x slower | 88110.1x slower | -               |
| μPlot             | 7.7x slower     | 14.0x slower   | 7.9x slower     | 102.0x slower   | 63.4x slower    |
| ZingChart         | 3232.6x slower  | 1257.9x slower | 3537.6x slower  | 3184.6x slower  | 3262.1x slower  |
| FusionCharts      | 86802.1x slower | -              | 84652.4x slower | 96044.7x slower | 80586.1x slower |
| Google Charts     | 17028.7x slower | 2264.8x slower | 18569.9x slower | 28325.4x slower | -               |

**On average, LightningChart JS loads data 14410 times faster than other data visualization solutions.**

[More information how these results were compiled](#more-information-about-data-loading-speed-results).

## Streaming Data Performance

How efficiently can each data visualization solution consume and display **streaming data** (data points coming in very small time intervals)?

Performance score is defined as

<!-- numChannels x newDataPerSecond x FPS -->

$$
\text{numChannels} \times \text{newDataPerSecond} \times \text{FPS}
$$

In the below table you can see how other solutions Performance results fare against LightningChart JS.

| Solution          | Line Charts    | Scatter Charts | Area Charts    | Spline Charts   | Step Charts     |
| :---------------- | :------------- | :------------- | :------------- | :-------------- | :-------------- |
| LightningChart JS | Best score     | Best score     | Best score     | Best score      | Best score      |
| SciChart.JS       | 130x worse     | 3.2x worse     | 130x worse     | 10280x worse    | 130x worse      |
| amCharts          | 224860x worse  | 3070x worse    | 246360x worse  | 253840x worse   | 274530x worse   |
| AnyChart          | 1212520x worse | 34140x worse   | 1312570x worse | 1369490x worse  | 1344730x worse  |
| ApexCharts.js     | 4627400x worse | 103240x worse  | 4473480x worse | -               | 4671600x worse  |
| C3.js             | 347380x worse  | 3790x worse    | 351500x worse  | 375030x worse   | 295570x worse   |
| CanvasJS          | 276230x worse  | 2120x worse    | 255270x worse  | 339460x worse   | 269720x worse   |
| Chart.js          | -              | 1960x worse    | 161670x worse  | -               | -               |
| DevExtreme        | 5727870x worse | -              | 588100x worse  | 12116490x worse | 12269600x worse |
| dvxCharts         | 204940x worse  | -              | 187060x worse  | 211180x worse   | 195900x worse   |
| Dygraphs          | 3620x worse    | 840x worse     | 4380x worse    | 7640x worse     | 5520x worse     |
| Apache ECharts    | 15590x worse   | -              | 22040x worse   | 19800x worse    | 16090x worse    |
| Highcharts        | 39310x worse   | 5780x worse    | 55560x worse   | 56780x worse    | 49500x worse    |
| Plotly            | 114150x worse  | 22410x worse   | 119180x worse  | 280660x worse   | 103290x worse   |
| Shield UI         | 187990x worse  | 11870x worse   | 190840x worse  | 215090x worse   | 185600x worse   |
| Smoothie Charts   | 5000x worse    | -              | 4770x worse    | 5000x worse     | 5000x worse     |
| Taucharts         | 1223290x worse | 16680x worse   | 1271080x worse | 1287140x worse  | 1255100x worse  |
| TOAST UI          | -              | -              | -              | -               | -               |
| μPlot             | 4900x worse    | 120x worse     | 4790x worse    | 15730x worse    | 15460x worse    |
| ZingChart         | 1280770x worse | 72750x worse   | 1657110x worse | 1656140x worse  | 1528010x worse  |
| FusionCharts      | -              | -              | -              | -               | -               |
| Google Charts     | 754290x worse  | 12890x worse   | 748260x worse  | 794900x worse   | -               |

**On average, LightningChart JS is 810420 times more performant than other data visualization solutions when it comes to streaming data applications.**

[More information how these results were compiled](#more-information-about-streaming-data-performance-results).

## Maximum Data Capacity

How large data sets can be visualized with each solution?
Scores are measured as number of data points across all channels.

In the below table you can see how other solutions data capacities fare against LightningChart JS.

| Solution          | Line Charts           | Scatter Charts        | Area Charts           | Spline Charts         | Step Charts           |
| :---------------- | :-------------------- | :-------------------- | :-------------------- | :-------------------- | :-------------------- |
| LightningChart JS | Largest data capacity | Largest data capacity | Largest data capacity | Largest data capacity | Largest data capacity |
| SciChart.JS       | 40.0x smaller         | 2.0x smaller          | 40.0x smaller         | 40000.0x smaller      | 40.0x smaller         |
| amCharts          | 4000.0x smaller       | 1000.0x smaller       | 4000.0x smaller       | 4000.0x smaller       | 4000.0x smaller       |
| AnyChart          | 40000.0x smaller      | 1000.0x smaller       | 40000.0x smaller      | 40000.0x smaller      | 40000.0x smaller      |
| ApexCharts.js     | 40000.0x smaller      | 1000.0x smaller       | 40000.0x smaller      | -                     | 40000.0x smaller      |
| C3.js             | 4000.0x smaller       | 1000.0x smaller       | 40000.0x smaller      | 4000.0x smaller       | 4000.0x smaller       |
| CanvasJS          | 4000.0x smaller       | 100.0x smaller        | 4000.0x smaller       | 4000.0x smaller       | 4000.0x smaller       |
| Chart.js          | -                     | 1000.0x smaller       | 4000.0x smaller       | -                     | -                     |
| DevExtreme        | 4000.0x smaller       | -                     | 40000.0x smaller      | 4000.0x smaller       | 4000.0x smaller       |
| dvxCharts         | 400.0x smaller        | -                     | 400.0x smaller        | 40000.0x smaller      | 400.0x smaller        |
| Dygraphs          | 400.0x smaller        | 100.0x smaller        | 400.0x smaller        | 400.0x smaller        | 400.0x smaller        |
| Apache ECharts    | 400.0x smaller        | -                     | 400.0x smaller        | 400.0x smaller        | 400.0x smaller        |
| Highcharts        | 4000.0x smaller       | 1000.0x smaller       | 4000.0x smaller       | 4000.0x smaller       | 4000.0x smaller       |
| Plotly            | 80.0x smaller         | 1000.0x smaller       | 80.0x smaller         | 4000.0x smaller       | 4000.0x smaller       |
| Shield UI         | 4000.0x smaller       | 1000.0x smaller       | 4000.0x smaller       | 4000.0x smaller       | 4000.0x smaller       |
| Smoothie Charts   | 40000.0x smaller      | -                     | 40000.0x smaller      | 40000.0x smaller      | 40000.0x smaller      |
| Taucharts         | 400000.0x smaller     | 10000.0x smaller      | 400000.0x smaller     | 400000.0x smaller     | 400000.0x smaller     |
| TOAST UI          | 400000.0x smaller     | 50000.0x smaller      | 2000000.0x smaller    | 2000000.0x smaller    | -                     |
| μPlot             | 80.0x smaller         | 2.0x smaller          | 80.0x smaller         | 80.0x smaller         | 80.0x smaller         |
| ZingChart         | 4000.0x smaller       | 100.0x smaller        | 4000.0x smaller       | 4000.0x smaller       | 4000.0x smaller       |
| FusionCharts      | 400000.0x smaller     | -                     | 400000.0x smaller     | 400000.0x smaller     | 400000.0x smaller     |
| Google Charts     | 40000.0x smaller      | 1000.0x smaller       | 40000.0x smaller      | 40000.0x smaller      | -                     |

**On average, LightningChart JS can process 90540 times larger data sets than other data visualization solutions.**

[More information how these results were compiled](#more-information-about-max-data-capacity-results).

## LightningChart JS Capabilities

These are the most impressive previously recorded feats with LightningChart JS.
Obviously, the achievable results differ based on hardware so we can't claim that everyone can reproduce these. The results in question were recorded with a medium-level desktop computer oriented for software development.

- Maximum confirmed data set visualized as an interactive Line Chart: **4 000 million data points**
- Massive data set with 100 million data points can be loaded and displayed from cold start in **1.07 seconds**
- LightningChart JS can display 400 channels simultaneously with 10 000 Hz data stream rate per channel and 1 minute time window, adding up to a grand total of **240 million data points visible at every frame and updated at 60 FPS**.

## Clarifications

### On which basis were the solutions included in testing selected?

We have included almost every JavaScript-based data visualization library that we could find, as long as there was even small hints about active usage.

- Both commercial and non-commercial libraries.
- Open-source and closed source libraries.
- Real-time oriented hardware accelerated libraries.
- Almost 10 year old industry favorites.
- Even small players, like `Epoch`.

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

1. Find the highest amount of data points that the chart can successfully load. Test is timed out if it freezes out for 30 seconds.

This is done by starting with small data set size, and steadily increasing it until the chart can no longer perform the test.
The tested data set sizes are always `[200, 1_000, 10_000, 100_000, 1_000_000, 5_000_000, 10_000_000, 50_000_000, 100_000_000]`.
Number of channels is initially `10`. Increased by increments of `10` if larger data sets needed.

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
