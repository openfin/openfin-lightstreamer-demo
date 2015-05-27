var React = require('react'),
		fin = require('./fin.js'),
		Grid = require('./grid.js'),
        Immutable = require('immutable'),
        classSet = require('classnames'),
        updateStream = require('./update-stream.js'),
        _ = require('underscore');


var expandedHeight = 560;

module.exports = React.createClass({
	closeWindow: ()=>{
  	fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  },
  closeApp: function(){
		fin.desktop.main(function(){
		  fin.desktop.Window.getCurrent().close();
		});
	},
	minApp: function(){
		fin.desktop.main(function(){
		  fin.desktop.Window.getCurrent().minimize();
		});
	},
	toggleExpand: function (){
		window.updateStream.expanded = !window.updateStream.expanded;// = state.set('expanded', !state.expanded);

		fin.desktop.main(()=>{
			fin.desktop.Window.getCurrent()
				.animate({
					size: {
						height: window.updateStream.expanded ? 560 : 300,
						duration: 1000
					}
				},{},()=>{
                    //this.setState(Immutable.Map(state));
                });
		});
	},
  getInitialState: function () {
  	return window.updateStream;
  },
  componentDidMount: function() {
      var that = this;
      Object.observe(window.updateStream, _.throttle(() => {
          that.setState(window.updateStream);
      }, 1000));
  },
	render: function(){
        var cx = classSet,
            iconClasses = classSet({
                'fa': true,
                'fa-plus-square': !this.state.expanded,
                'fa-minus-square': this.state.expanded
            });

		return	<div className="ls-window">
            <div className="window-control">
                <i onClick={this.minApp} className="fa fa-minus"></i>
                <i onClick={this.closeApp} className="fa fa-times"></i>
            </div>
            <div className="id-bar">
                <div className="ticker">
                    <div className="symbol">{this.state.symbol}</div>
                    <div className="status">
                    	<div className="status-indicator"></div>
                    </div>
                </div>
                <div className="name">{this.state.name}</div>
            </div>
            <div className="dashboard">
                <div className="last">
                    <div className="price">
                        {this.state.last_price}
                    </div>
                    <div className="volume">
                        {Number(this.state.last_qty || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                </div>
                <div className="time">
                	<span>{this.state.last}</span>
                </div>
                <div className="detail">
                    <div className="label">REF</div>
                    <div className="val">{this.state.reference_price}</div>
                    <div className="label">DEPTH</div>
                    <div className="val">{this.state.detailDepthBuy} | {this.state.detailDepthSell}</div>
                    <div className="expander">
                    	<i onClick={this.toggleExpand} className={iconClasses}></i>
                    </div>
                </div>

            </div>
            <div className="grid">
            	<Grid />
            </div>
        </div>
	}
});


