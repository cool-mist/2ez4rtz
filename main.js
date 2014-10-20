$("body").keypress(keypress_handler);
function keypress_handler(e){

	if(e.keyCode==97){
		no();
		game.state=1;
	}else if(e.keyCode==108){
		yes();
		game.state=1;
	}
}
//Game states -- 0 -> waiting for user input  1 -> Calculate and display result 

var colors = ['red','blue','yellow','green','gray'];
var max=0;
//console.log(Math.floor(Math.random()*colors.length));
var game={
	score:0,
	state:0,
	user_inp:0,
	clr:0,
	txt:0
}
var t;    	//timer
var cw=500; //width of color
function reinit(){
	clearInterval(t);
	cw=500;
	timer();
	game.state=0;
	game.clr=Math.floor(Math.random()*colors.length);//random
	game.txt=Math.floor(Math.random()*colors.length);
	$('#outer').css("background",colors[game.clr]+'');
	$('#lower').html("<strong>"+colors[game.txt]+'</strong>');
	$("#score").html("<small>Score: </small>"+game.score);
	console.log(game.clr+","+game.txt);

}
$(document).ready(function(){
	gameend();
	reinit();
	setInterval(function(){start();},10);
});
function start(){
	if(game.state==1){
		var temp=0;
		if(game.clr == game.txt) temp=1;
		if(temp == game.user_inp){  //correct
			game.score=game.score+1;
			reinit();

		}else{			
			gameend();

		}
		
		
	}

}
function timer(){
	t=setInterval(function(){
		cw--;
		if(cw==100){
			gameend();
			$("#outer").css("width",'500px');

			cw=500;
		}
		$("#outer").css("width",cw+'px');	
		$("#outer").html(cw-100+'');
	},10);
}
function gameend(){
	if(game.score>max){
		max=game.score;
	}
	game.score=0;
	$("#max").html("<small>Best: </small>"+max);
	reinit();

}
// Yes/No functions
function no(){
	if(game.state==0){
		game.user_inp=0;
		
	}
}
function yes(){
	if(game.state==0){
		game.user_inp=1;
		
	}
}