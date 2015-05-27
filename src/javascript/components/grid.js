require('babel/polyfill');

var React = require('react'),
		fin = require('./fin.js');


module.exports = React.createClass({
	componentDidMount: function() {
	
    },
	render: function(){
		return	<div> <fin-hypergrid id="stock-grid-top">
        <fin-hypergrid-behavior-json></fin-hypergrid-behavior-json>
    </fin-hypergrid>
    <fin-hypergrid id="stock-grid-bottom">
        <fin-hypergrid-behavior-json></fin-hypergrid-behavior-json>
    </fin-hypergrid>
    <fin-hypergrid id="buy-sell-grid">
        <fin-hypergrid-behavior-json></fin-hypergrid-behavior-json>
    </fin-hypergrid> </div>
	}
});

// function* idMaker(){
//   var index = 0;
//   while(true)
//     yield index++;
// }

// var gen = idMaker();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());


// var fibonacci = {
//   [Symbol.iterator]: function*() {
//     var pre = 0, cur = 1;
//     for (;;) {
//       var temp = pre;
//       pre = cur;
//       cur += temp;
//       yield cur;
//     }
//   }
// }

// for (var n of fibonacci) {
//   // truncate the sequence at 1000
//   if (n > 1000)
//     break;
//   console.log(n);
// }