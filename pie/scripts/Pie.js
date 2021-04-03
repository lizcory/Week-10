function Pie() {

    this._data = null;
    this._sel = null;
    this._colorScale = null; 
    this._size = 180;
    this._padding = 15;
    this._radius = () => { return this._size/2 - this._padding*2; };

    
    this.data = function() {
        // arguments >> array
        // this.data(a, b, c) [a, b, c]
        if (arguments.length > 0) {
            this._data = arguments[0];
            return this;
        }

        return this._data;
    };
    
    this.selection = function() {


        if (arguments.length > 0) {
            this._sel = arguments[0];
            return this;
        }

        return this._sel
    };
    
    
    this.colorScale = function() {


        if (arguments.length > 0) {
            this._colorScale = arguments[0];
            return this;
        }

        return this._colorScale
    };


    this.size = function() {


        if (arguments.length > 0) {
            this._size = arguments[0];
            return this;
        }

        return this._size
    };


    this.padding = function() {
        if (arguments.length>0) {
            this._padding = arguments[0];
            return this;
        }

        return this._padding

        
    };
    

    this.draw = function() {
  
        console.log(this._data.arr);

        //create pie layout
        let pieFn = d3.pie()
            .value(d => d.value);

        // layout = change data into form we can map onto svg (degrees in radians) -- morphing our data to be drawable
        let layout = pieFn(this._data.arr);

        console.log(layout);


        //draw pie

        //// arc function (needs start angle and end angle)
        let arcFn = d3.arc()
            .innerRadius(0)
            .outerRadius(this._radius);

        //// drawing the arcs
        let g = this._sel 

        g.selectAll('path')
            .data(layout)
            .join('path')
            .attr('d', arcFn)
            .attr('fill', d => this._colorScale(d.data.key));

        g.append('text')
            .text(this._data.name)
            .classed('title', true);

     
    };



    return this;

}