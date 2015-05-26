var React = require('react'),
		fin = require('./fin.js'),
		Grid = require('./grid.js'),
        Immutable = require('immutable');


var expandedHeight = 560,
    state = Immutable.Map({
        symbol: 'XJI',
        name: 'Xavier JavaScript Industries',
        lastPrice: 41.55,
        lastVolume: '2,500',
        detailRef: 41.10,
        detailDepth: '450 | 299',
        time: '9:27:16',
        expanded: true
    });

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
		state.set('expanded', !state.get('expanded'));
        
		fin.desktop.main(()=>{
			fin.desktop.Window.getCurrent()
				.animate({
					size: {
						height: state.get('expanded') ? 560 : 300,
						duration: 1000
					}
				});
		});
	},
  getInitialState: function () {
  	return state;
  },
  componentDidMount: function(){},
	render: function(){
		return	<div className="ls-window">
            <div className="window-control">
                <i onClick={this.minApp} className="fa fa-minus"></i>
                <i onClick={this.closeApp} className="fa fa-times"></i>
            </div>
            <div className="id-bar">
                <div className="ticker">
                    <div className="symbol">{this.state.get('symbol')}</div>
                    <div className="status">
                    	<div className="status-indicator"></div>
                    </div>
                </div>
                <div className="name">{this.state.get('name')}</div>
            </div>
            <div className="dashboard">
                <div className="last">
                    <div className="price">
                        {this.state.get('lastPrice')}
                    </div>
                    <div className="volume">
                        {this.state.get('lastVolume')}
                    </div>
                </div>
                <div className="time">
                	<span>{this.state.get('time')}</span>
                </div>
                <div className="detail">
                    <div className="label">REF</div>
                    <div className="val">{this.state.get('detailRef')}</div>
                    <div className="label">DEPTH</div>
                    <div className="val">{this.state.get('detailDepth')}</div>
                    <div className="expander">
                    	<i onClick={this.toggleExpand} className="fa fa-pinterest"></i>
                    </div>
                </div>

            </div>
            <div className="grid">
            	<Grid />
            </div>
        </div>
	}
});

// if (!fin.desktop.mock) {
// 	fin.desktop.main(()=>{
// 		new fin.desktop.Window({
// 			name: 'mock',
// 			url: 'mock.html',
// 			autoShow: true
// 		});
// 	});	
// }


/*
<div className="ls-window">
    <div className="window-control">
        <i onClick={this.minApp} className="fa fa-minus"></i>
        <i onClick={this.closeApp} className="fa fa-times"></i>
    </div>
    <div className="id-bar">
    	<div className="ticker">
    		<div className="symbol">XJI</div>
    		<div className="status">green-circle</div>
    	</div>
    	<div className="name">Xavier JavaScript Industries</div>
    </div>
    <div className="dashboard">
    	
    </div>
    <div className="grid"></div>
</div>






		<div className={this.state.class}>
							<div className="banner">
								<div className="title">
									{this.state.ticker}
								</div>
								<div className="window-control">
									<i onClick={this.minApp} className="fa fa-minus"></i>
									<i onClick={this.closeApp} className="fa fa-times"></i>
								</div>
							</div>
							<div className="content">
								<div className="main">
									<span className="last" >{this.state.last.toFixed(2)}</span>
									<span className="percent-change" >+%{rndRange().toFixed(2)}</span>

								</div>
								<div className="pricing">
									<div className="price open">
										<div className="label">OPEN</div>
										<span className="value">{ (this.state.last - rndRange()).toFixed(2) } </span>
									</div>
									<div className="price high">
										<div className="label">HIGH</div>
										<span className="value">{ (this.state.last + rndRange()).toFixed(2) }</span>
									</div>
									<div className="price low">
										<div className="label">LOW</div>
										<span className="value">{ (this.state.last - rndRange() - 1).toFixed(2)  }</span>
									</div>
								</div>
							</div>
						</div>


*/
