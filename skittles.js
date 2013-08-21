//Beginning game code
skittlesOnLoad = function()
{
  var game = getGame();
  game.preload('res/skittle.wav', 'res/back.png', 'res/red.png', 'res/yellow.png', 'res/orange.png', 'res/green.png', 'res/purple.png');
};

var SkittlesScene = Class.create(Scene, {
	initialize: function() {
		Scene.apply(this);
		game = Game.instance;
		this.backgroundColor = 'black';
		this.gameStarted = true;
		this.generateSkittles = 0;
		this.addEventListener(Event.ENTER_FRAME, this.update);

		//var bg = new Sprite(327, 414);
    //bg.image = game.assets['back.png'];
    //this.addChild(bg);

		this.score = 0;
		var label = new Label('');
    label.x = 9;
    label.y = 180;        
    label.color = 'white';
    label.font = '24px sans-serif';
    label.textAlign = 'center';
    this.scoreLabel = label; 
    //this.addChild(label);
        
    this.createIntroLabel();
    this.addChild(this.instLabel);
     
    },

    update: function(evt) {
		this.setScore();
		
		if (this.instLabel && this.gameStarted) {
			this.removeChild(this.instLabel);
			this.instLabel = false;
			this.addChild(this.scoreLabel);        //make sure to take out this line from the initialize function
			return;
		}
       
        if(this.gameStarted)
        {
          this.generateSkittles += evt.elapsed * 0.001;

          if(this.generateSkittles >= 0.5)
          {
              var skittle;  
              skittle = new Skittle(Math.floor(Math.random()*3));
        			this.generateSkittles -= 0.5;  
        			this.addChild(skittle);
          }
        }
        else
        {
          if(shakingTime >= 1.0)
          {
            this.gameStarted = true;
          }
        }
	}, 

  setScore: function () {
    this.scoreLabel.text = 'Skittles Eaten<br>' + this.score;
    if (this.score == 10)
    {
    	_GAME_.onMissionComplete(MISSION_IDS.SKITTLES, true);
    }
  },
  
  createIntroLabel: function() {
		instructions = new Label('You\'ve been working hard. <br> <br>You need Skittles to gain enough willpower <br>to be able to continue chasing after the bomb.<br>Shake your device to shake some skittles, <br>and keep tapping skittles to eat them until<br> you gain enough willpower -<br><br> Taste the rainbow!');
		instructions.x = 10;
		instructions.y = 16;
		instructions.color = 'white';
		instructions.font = '15px strong';
		instructions.textAlign = 'center';
		instructions._style.margin = "500px";
		this.instLabel = instructions;
	},
});

var Skittle = Class.create(Sprite, {
	initialize: function(lane) {
		Sprite.apply(this,[40, 40]);
        this.rotationSpeed = 0;
        this.sign = Math.pow(-1, Math.floor(Math.random()*4));
        this.setSpeed();
        this.setImage();
        this.setLane(lane);
        this.addEventListener(Event.ENTER_FRAME, this.update);
        this.addEventListener(Event.TOUCH_END, this.eatSkittlesByTouch);
	},

	setImage: function() {
		var num = Math.floor(Math.random()*5);
		var colors = new Array();
		colors[0] = "red";
		colors[1] = "orange";
		colors[2] = "yellow";
		colors[3] = "green";
		colors[4] = "purple";
		colors[5] = "purple";

		this.image = Game.instance.assets["res/" + colors[num] + ".png"];
	},

	setSpeed: function() {
		var num = Math.random()*8;
		this.speed = num;
	},

	setLane: function(lane) {
		var game, distance;
		game = Game.instance;        
		distance = 90;
	 
		this.rotationSpeed = Math.random() * 100 - 50;
	 
	    this.x = game.width/2 - this.width/2 + (lane - 1) * distance;
	    this.y = -this.height;    
	    this.rotation = Math.floor( Math.random() * 360 );    
	},

	update: function(evt) { 
		var sign, game;
		game = Game.instance;
	 	this.x += this.sign*(this.speed - 2);
		this.y += this.speed;
		this.rotation += this.rotationSpeed * evt.elapsed * 0.001;           
	    if (this.y > game.height) {
	        this.parentNode.removeChild(this);
	    }
	    
	},

	eatSkittlesByTouch: function() {
	  game.assets['res/skittle.wav'].play();
		this.parentNode.score +=1;
        this.parentNode.removeChild(this);
	}
});