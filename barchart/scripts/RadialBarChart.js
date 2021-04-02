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
        
    }

    return this;
}