var tower, towerImg;
var ghost, ghostImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climberGroup;
var killpart, killpartgroup;
var PLAY = 1
var END = 2
var gameState = PLAY
var music;




function preload(){
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-jumping.png");
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
  music = loadSound("spooky.wav")
  
}



function setup(){
  createCanvas(600,600)
  tower = createSprite(300,300)
  tower.addImage("towerImg", towerImg)
  tower.velocityY = 1
  
  ghost = createSprite(300,300)
  ghost.addImage("ghostImg", ghostImg)
  ghost.scale = 0.3
  
  doorsGroup = new Group();
  climberGroup = new Group();
  killpartgroup = new Group();

  music.loop();
}


function draw(){
  
 if (gameState === PLAY){
  
  if(tower.y>610){
    tower.y = 300
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x - 2
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x + 2
  }
  
  if(keyDown("space")){
    ghost.velocityY = -4
  }
  
  ghost.velocityY += 0.5
  
  if(frameCount%200 === 0){
    spawndoor();
  }
  
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY = 0
  }
  
  if (ghost.isTouching(killpartgroup) || (ghost.y>605)){
    gameState = END;
  }
  
 
  
  
  
  drawSprites()
 }
  
  if (gameState === END){
    textSize(40)
    fill("white")
    text("gameOver", 200, 300)
    
    
  }
  
  
  
}

function spawndoor(){
  
  door = createSprite(random(100,500), -10)
  door.addImage("doorImg", doorImg)
  door.velocityY = +1
  door.lifetime = 620
  doorsGroup.add(door)
  ghost.depth = door.depth + 1
   
  
  climber = createSprite(door.x, door.y + 60)
  climber.addImage("climberImg", climberImg)
  climber.velocityY = door.velocityY
  climber.lifetime = door.lifetime
  climberGroup.add(climber);
  
  killpart = createSprite(climber.x,climber.y +5,climber.width, 5 )
  killpart.velocityY = climber.velocityY
  killpart.lifetime = climber.lifetime
  killpart.visible = false
  killpartgroup.add(killpart)
  
  
  
}

