var React = require('react'),
		fin = require('./fin.js'),
		Grid = require('./grid.js'),
        //Immutable = require('immutable'),
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
  maxApp: function() {

    var that = this;

      fin.desktop.main(() => {
          fin.desktop.System.getMonitorInfo(function(info) {
              var bottom = window.updateStream.maximized ? 560 : info.primaryMonitor.availableRect.bottom;
              fin.desktop.Window.getCurrent()
                  .animate({
                      size: {
                          height: bottom,
                          duration: 1000
                      },
                      position: { 
                          top: 0, 
                          duration: 1000 
                      }
                  }, {}, () => {
                    var max = window.updateStream.maximized,
                        expanded = window.updateStream.expanded;

                    window.updateStream.expanded = 560;
                    window.updateStream.maximized = max ? 0 : bottom;
                    that.setState(window.updateStream);
                  });
          });
      });
  },
	toggleExpand: function (){
		var that = this;

    window.updateStream.expanded = window.updateStream.expanded === 560  ? 240 : 560;
    if (window.updateStream.maximized) {
      window.updateStream.expanded = 560;
      window.updateStream.maximized = 0;
    }

		fin.desktop.main(()=>{
			fin.desktop.Window.getCurrent()
				.animate({
					size: {
						height: window.updateStream.expanded,
						duration: 1000
					}
				},{},()=>{
          that.setState(window.updateStream);
        });
		});
	},
  getInitialState: function () {
  	return window.updateStream;
  },
  componentDidMount: function() {
      var that = this;
      setInterval(() => that.setState(window.updateStream),1000);

  },
	render: function(){
        var iconClasses = classSet({
                'fa': true,
                'fa-plus-square': this.state.expanded === 240,
                'fa-minus-square': this.state.expanded === 560
            }),
            indicatorClasses = classSet({
              'status-indicator' : true,
              'day-end': this.state.trading_phase !== 'Trading'
            }),
            connectIcoClasses = classSet({
              'connecting': this.state.status !== "CONNECTED:STREAM-SENSING" || this.state.trading_phase !== 'Trading',
              'fa fa-spinner connect-ico': true
            }),
            gridClasses = classSet({
              'connecting': this.state.status !== "CONNECTED:STREAM-SENSING" || this.state.trading_phase !== 'Trading'
            }),
            nonShrinkingClasses = classSet({
              'non-shrinking': true,
              'blank': this.state.trading_phase !== 'Trading'
            });


		return	<div className="ls-window">
    <div className={nonShrinkingClasses}>
        <div className="window-control">
            <i onClick={this.minApp} className="fa fa-minus min"></i>
            <i onClick={this.maxApp} className="fa fa-square-o"></i>
            <i onClick={this.closeApp} className="fa fa-times"></i>
        </div>
        <div className="id-bar">
            <div className="ticker">
                <div className="symbol">{this.state.symbol}</div>
                <div className="status">
                    <div className={indicatorClasses}></div>
                </div>
            </div>
            <div className="name">{this.state.name}</div>
        </div>
        <div className="dashboard">
            <div className="last">
                <div className="price">
                    {Number(this.state.last_price || 0).toFixed(2)}
                </div>
                <div className="volume">
                    {Number(this.state.last_qty || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div className="expander">
                    <i onClick={this.toggleExpand} className={iconClasses}></i>
                </div>
                
            </div>
            <div className="time">
                <span className="timeval">{this.state.last}</span>
                <div className="timebottom"></div>
            </div>
            <div className="detail">
                <div className="label">REF</div>
                <div className="val">{this.state.reference_price}</div>
                <div className="label">DEPTH</div>
                <div className="val">{this.state.detailDepthBuy} | {this.state.detailDepthSell}</div>
                <div className="expander"></div>
            </div>
        </div>
    </div>
        
    <div className="grid">
        <i className={connectIcoClasses}></i>
        <div className={gridClasses}>
          <Grid gridHeight={this.state.maximized} />
        </div>      
    </div>
</div>
	}
});
