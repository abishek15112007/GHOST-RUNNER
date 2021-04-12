var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  doorGroup = new Group()
  climberGroup = new Group()
  invisibleGroup = new Group()
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(tower.y>600)  {
      tower.y = 300;
         }
    if (keyDown("space"))  {
    ghost.velocityY = -5

    }
    if(keyDown("right")) {
      ghost.x = ghost.x +5
      
    }
    if (keyDown("left")) {
      ghost.x = ghost.x -5
      
    }
    ghost.velocityY = ghost.velocityY +0.085
    spawnDoors();
    if (climberGroup.isTouching(ghost)) {
      
      ghost.velocityY = 0
    }
if(invisibleGroup.isTouching(ghost)||ghost.y>600){
  ghost.destroy()
  gameState = "end"
  
}
   
    drawSprites();
  }
  
  if (gameState === "end"){
   textSize(30)
    fill("yellow")
    text("GameOver",230,250)
  }

}

function spawnDoors() {
  if(frameCount %240 === 0)  {
   door = createSprite(200,-50)
  door.addImage("door",doorImg)
  door.velocityY = 1
    door.x = Math.round(random(120,400))
    doorGroup.add(door)
  climber = createSprite(200,10)
  climber.addImage("climber",climberImg)
  climber.velocityY = 1
    climber.x = door.x
    climberGroup.add(climber)
    ghost.depth = door.depth +1
    invisibleclimber = createSprite(200,15)
    invisibleclimber.width = climber.width
    invisibleclimber.height = 5
    invisibleclimber.x = door.x
    invisibleclimber.velocityY = 1
    invisibleGroup.add(invisibleclimber)
}
}
