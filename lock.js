lockOnLoad = function() {
  _GAME_.preload('res/lock.png', 'res/swipe.wav');
};

var LockScene = Class.create(Scene, {

    initialize: function() {
        var cutAlert;
        Scene.apply(this);

        bg = new Sprite(_WIDTH_, _HEIGHT_);
        bg.image = _GAME_.assets['res/lock.png'];
        this.addChild(bg);

        this.addEventListener(Event.TOUCH_START, this.findStart);
        this.addEventListener(Event.TOUCH_END, this.findEnd);

        this.createIntroLabel();
        this.addChild(this.instLabel);

        var cutLine1 = new Label('- - - - -');
        cutLine1.x = 110;
        cutLine1.y = 200;
        cutLine1.font = '10px strong';
        this.addChild(cutLine1);

        var cutLine2 = new Label('- - - - -');
        cutLine2.x = 184;
        cutLine2.y = 200;
        cutLine2.font = '10px strong';
        this.addChild(cutLine2);

        this.cutStart1 = false;
        this.cutStart2 = false;
        this.cutEnd1 = false;
        this.cutEnd2 = false;


    },

    createIntroLabel: function() {
        var instructions = new Labell();
        instructions.text = 'You are in possession of a pocket laser.<br>Swipe across the lines to cut the lock.';
        instructions.font = '15px optima';
        this.instLabel = instructions;
        this.addChild(this.instLabel);    
    },

    findStart: function(e){
        if (this.instLabel) {
            this.removeChild(this.instLabel);
            this.instLabel = false;
        }
        if ((e.y > 180) && (e.y < 230))
        {
            if ((e.x > 0) && (e.x < 110))
            {
                this.cutStart1 = true;
            }
            else if ((e.x > 138) && (e.x < 180))
            {
                this.cutStart2 = true;
            }   
        }
    },

    findEnd: function(e){
        if ((e.y > 180) && (e.y < 230)) //if in the correct y range
        {  
            if ((((this.cutEnd1) && (this.cutStart2)) && ((e.x < 320) && (e.x > 212))) || ((this.cutEnd2 && this.cutStart1) && ((e.x < 180) && (e.x > 110)))) //if one side has already been swiped and another has just been swiped
            {
                if (this.cutEnd2 == true) //add swipe line & remove text if right side had already been swiped
                {
                    var cutLine1 = new Label('__');
                    cutLine1.y = 158;
                    cutLine1.font = '50px strong';
                    cutLine1.x = 110;
                    this.var1 = cutLine1;
                    this.addChild(this.var1);
                    
                    if (this.varr2) {
                        this.removeChild(this.varr2);
                        this.varr2 = false;
                    }
                }
                
                if (this.cutEnd1 == true) //add swipe line & remove text if right side had already been swiped
                {
                    var cutLine2 = new Label('__');
                    cutLine2.y = 158;
                    cutLine2.font = '50px strong';
                    cutLine2.x = 180;
                    this.var2 = cutLine2;
                    this.addChild(this.var2);
                    
                    if (this.varr) {
                        this.removeChild(this.varr);
                        this.varr = false;
                    }
                }

                var congrats = new Labell();
                congrats.text = 'Congrats!<br> <br>You successfully cut the lock!';
                this.addChild(congrats);

                //put end here
                window.setTimeout(function()
                {
                  game.onMissionComplete(MISSION_IDS.LOCK, true);
                }, 2000);
            }

            else if ((this.cutStart1 == true) && ((e.x < 180) && (e.x > 110))) //if the left side is the first side swiped
            {   
                if (!this.done) //check to see if side has already been swiped
                {
                    _GAME_.assets['res/swipe.wav'].play();
                    var cutAlert = new Labell();
                    this.varr = cutAlert;
                    this.addChild(this.varr);

                    var cutLine1 = new Label('__'); //add swipe line to left side
                    cutLine1.x = 110;
                    cutLine1.y = 158;
                    cutLine1.font = '50px strong';
                    this.var1 = cutLine1;
                    this.addChild(this.var1);

                    this.cutEnd1 = true;
                    this.done = true;
                }

                
            }
            else if  ((this.cutStart2 == true) && ((e.x < 320) && (e.x > 212)))
            {
                if (!this.done1) //check to see if side has already been swiped
                {
                    _GAME_.assets['res/swipe.wav'].play();
                    var cutAlert2 = new Labell();
                    this.varr2 = cutAlert2;
                    this.addChild(this.varr2);
                    
                    var cutLine2 = new Label('__');
                    cutLine2.x = 180;
                    cutLine2.y = 158;
                    cutLine2.font = '50px strong';
                    this.addChild(cutLine2);

                    this.cutEnd2 = true;
                    this.done1 = true;
                }  

                
            }
        } 
        this.cutStart1 = false; //set start values back to false
        this.cutStart2 = false;
    }
});

var Labell = Class.create(Label, { //create label to cut down on lines of code
    initialize: function(){
        Label.apply(this);
        this.x = 8;
        this.y = 20;
        this.color = 'white';
        this.font = '20px optima';
        this.textAlign = 'center';
        this.text = 'You have cut a side.<br> <br>Quick - Cut the other side!';
    }
});