	//creating variables
	var starImg,bgImg;
	var star, starBody;
	var fairy,fairyImg;
	var Ins;
	//extracting constants
	const Engine = Matter.Engine;
	const World = Matter.World;
	const Bodies = Matter.Bodies;
	const Body = Matter.Body;

function preload(){

	//loading images,animations and sounds
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
	fairyImg=loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	music=loadSound("sound/JoyMusic.mp3");
}

function setup() {
	    //creating canvas
		createCanvas(800,750);

	    //playing sound
		music.play();
 
		//creating sprites and describing properties
		fairy=createSprite(150,500);
		fairy.addAnimation("fairy",fairyImg);
		fairy.scale=0.25;
		fairy.setCollider("rectangle",490,-15,100,150);
		
		star = createSprite(650,30);
		star.addImage(starImg);
		star.scale = 0.2;

		//creating an invisible sprite to stop the fairy sprite from going out of the canvas as the collider is present only on the hand area
		Ins=createSprite(15,500,500,100);
		Ins.visible=false;

		//creating engine and world
		engine = Engine.create();
		world = engine.world;

		//creating body of the star sprite
		starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
		World.add(world,starBody);

		//writing code to run the physics engine
		Engine.run(engine);
}

function draw() {
	//adding background image
	background(bgImg);
	
	//creating edge sprites
	edges=createEdgeSprites();

	//writing code to collide the fairy sprite with the edges
	fairy.collide(edges);

    //writing code to collide the fairy sprite with the invisible sprite
	fairy.collide(Ins);
	//relating coordinates
	star.x= starBody.position.x;
	star.y= starBody.position.y;

	//adding functions 
	movement();
	keyPressed();

	//writing code to stop the star in the hand of the fairy
	if(star.isTouching(fairy)){
	fairy.velocityX=0;
	Matter.Body.setStatic(starBody,true)
	}
  
	//drawing sprites
	drawSprites();
}

//describing functions

//function to  make the star sprite fall
function keyPressed() {
	if (keyCode === DOWN_ARROW) {
	Matter.Body.setStatic(starBody,false); 
	}
}

//function to move the fairy left and right
function movement(){
	if(keyDown(LEFT_ARROW)){
	fairy.velocityX=-2;
	}
	if(keyDown(RIGHT_ARROW)){
	fairy.velocityX=2;
	}
}
