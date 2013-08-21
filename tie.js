	tieOnLoad = function() {
		var game = getGame();
		game.preload('res/bg.png', 'res/Tie0.png',
         'res/Tie1.png', 'res/Tie2.png',
         'res/Tie3.png', 'res/Tie4.png',
         'res/Tie5.png', 'res/Tie6.png',
         'res/Swish.wav');
	}; 
	// TieScene  
	var TieScene = Class.create(Scene, {
     	// The main gameplay scene. 
    	initialize: function() {
        	var game, label, instructions, bg;
        	Scene.apply(this);
        	game = Game.instance;
        	// Label
			label = new Label('');
			label.x = 110;
			label.y = 35;        
			label.color = 'white';
			label.font = '16px strong';
			label.textAlign = 'center';
			label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
			this.stepLabel = label; 

			instructions = new Label('You are a spy and you need <br> <br> to look snappy on your mission. <br> <br> I hope you know how to tie a tie. <br> <br> Swipe in the correct direction <br> <br> for each step to tie your tie <br> <br> so you look fit for action. <br> <br> <br> Tap to continue');
			instructions.x = 9;
			instructions.y = 120;
			instructions.color = 'white';
			instructions.font = '20px strong';
			instructions.textAlign = 'center';
			instructions._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
			this.instLabel = instructions;

        	bg = new Sprite(320,460);
        	bg.image = game.assets['res/bg.png'];

			this.addChild(bg);
			this.addChild(label);
			this.addChild(instructions);
        // Touch listener
        	this.addEventListener(Event.TOUCH_START, this.handleTouchStart);
        	this.addEventListener(Event.TOUCH_END, this.handleTouchEnd);
		// Update
			this.addEventListener(Event.ENTER_FRAME,this.update);
		// Instance variables
			this.step = 0;
			this.lSt = -1;
			this.lEnd = -1;
			this.rSt = -1;
			this.rEnd = -1;
			this.b = bg;
    	},
    	handleTouchStart: function (evt) {
    		var laneWidth, rowHeight;
    		laneWidth = 320/3;
    		rowHeight = 460/4;
    		this.lSt = Math.floor(evt.x/laneWidth);
    		this.lSt = Math.max(Math.min(2,this.lSt),0);
    		this.rSt = Math.floor(evt.y/rowHeight);
    		this.rSt = Math.max(Math.min(3,this.rSt),0);
		},
		handleTouchEnd: function (evt) {
    		var laneWidth, rowHeight;
    		laneWidth = 320/3;
    		rowHeight = 460/4;
   			this.lEnd = Math.floor(evt.x/laneWidth);
    		this.lEnd = Math.max(Math.min(2,this.lEnd),0);
    		this.rEnd = Math.floor(evt.y/rowHeight);
    		this.rEnd = Math.max(Math.min(3,this.rEnd),0);
		},
		update: function(evt) {
    		if(this.step == 0) {
    			if(this.lEnd == this.lSt && this.lSt > 0) {
    				this.removeChild(this.instLabel);
    				this.b.image = game.assets['res/Tie0.png'];
    				this.setStep();
    				this.lEnd = -1;
    			}
    		}
    		if(this.step == 1) {
    			if(this.lEnd < this.lSt && this.lEnd >= 0) {
    			  game.assets['res/Swish.wav'].play();
    				this.b.image = game.assets['res/Tie1.png'];
    				this.setStep();
    				this.lEnd = -1;
    			}
    		}
    		if(this.step == 2) {
    			if(this.lEnd > this.lSt && this.lEnd >= 0) {
    			  game.assets['res/Swish.wav'].stop();
            game.assets['res/Swish.wav'].play();
    				this.b.image = game.assets['res/Tie2.png'];
    				this.setStep();
    				this.lEnd = -1;
    			}
    		}
    		if(this.step == 3) {
    			if(this.lEnd < this.lSt && this.lEnd >= 0) {
    			  game.assets['res/Swish.wav'].stop();
            game.assets['res/Swish.wav'].play();
    				this.b.image = game.assets['res/Tie3.png'];
    				this.setStep();
    				this.rEnd = -1;
    			}
    		}
    		if(this.step == 4) {
    			if(this.rEnd < this.rSt && this.rEnd >= 0) {
    			  game.assets['res/Swish.wav'].stop();
            game.assets['res/Swish.wav'].play();
    				this.b.image = game.assets['res/Tie4.png'];
    				this.setStep();
    				this.rEnd = -1;
    			}
    		}
    		if(this.step == 5) {
    			if(this.rEnd > this.rSt && this.rEnd >= 0) {
    			  game.assets['res/Swish.wav'].stop();
            game.assets['res/Swish.wav'].play();
    				this.b.image = game.assets['res/Tie5.png'];
    				this.setStep();
    				this.rEnd = -1;
    			}
    		}
    		if(this.step == 6) {
    		  if (this.rEnd >= 0) {
              game.assets['res/Swish.wav'].stop();
              this.b.image = game.assets['res/Tie6.png'];
              this.stepLabel.text = 'FINISH';
              this.step += 1;
              this.rEnd = -1;
          }
    		}
    		if(this.step == 7) {
            if (this.rEnd >= 0) {
                this.b.image = game.assets['res/bg.png'];
                this.removeChild(this.stepLabel);
                this.instLabel.text = 'Congratulations! <br> <br> You know how to tie a tie. <br> <br> But that has taken all your <br> <br> energy. Please proceed to <br> <br> the CSC courtyard to find <br> <br> your emergency skittles <br> <br> that you have stashed there.'
                this.addChild(this.instLabel);
                
                window.setTimeout(function()
                {
                  game.onMissionComplete(MISSION_IDS.TIE, true);
                }, 4000);
            }   
        }

		},
		setStep: function() {
    		this.step += 1;
			this.stepLabel.text = 'STEP<br>' + this.step;
   		}
	}); 