const width = 1200,
      height = 600;
let root, node;

const treemap = d3.layout.treemap()
    .round(false)
    .size([width, height])
    .sticky(true)
    .value((d) => d.size);

const x = d3.scale.linear().range([0, width]),
      y = d3.scale.linear().range([0, height]);

let svg = d3.select('#chart-treemap').append('div')
    .attr('class', 'chart')
    .style('width', width + 'px')
    .style('height', height + 'px')
  .append('svg:svg')
    .attr('width', width)
    .attr('height', height)
  .append('svg:g');

d3.json('data.json', (data) => {
  const color = () => {
    var o = Math.round, r = Math.random, s = 155;
    let c1 = o(r()*s) + 100;
    let c2 = o(r()*s)+ 100;
    let c3 = o(r()*s)+ 100;
    return 'rgba(' + c1 + ',' + c2 + ',' + c3 + ',' + 1 + ')'
  }
  node = root = data;
  const nodes = treemap.nodes(root)
      .filter((d) => !d.children);
  const area = svg.selectAll('g')
      .data(nodes)
    .enter().append('svg:g')
      .attr('class', 'area')
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
  
  area.append('svg:rect')
      .attr('width', (d) => d.dx)
      .attr('height', (d) => d.dy)
      .style('fill', (d) => color());
  area.append('svg:text')
      .attr('x', (d) => d.dx/2)
      .attr('y', (d) => d.dy/2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text((d) => d.brand)
      .style('opacity', function(d) { 
        d.w = this.getComputedTextLength(); 
        return d.dx > d.w 
          ? 1 
          : 0; 
        }
      );
      });