require('babel/polyfill');

var React = require('react'),
		fin = require('./fin.js');


module.exports = React.createClass({
	componentDidMount: function() {
	
    },
	render: function(){
        var height = this.props.gridHeight ? this.props.gridHeight : 352,
            heightString = `height: ${height}px`;

		return	<div> <fin-hypergrid id="stock-grid-top">
        <fin-hypergrid-behavior-json></fin-hypergrid-behavior-json>
    </fin-hypergrid>
    <fin-hypergrid id="stock-grid-bottom">
        <fin-hypergrid-behavior-json></fin-hypergrid-behavior-json>
    </fin-hypergrid>
    <fin-hypergrid id="buy-sell-grid" style={{height: height}}>
        <fin-hypergrid-behavior-json></fin-hypergrid-behavior-json>
    </fin-hypergrid> </div>
	}
});