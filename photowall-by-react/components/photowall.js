(function(){

	var ImgFigure=React.createClass({
		render:function(){
			return (

				<figure className="imgFigure">
					<img src={"imgs/"+this.props.data.fileName}/>
					<figcaption>
						<h2>{this.props.data.title}</h2>
						<div></div>
					</figcaption>
				</figure>
				);
		}
	});
	var Controller=React.createClass({
		render:function(){
			return (
				<span></span>
				);
		}
	});
	var Photowall=React.createClass({

		render:function(){
			var imgFigureArr=[];
			var	contorllerArr=[];
			imgDatas.forEach(function(value,index){
				imgFigureArr.push(<ImgFigure data={value} key={index}/>);
				contorllerArr.push(<Controller key={index}/>);
			});
			return (
				<section className="state">
					<section>
					{imgFigureArr}
					</section>
					<nav>
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