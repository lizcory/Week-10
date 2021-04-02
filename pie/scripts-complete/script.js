const margin = {t: 50, r:50, b: 50, l: 50};
const padding = 15;
const size = {w: 1000, h: 800};
const svg = d3.select('svg#pie');

svg.attr('width', size.w)
    .attr('height', size.h);

const containerG = svg.append('g')
    .classed('container', true)
    .attr('transform', `translate(${margin.t}, ${margin.l})`);

size.w = size.w - margin.l - margin.r;
size.h = size.h - margin.t - margin.b;

const columns = ['hp', 'speed', 'attack', 'defense', 'spAtk', 'spDef'];
const colorScale = d3.scaleOrdinal()
    .domain(columns)
    .range(d3.schemeSet2);

d3.csv('data/Pokemon_subset.csv', function(d) {
    d.total = +d.total;
    d.hp = +d.hp;
    d.attack = +d.attack;
    d.defense = +d.defense;
    d.spAtk = +d.spAtk;
    d.spDef = +d.spDef;
    d.speed = +d.speed;
    // creating an array of all values for later convenience
    d.arr = [
        {key: 'hp', value: d.hp},
        {key: 'attack', value: d.attack},
        {key: 'defense', value: d.defense},
        {key: 'spAtk', value: d.spAtk},
        {key: 'spDef', value: d.spDef},
        {key: 'speed', value: d.speed}
    ];
    return d;
})
.then(function(data) {
    data = data.sort((a, b) => a.total < b.total);

    data.forEach((pokemon, index) => {
        let chart = new Pie();
        // uncomment the following line for a donut chart
        // let chart = new Donut();

        // calculate position for each pie-chart
        // this function basically finds the x,y value for the center of a pie chart
        let position = positionPieChart(index);

        // create a g with a pokemon name as its class
        let sel = containerG.selectAll('g.'+pokemon.name)
            .data([1])
            .join('g')
            .classed(pokemon.name, true)
            .attr('transform', `translate(${position[0]},${position[1]})`);
        
        // create the chart with data, in the above g
        chart.data(pokemon)
            .selection(sel)
            .colorScale(colorScale)
            .padding(padding)
            .size(size.w/5)
            .draw();
    });
});

function positionPieChart(index) {
    let radius = size.w/10 - padding;
    let m = index*2 + 1; // multiplier

    let x = (radius + padding) * m;
    m = Math.floor(x/size.w)*2 + 1;
    
    let y = (radius + padding) * m;
    x = x - (Math.floor(x/size.w) * size.w);

    return [x, y];
}