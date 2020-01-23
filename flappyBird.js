var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var lily = new Image();
var lilyUp = new Image();
var lilyReg = new Image();
var bg = new Image();
var fg = new Image();
var boneDown = new Image();
var boneUp = new Image();
var lilyCry = new Image();

lilyReg.src = "images/lily.png";
lilyCry.src = "images/liliycry.png";
lilyUp.src = "images/lilyup.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
boneDown.src = "images/bone2.png";
boneUp.src = "images/bone1.png";

lily= lilyReg;
// some variables

var gap = 60;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1;
var j = 100;

var score = 0;
var z = 1;
var restart = 0;
// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down


document.addEventListener("keydown", function(event) {
    if(event.keyCode == 38) {
        moveUp();
    }
    else if(event.keyCode == 40) {
        moveDown();
    }
    else if(event.keyCode == 13 && restart == 1)
    {

        location.reload();
    }
});
function moveUp(){
    bY -= 20;
    lily=lilyUp;
    fly.play();
}
function moveDown(){
    bY += 20;
    fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0,
    constant : 330
};

// draw images


function draw(){
    ctx.drawImage(bg,0,0);

    for(var i = 0; i < pipe.length; i++){
        
        ctx.drawImage(boneDown,pipe[i].x,pipe[i].y);
        ctx.drawImage(boneUp,pipe[i].x,pipe[i].y+pipe[i].constant);
             
        pipe[i].x=pipe[i].x-1;
        console.log(pipe[i].x);
        if(Math.round(pipe[i].x) == j ){
            pipe.push({
                x : cvs.width+Math.floor(Math.random()*cvs.width/4),
                y : Math.floor(Math.random()*boneDown.height)-boneDown.height,
                constant : boneDown.height+gap+Math.floor(Math.random()*(gap*2))
            }); 
        }

        // detect collision
        
        if( bX + lily.width >= pipe[i].x && bX <= pipe[i].x + boneDown.width && (bY <= pipe[i].y + boneDown.height || bY+lily.height >= pipe[i].y+pipe[i].constant) || bY + lily.height >=  cvs.height - fg.height || bY + lily.height <= 30){
            endGame();         
        }
        
        if(pipe[i].x == 25){
            score++;
            if(j<175)
            {
                j++;
            }
            scor.play();
        }
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(lily,bX,bY);

    lily= lilyReg;
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
function endGame(){
    ctx.drawImage(bg,0,0);
    ctx.fillStyle = "#000";
    ctx.font = "15px Verdana";
    ctx.drawImage(lilyCry,30,60);
    restart = 1;
    togglePause();
}























