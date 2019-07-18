d3fc();

function d3fc() {
    /** @type {typeof import("/home/tmclaughlan/git/d3fc/packages/d3fc/build/d3fc")} */
    const fc = window.fc;
    /** @type {typeof import("/home/tmclaughlan/scratch/d3fc/node_modules/d3/dist/d3")} */
    const d3 = window.d3;


    const x = d3.scaleLinear();
    const y = d3.scaleLinear();

    const x2 = d3.scaleLinear();
    const y2 = d3.scaleLinear();

    x.domain([-100, 100]);
    y.domain([-100, 100]);
    x2.domain([-100, 100]);
    y2.domain([-100, 100]);

    const area = fc.seriesWebglPoint()
        .crossValue(d => d.x)
        .mainValue(d => d.y)
        .size(d => (10 * d.z) + 5)
        .decorate((context, d) => {
            context.vertexShader()
                .appendHeader(`attribute vec4 aColor; varying vec4 vColor;`)
                .appendBody(`vColor = aColor;`);
            context.fragmentShader()
                .appendHeader(`varying vec4 vColor;`)
                .appendBody(`gl_FragColor = vColor;`);
            const colors = new Float32Array(d.length * 4);
            let ci = 0;
            d.forEach((point, i) => {
                if (i % 7 === 0) {
                    colors[ci++] = point.z;
                    colors[ci++] = 1 - point.z;
                    colors[ci++] = point.z * point.z;
                    colors[ci++] = 0.75;
                } else {
                    colors[ci++] = 0.4;
                    colors[ci++] = 0.4;
                    colors[ci++] = 0.4;
                    colors[ci++] = 0.75;
                }
            });
            context.attribute('aColor', colors);
        });

    const zoom = d3.zoom()
        .on('zoom', () => {
            x.domain(d3.event.transform.rescaleX(x2).domain());
            y.domain(d3.event.transform.rescaleY(y2).domain());
            // requestAnimationFrame(render);
        });

    const chart = fc.chartCartesian(x, y)
        .chartLabel('Test')
        .webglPlotArea(area)
        .decorate(sel => {
            sel.enter()
                .select('.plot-area')
                .on('measure.range', () => {
                    x2.range([0, d3.event.detail.width]);
                    y2.range([d3.event.detail.height, 0]);
                })
                .call(zoom);
        });

    const n = 10000;
    const data = d3.range(n).map((d, i) => ({ x: (Math.random() - 0.5) * 1000, y: (Math.random() - 0.5) * 1000, z : Math.random() }));


    let frames = 0;
    let elapsed = 0;
    let lastFrame = 0;

    function render() {
        if (lastFrame > 0) {
            elapsed += Date.now() - lastFrame;
            frames++;
        }
        lastFrame = Date.now();

        if (frames > 30) {
            document.querySelector('#fps').innerHTML = `${((frames * 1000) / elapsed).toFixed(2)} FPS`;
            frames = 0;
            elapsed = 0;
        }

        d3.select('#chart')
            .datum(data)
            .call(chart);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

}