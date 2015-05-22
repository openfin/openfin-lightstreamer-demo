var React = require('react'),
		fin = require('./fin.js'),
		add = function(a,b){
      return a + b;
    },
    sub = function(a,b){
      return a - b;
    },
		rndRange = function () {
      return Math.floor(Math.random() * 10 % 5) / 10;
    },
    plusMinus = function(base, op){
      return parseInt(Math.random() * 10) % 2 ? add(base, op) : sub(base, op);
    };

//var urlData = location.search.split('&').map((i)=>{return i.split('=')[1]})
var expandedHeight = 560,
		expanded = true;

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
		expanded = !expanded;
		fin.desktop.main(()=>{
			fin.desktop.Window.getCurrent()
				.animate({
					size: {
						height: expanded ? 560 : 300,
						duration: 1000
					}
				});
		});
	},
  getInitialState: function () {

  	return {
  		class: 'tile'
  	}
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
                    <div className="symbol">XJI</div>
                    <div className="status">
                    	<div className="status-indicator"></div>
                    </div>
                </div>
                <div className="name">Xavier JavaScript Industries</div>
            </div>
            <div className="dashboard">
                <div className="last">
                    <div className="price">
                        41.55
                    </div>
                    <div className="volume">
                        2,500
                    </div>
                </div>
                <div className="time">
                	<span>9:27:16</span>
                </div>
                <div className="detail">
                    <div className="label">REF</div>
                    <div className="val">41.10</div>
                    <div className="label">DEPTH</div>
                    <div className="val">450 | 299</div>
                    <div className="expander">
                    	<i onClick={this.toggleExpand} className="fa fa-pinterest"></i>
                    </div>
                </div>

            </div>
            <div className="grid"></div>
        </div>


	}
});

if (!fin.desktop.mock) {
	fin.desktop.main(()=>{
		new fin.desktop.Window({
			name: 'mock',
			url: 'mock.html',
			autoShow: true
		});
	});	
}


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
