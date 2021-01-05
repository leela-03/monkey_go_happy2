
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var backgroundImg,monkey_collided;
var col;
var gamestate = 1;
var PLAY = 1;
var END = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
 backgroundImg = loadImage("jungle.jpg");
  monkey_collided = loadAnimation("Monkey_05.png");
  
}



function setup() {
  createCanvas (400,400);
  
   var survivalTime=0;
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addAnimation("collided",monkey_collided);
  
   monkey.scale=0.1
  
   bg = createSprite(200,200,400,400);
  bg.velocityX=-4;
  bg.x=bg.width/2;
  bg.addImage(backgroundImg);
  console.log(bg.x)
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;

  
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  col = 0;
}


function draw() {
   background(0);
  
  if (gamestate === PLAY) {
  
    monkey.changeAnimation("moving", monkey_running);
    
  if (bg.x < 100){
      bg.x = bg.width/2;
  }
  
   if (ground.x < 100){
      ground.x = ground.width/2;
  }
    
  if(keyDown("space") && monkey.collide(ground)) {
      monkey.velocityY = -15;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  spawnFood();
  spawnObstacles(); 
    
  monkey.collide(ground);

  if(FoodGroup.isTouching(monkey)) {
    score = score+2
    console.log(score)
    FoodGroup.destroyEach();  
    switch(score) {
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18
      break;
    default: break;
    }    
  }
  
   if (obstaclesGroup.isTouching(monkey)) {
    obstaclesGroup.destroyEach();
    monkey.scale = 0.1;
    col += 1;
  }
  
   if (col === 2) {
    gamestate = END;
  }
    
}
   if (gamestate === END) {
    bg.velocityX = 0;
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    
    monkey.changeAnimation("collided",monkey_collided);

  }
  
  
  drawSprites();
  
    if (gamestate === END) {

    fill(250);
    textSize(22);
    stroke(0);
    text("Game Over!",160,200);
   
  }
  
  fill("white")
  textSize(22);
  text("Score: "+ score, 150,50);
  
  
}

function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
 
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

     banana.addImage(bananaImage);
     banana.scale=0.05;

    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;

    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
     
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}






