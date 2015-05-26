require('babel/polyfill');

var _ = require('underscore'),
		React = require('react'),
		Main = require('./components/main.js');

React.render(<Main />, document.body);


