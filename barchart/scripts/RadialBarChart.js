function RadialBarChart() {

    this._data = null;
    this._sel = null;
    this._colorScale = null;
    this._size = 180;
    this._outerRadius = 400;
    this._innerRadius = 150;

    this.data = function () {
        if (arguments.length > 0) {
            this._data = arguments[0];
            return this;
        }
        return this._data;
    };

    this.selection = function () {
        if (arguments.length > 0) {
            this._sel = arguments[0];
            return this;
        }
        return this._sel;
    };

    this.colorScale = function () {
        if (arguments.length > 0) {
            this._colorScale = arguments[0];
            return this;
        }
        return this._colorScale;
    };

    this.size = function () {
        if (arguments.length > 0) {
            this._size = arguments[0];
            this._outerRadius = this._size/2;
            return this;
        }
        return this._size;
    };

    this.draw = function () {
        console.log(this._data);

        
        let scaleX = d3.scaleBand()
            .domain(this._data.map(d => d.name))
            .range([0, 2 * Math.PI]);

       
        let scaleY = d3.scaleRadial()
            .domain([0, d3.max(this._data, d => d.total)])
            .range([this._innderRadius, this.outerRadius]);
        

        let arc = d3.arc()
            .innerRadius(d => scaleY(d.prevTotal))
            .outerRadius(d => scaleY(d.prevTotal + d.value))
            .startingAngle(0)
            .endingAngle(scaleX.bandwidth())
            .padAngle(0.01)
            .padRadius(this._innerRadius);
        

        let barG = this._sel
            .append('g')
            .selectAll('g')
            .classed('bars', true)
            .data(this._data)
            .join('g')
            .attr('transform', d => `rotate(${ scaleX(d.name) * 180/Math.PI })`)

        
        barG.selectAll('path')
            .data(d => d.arr)
            .join('path')
            .attr('d', arc)
            .attr('fill', d => this._colorScale(d.key));



        this._drawAxisX(scaleX);
        this._drawAxisY(scaleY);

   
    }

    this._drawAxisX = function(scaleX) {
        let axisXG = this._sel
            .append('g')
            .classed('axis-x', true); 

        axisXG.selectAll('g')
            .data(scaleX.domain())
            .join('g')
            .attr('name', d => d)
            .attr('transform', d => {

                let radians = scaleX(d) + scaleX.bandwidth()/2;
                let degrees = radians * 180/Math.PI - 180;
                return `rotate(${degrees}) translate(${this._innerRadius - 10}, 0)`;  //move a bit farther from center
                
            })
            .call(g => {
                g.selectAll('text')
                    .data(d => [d])
                    .join('text')
                    .text(d => d)
                    .attr('text-anchor', 'middle')
                    .attr('transform', d => {
                        let angle = (scaleX(d) + scaleX.bandwidth()/2 + Math.PI) % (2*Math.PI); // if value is more than 180
                        let rotate = 90;

                        if (angle < Math.PI) {
                            rotate = -90;
                        }
                        return `rotate()${rotate} translate(0,3)`;

                    });
            })
            .call(g => {

                g.selectAll('line')
                    .data([0])
                    .join('line')
                    .attr('x1', 8)
                    .attr('x2', 10)
                    .attr('stroke', '#000');
            });
    }


    this._drawAxisY = function(scaleY) {
       let axisYG = this._sel  
            .append('g')
            .classed('axis-y', true);

        axisYG.call(g => {
            g.selectAll('g')
                .data(scaleY.ticks(3))
                .join('g')
                .call(g => {
                    //create a circle
                    g.append('circle')
                        .attr('r', d => scaleY(d));
                
                })
                .call(g => {
                    //create a label
                    g.append('text')
                        .attr('y', d => -scaleY(d))
                        .text(d => d);
                })
        })
    }

    return this;
};