var KeypadScene = Class.create(Scene, {

	initialize: function() {
		Scene.apply(this);
		game = Game.instance;
		
		var tx, ty, hasInput;
		this.answer = [4, 7, 8];
		this.guess = [];
		
		bg = new Sprite(_WIDTH_, _HEIGHT_);
		bg.image = game.assets['res/keypad.png'];
		this.addChild(bg);
		
		this.addEventListener(Event.TOUCH_END, this.handleTouchControl);
		this.addEventListener(Event.ENTER_FRAME,this.update);
    },

	handleTouchControl: function(e) {
		var x = e.x, y = e.y;
		var minX = 55;
		var maxX = 264;
		var minY = 92;
		var maxY = 321;
		if (x < minX || x > maxX || y < minY || y > maxY) {
			return;
		}
	
		var col = Math.floor((x-minX) / ((maxX-minX-1) / 3)); //gives us 0, 1, or 2 for x column
		var row = Math.floor(y / ((maxY-minY-1) / 3)); //gives us 0, 1, or 2 for y row
		button = Math.min(3*(row-1) + (col+1), 9); // fixes some bugs in a non-elegant way
		
		this.updateGuess(button);
		
		var button = new KeypadButton();
		button.x = (col*(maxX-minX+10)/3 + minX);
		button.y = ((row-1)*(maxY-minY+20)/3 + minY);
		this.addChild(button);
	},
	
	updateGuess: function(button) {
		this.guess.push(button);
		console.log(this.guess);
		if (this.guess.length == 3) {
			if (this.answer.toString() == this.guess.toString()) {
				console.log("success");
				game.onMissionComplete(MISSION_IDS.KEYPAD, true);
			} else {
				console.log("error");
			}
			this.guess = [];
		}
	},
	
	update: function(e) {
		//console.log('event');
	},
	
});


/**
 * Lit up Button
 */
 var KeypadButton = Class.create(Sprite, {
    initialize: function() {
        // Call superclass constructor
        Sprite.apply(this,[60, 60]);
        this.image = Game.instance.assets['res/pressedbutton.png'];        
		this.age = 0;
		this.addEventListener(Event.ENTER_FRAME, this.update);
    },
	
	update: function(e) {
		this.age++;
		if (this.age > 10) {
			this.parentNode.removeChild(this);
		}
	}
	
	
});

//Begin game code
keypadOnLoad = function() {
    Game.instance.preload('res/keypad.png', 
				 'res/pressedbutton.png');
};