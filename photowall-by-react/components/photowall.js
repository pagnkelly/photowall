(function(){
	function getRangeRandom(low,high){
		return Math.ceil(Math.random()*(high-low)+low);
	}
	var ImgFigure=React.createClass({
		handleClick:function(){
			if(this.props.isCenter){
				this.props.inverse();
			}else{
				this.props.center();
			}
		},
		render:function(){
			var styleObj={
				left:this.props.info.pos.left,
				top:this.props.info.pos.top,
				transform:'rotate('+this.props.info.rotate+'deg)'
			}
			if(this.props.isInverse){
				styleObj.transform = 'rotateY(180deg)';
			}
			return (

				<figure className="imgFigure" style={styleObj} onClick={this.handleClick}>
					<img src={"imgs/"+this.props.data.fileName}/>
					<figcaption>
						<h2>{this.props.data.title}</h2>
						<div className="img-back">{this.props.data.desc}</div>
					</figcaption>
				</figure>
				);
		}
	});
	var Controller=React.createClass({
		handleClick:function(){
			if(this.props.arrange.isCenter){
                this.props.inverse();
            }else{
                this.props.center();
            }
		},
		render:function(){
			var controllerUnitClassName='controller';
			if(this.props.arrange.isCenter){
                controllerUnitClassName += ' is-center';
                if(this.props.arrange.isInverse){
                    controllerUnitClassName += ' is-inverse';
                }
            }
			return (
				<span className={controllerUnitClassName} onClick={this.handleClick}></span>
				);
		}
	});
	var Photowall=React.createClass({
		Const:{
			centerPos:{
				 top:0,
				 left:0
			},
			hRangePos:{
				leftRangeX:[0,0],
				rightRangeX:[0,0],
				y:[0,0]
			}

		},
		getInitialState:function(){
			return {
				imgInfoArr:[
					{
					
						pos:{
							top:0,
							left:0
						},
						rotate:0,
						isCenter:false,
						isInverse : false
					}
				]
			}
		},
		rearrage:function(centerIndex){
			var imgInfoArr=this.state.imgInfoArr;
			var hRangeLR=null;
			imgInfoArr[centerIndex].pos=this.Const.centerPos;
			imgInfoArr[centerIndex].rotate=0;
			imgInfoArr[centerIndex].isCenter=true;
			for(var i=0;i<imgInfoArr.length;i++){
				if(i==centerIndex){
					continue;
				}
				if(i<imgInfoArr.length/2){
					hRangeLR=this.Const.hRangePos.leftRangeX;
				}else{
					hRangeLR=this.Const.hRangePos.rightRangeX;
				}

				imgInfoArr[i].pos={
					top:getRangeRandom(this.Const.hRangePos.y[0],this.Const.hRangePos.y[1]),
					left:getRangeRandom(hRangeLR[0],hRangeLR[1])
				}
				imgInfoArr[i].rotate=getRangeRandom(-30,30);
				imgInfoArr[i].isCenter=false;
				imgInfoArr[i].isInverse = false;
			}
			

			this.setState({
				imgInfoArr:imgInfoArr
			});
		},
		center:function(index){
			return function(){
				this.rearrage(index);
			}.bind(this);
		},
		inverse : function(index){
			return function(){
				this.state.imgInfoArr[index].isInverse = !this.state.imgInfoArr[index].isInverse;
				this.setState({
					imgInfoArr : this.state.imgInfoArr
				});
			}.bind(this);
		},
		componentDidMount:function(){
			var stageDOM=ReactDOM.findDOMNode(this.refs.stage),
			 stageW=stageDOM.clientWidth,
			 stageH=stageDOM.clientHeight,
			 halfStageW=stageW/2,
			 halfStageH=stageH/2;
			 var imgFigureDOM=ReactDOM.findDOMNode(this.refs.imgFigure0),
			 imgFigureW=imgFigureDOM.clientWidth,
			 imgFigureH=imgFigureDOM.clientHeight,
			 halfImgFigureW=imgFigureW/2,
			 halfImgFigureH=imgFigureH/2;
			 this.Const.centerPos={
			 	top:halfStageH-halfImgFigureH,
			 	left:halfStageW-halfImgFigureW
			 };
			 this.Const.hRangePos={
			 	leftRangeX:[-halfImgFigureW, halfStageW-halfImgFigureW*3],
			 	rightRangeX:[halfStageW+halfImgFigureW,stageW-halfImgFigureW],
			 	y:[-halfImgFigureH,stageH-halfImgFigureH]
			 }
			 console.log(stageH);
			 this.rearrage(0);
		},
		render:function(){
			var imgFigureArr=[];
			var	contorllerArr=[];
			imgDatas.forEach(function(value,index){
				if(!this.state.imgInfoArr[index]){
					this.state.imgInfoArr[index]={
						pos:{
							top:0,
							left:0
						},
						rotate:0,
						isCenter : false,
						isInverse : false

					}
				}
				imgFigureArr.push(<ImgFigure data={value} key={index} 
					info={this.state.imgInfoArr[index]} ref={"imgFigure"+index}
					center={this.center(index)} isCenter={this.state.imgInfoArr[index].isCenter}
					inverse={this.inverse(index)} isInverse={this.state.imgInfoArr[index].isInverse}/>);
				contorllerArr.push(<Controller key={index} arrange={this.state.imgInfoArr[index]} inverse={this.inverse(index)}
					center={this.center(index)}/>);
			}.bind(this));
			return (
				<section className="stage" ref="stage">
					<section>
					{imgFigureArr}
					</section>
					<nav className="nav">
						{contorllerArr}
					</nav>
				</section>
				);
		}
	});






	ReactDOM.render(
		<Photowall/>,
		document.getElementById('container')
	)
})();