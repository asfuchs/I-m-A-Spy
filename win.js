WinSceneOnLoad = function() {
    var game = getGame();
    game.preload('res/inBetween.png');
}; 
var WinScene = Class.create(Scene, {
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
		_GAME_.pushScene(new CreditsScene());
},
handleTouchEnd: function (evt) {
		//
},
update: function(evt) {
            this.frameCount += 1;
            if(this.frameCount == 1) {
                this.label1 = new Label('Congratulations! <br> You have succeeded in disarming <br> the bomb. This may be your redemption <br> as a secret agent. Maybe you <br> will actually get to go on another <br> real mission again.')
                this.label1.x = 9;
                this.label1.y = 285;
                this.label1.color = 'red';
                this.label1.font = '16px Gill Sans';
                this.label1.textAlign = 'center';
                this.label1._style.textShadow ="-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white";
                this.addChild(this.label1);
            }
},
}); 