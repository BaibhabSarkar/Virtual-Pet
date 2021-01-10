var dog, happyDog, database, foodS, foodStock;

function preload()
{
	dogImg= loadImage("images/dogImg.png");
    dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
	database = firebase.database();
	createCanvas(500, 500);

	dog = createSprite(250,300,100,100);
	dog.addImage(dogImg);
	dog.scale=0.2;

   var foodStock= database.ref('food');
   foodStock.on("value", readStock, showError);

   textSize(20);

}


function draw() {  
	background(46, 139, 87);

	if(keyWentDown(UP_ARROW)){
       writeStock(foodS);
      dog.addImage(dogImg2);
	}

  drawSprites();
  fill('white');
  text("Food remaining: "+foodS,170,200);
  text("Press Up arrow key to feed Doggo",100,20);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
    if(x<=0){
		x=0;
	}
    else{
		x=x-1;
	}
   database.ref('/').update({
	   food:x
   })
   
} 

function showError(){
	console.log("Error in writing to the database");
}


