var balloon , balloonImg , balloonImg2 , balloonImg3
function preload(){
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  balloonImg = loadImage("Hot Air Ballon-02.png");
  balloonImg2 = loadImage("Hot Air Ballon-03.png");
  balloonImg3 = loadImage("Hot Air Ballon-04.png");
}
function setup() {
  database = firebase.database();
  createCanvas(500,500);
  balloon = createSprite(400, 200, 20, 20); 
  balloon.addImage(balloonImg);
  balloon.scale = 0.6;

  var BalloonPosition = database.ref('balloon/height'); 
  BalloonPosition.on("value",readPosition,showError)
}

function draw() {
  background(backgroundImg);  
if(keyDown(LEFT_ARROW)){
   balloon.x = balloon.x -10;
} 
else if(keyDown(RIGHT_ARROW)){
   balloon.x = balloon.x +10;
}
else if(keyDown(UP_ARROW)){
  balloon.x = balloon.x -10;  
  balloon.addAnimation(balloonImg2);
  balloon.scale = balloon.scale -0.01;

}
else if(keyDown(DOWN_ARROW)){
  balloon.x = balloon.x +10; 
  balloon.addAnimation(balloonImg3);
  balloon.scale = balloon.scale +0.01;
}
  drawSprites();
  fill("black")
  stroke("white")
  text("Use Arrow Keys to move the Hot Air Balloon",20,20);
}
function updateHeight(){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })

}

function readPosition(){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database")
}