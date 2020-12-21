
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup
var survivalTime=0



function preload(){
  
  
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running)
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10)
  ground.velocityX = -4

  obstacleGroup = new Group()
  bananaGroup = new Group()
}


function draw() {
  background("white")
  
  monkey.collide(ground)
  
  if(ground.x<0){
    ground.x=400
  }
  
  if(keyDown("space")&&monkey.y==314.3){
    monkey.velocityY = -17
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50)
  
  spawnBananas()
  spawnObstacles()
  
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    bananaGroup.setLifetimeEach(-1)
    console.log("1")
  }
  
  else
  drawSprites()
}

function spawnBananas(){
  if(frameCount % 80 === 0){
     banana = createSprite(400,315,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
  banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}
 function spawnObstacles(){
   if(frameCount % 300 === 0){
     obstacle = createSprite(400,315,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
  obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
 }



