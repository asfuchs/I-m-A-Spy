LoseSceneOnLoad = function() {
    var game = getGame();
    game.preload('res/inBetween.png', 'res/Boom.png', 'res/Smoke.png');

}; 
var LoseScene = Class.create(Scene, {
    	// The main gameplay scene. 
  	initialize: function() {
      	var game, label, instructions, bg;
      // 1 - Call superclass constructor
      	Scene.apply(this);
      // 2 - Access to the game singleton instance
      	game = Game.instance;
      // 3 - Create child nodes
      	bg = new Sprite(320,460);
      	bg.image = game.assets['res/inBetween.png'];

      // 4 - Add child nodes        
		this.addChild(bg);
      // Touch listener
      	this.addEventListener(Event.TOUCH_START, this.handleTouchStart);
      	this.addEventListener(Event.TOUCH_END, this.handleTouchEnd);
	// Update
		this.addEventListener(Event.ENTER_FRAME,this.update);
	// Instance variables
		this.b = bg;
          this.frameCount = 0;
  	},
  	handleTouchStart: function (evt) {
  		var laneWidth, rowHeight;
  		laneWidth = 320/4;
  		rowHeight = 460/5;
  		this.lSt = Math.floor(evt.x/laneWidth);
  		this.lSt = Math.max(Math.min(3,this.lSt),0);
  		this.rSt = Math.floor(evt.y/rowHeight);
  		this.rSt = Math.max(Math.min(4,this.rSt),0);
	},
	handleTouchEnd: function (evt) {
  		var laneWidth, rowHeight;
  		laneWidth = 320/4;
  		rowHeight = 460/5;
  			this.lEnd = Math.floor(evt.x/laneWidth);
  		this.lEnd = Math.max(Math.min(3,this.lEnd),0);
  		this.rEnd = Math.floor(evt.y/rowHeight);
  		this.rEnd = Math.max(Math.min(4,this.rEnd),0);
	},
	update: function(evt) {
              this.frameCount += 1;
              if(this.frameCount == 1) {
                  this.boom = new Sprite(320,460);
                  this.boom.image = game.assets['res/Boom.png'];
                  this.smoke = new Sprite(320,460);
                  this.smoke.image = game.assets['res/Smoke.png'];
                  this.addChild(this.smoke);
                  this.addChild(this.boom);
              }
              if(this.frameCount == 15) {
                  this.removeChild(this.boom);
              }
              if(this.frameCount == 30) {
                  this.label1 = new Label('You have failed. <br> The area around Dexter lawn is <br> decimated. By the looks of things <br> you should be hearing screaming, <br> but the blast seems to have knocked <br> out your hearing. Best get out <br> of here before retribution for your <br> continued failure finds you.')
                  this.label1.x = 9;
                  this.label1.y = 150;
                  this.label1.color = 'red';
                  this.label1.font = '16px Gill Sans';
                  this.label1.textAlign = 'center';
                  this.label1._style.textShadow ="-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white";
                  this.addChild(this.label1);
              }
	},

}); 