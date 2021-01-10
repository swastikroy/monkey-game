var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survival = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  var monkey = createSprite(30, 360, 20, 50);
  monkey.addAnimation("running", monkey_running);

  monkey.scale = 0.1
  Ground = createSprite(30, 397, 800, 10);
  Ground.visible = true;
  Ground.X = Ground.width / 2
  Ground.velocityX = -1;

  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);


  obstaclesGroup = createGroup();
  FoodGroup = createGroup();

}


function draw() {
  background("green");
  text("survival: " + survival, 400, 100);
  stroke("black");
  textSize(20)
  fill("black")
  survival = Math.ceil(frameCount / frameRate())






  if (gameState === PLAY) {

    Ground.velocityX = -(4 + 3 * survival / 100)
    //scoring


    if (Ground.x < 0) {
      Ground.x = Ground.width / 2;
    }
    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -12;

    }
    monkey.velocityY = monkey.velocityY + 0.8

    spawnObstacles();
    spawnFood();
    if (obstaclesGroup.isTouching(monkey)) {
      monkey.velocityY = -12;
       
      gameState = END;
      


    }
    else if (gameState === END) {
       if(mousePressedOver(restart)) {
      reset();
         
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);  
         
     monkey.collide(Ground);
    }
    }
    

    
     
    drawSprites();

  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
obstaclesGroup.destroyEach();
FoodGroup.destroyEach();
  
monkey.changeAnimation("running", monkey_running)
  
 score = 0
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.scale = 0.5;
   obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
 }
} 
   
 function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    
    banana.addImage(bananaImage);
     banana .scale = 0.5;
     banana.velocityX = -3;
    if (FoodGroup.isTouching(monkey)) {
     banana.destroyEach();
 }
  }
 }
 