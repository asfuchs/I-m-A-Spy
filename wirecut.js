var cutCount;
var wireScene;

var WirecutScene = Class.create(Scene, {

	initialize: function() {
		Scene.apply(this);
		game = Game.instance;
		
		cutCount = 0;
		wireScene = this;
		
		var tx, ty, hasInput;
		
		bg = new Sprite(_WIDTH_, _HEIGHT_);
		bg.image = game.assets['res/wires.png'];
		this.addChild(bg);
		
		// add the blue wires
		this.addBlueWire(54, -68);
		this.addBlueWire(94, -108);
		this.addBlueWire(108, -102);
		this.addBlueWire(180, -68);
		this.addBlueWire(217, -53);
		
		// creates the intro label object
		this.createIntroLabel();
		this.addChild(this.instLabel);	
		
		this.addEventListener(Event.TOUCH_END, this.handleTouchControl);
		this.addEventListener(Event.ENTER_FRAME,this.update);
    },

	addBlueWire: function(x, y) {
		var wire = new BlueWire(0, 0);
		wire.addCallback(this.onCut);
		wire.x = x;
		wire.y = y;
		this.addChild(wire);
	},
	
	onCut: function() {
	 cutCount++;
		if(cutCount >= 5)
		{
		  var label = new Label('Bomb:<br><br>Disarmed');
  		label.x = 0;
  		label.y = 30;        
  		label.color = 'white';
  		label.font = '32px strong';
  		label.textAlign = 'center';
  		label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
  		wireScene.addChild(label);
		  window.setTimeout(function()
      {
        game.onMissionComplete(MISSION_IDS.WIRECUT, true);
      }, 2000);
		}
	},
	
	// function to create text on screen
	createIntroLabel: function() {
		label = new Label('');
		label.x = 110;
		label.y = 35;        
		label.color = 'white';
		label.font = '16px strong';
		label.textAlign = 'center';
		label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		this.stepLabel = label; 

		instructions = new Label('Now that you have made it past the<br> keypad, it\'s time to cut the correct<br> wires. Our intel has told us that<br> the bomb maker\'s favorite <br>color is blue. <br><br>Cut all the blue wires!');
		instructions.x = 9;
		instructions.y = 120;
		instructions.color = 'white';
		instructions.font = '20px strong';
		instructions.textAlign = 'center';
		instructions._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		this.instLabel = instructions;
	},
	
	handleTouchControl: function(e) {
		var x = e.x, y = e.y;
		
		// this removes the label on first touch
		if (this.instLabel) {
			this.removeChild(this.instLabel);
			this.instLabel = false;
			return;
		}
		//console.log(e.x, e.y-360);
	},
	
	update: function(e) {
		//console.log('event');
	},
	
});


/**
 * Blue Wire
 */
 var BlueWire = Class.create(Sprite, {
    initialize: function() {
        // Call superclass constructor
        Sprite.apply(this,[3, 360]);
        this.image = Game.instance.assets['res/bluewire.png'];        
		this.addEventListener(Event.TOUCH_END, this.touched);
    },
   
  addCallback: function(callback) {
    this.callback = callback;
  },
	
	touched: function(e) {
		var game = Game.instance;
		game.assets['res/wirecut.mp3'].play();
		//console.log('blue wire');
		this.parentNode.removeChild(this);
		
		this.callback();
	},
	
});

//Begin game code
wirecutOnLoad = function() {
  _GAME_.preload('res/wires.png', 'res/bluewire.png', 'res/wirecut.mp3');
};