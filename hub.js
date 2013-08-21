hubOnLoad = function()
{
  Game.instance.preload('res/inBetween.png', 'res/giveup.png', 'res/startagain.png');
};

function pad(n, width, z)
{
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var HubScene = Class.create(Scene,
{
  initialize: function()
  {
    Scene.apply(this);
    
    var bg = new Sprite(320, 460);
    bg.image = _GAME_.assets['res/inBetween.png'];
    this.addChild(bg);
    
    this.backgroundColor = 'black';

    this.locationHandler = null;
    this.locations = null;
    this.currentMission = null;
    this.missionIndex = 0;
    this.win = false;
    
    this.titleLabel = new Label();
    this.titleLabel.x = 0;
    this.titleLabel.y = 60;        
    this.titleLabel.color = 'white';
    this.titleLabel.font = '24px gill sans';
    this.titleLabel.textAlign = 'center';
    this.addChild(this.titleLabel);
    
    this.missionLabel = new Label('');
    this.missionLabel.x = 0;
    this.missionLabel.y = 310;        
    this.missionLabel.color = 'white';
    this.missionLabel.font = '24px gill sans';
    this.missionLabel.textAlign = 'center';
    this.addChild(this.missionLabel);
    
    this.timerLabel = new Label('');
    this.timerLabel.x = 0;
    this.timerLabel.y = _HEIGHT_ - 64;        
    this.timerLabel.color = 'red';
    this.timerLabel.font = '60px gill sans';
    this.timerLabel.textAlign = 'left';
    this.addChild(this.timerLabel);
    
    this.endTime = new Date();
    this.endTime.setMinutes(this.endTime.getMinutes() + 1); // player gets 20 mins
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
    
    var hub = this;
    
    this.giveUp = new Sprite(84, 29);
    this.giveUp.x = _WIDTH_ - this.giveUp.width - 10;
    this.giveUp.y = _HEIGHT_ - this.giveUp.height - 10;
    this.giveUp.image = _GAME_.assets['res/giveup.png'];
    this.giveUp.addEventListener(Event.TOUCH_END, function()
    {
      _GAME_.skipToNext();
    });
    this.addChild(this.giveUp);
    
    this.startAgain = new Sprite(84, 29);
    this.startAgain.x = _WIDTH_ - this.startAgain.width - 10;
    this.startAgain.y = _HEIGHT_ - this.startAgain.height - 10;
    this.startAgain.image = _GAME_.assets['res/startagain.png'];
    this.startAgain.addEventListener(Event.TOUCH_END, function()
    {
      hub.restart();
      hub.removeChild(hub.startAgain);
      hub.addChild(hub.giveUp);
    });
  },
  
  restart: function()
  {
    this.endTime = new Date();
    this.endTime.setMinutes(this.endTime.getMinutes() + 1); // player gets 20 mins
    this.currentMission = this.locations[0];
    this.missionIndex = 0;
    
    this.removeChild(this.startAgain);
    this.addChild(this.giveUp);
    _GAME_.generateScenes();
  },
  
  update: function(evt)
  {
    this.titleLabel.text = 'Missions ' + this.missionIndex + '/' + this.locations.length + ' Completed';
    if(this.currentMission)
    {
      var dist = this.locationHandler.distanceTo(this.currentMission);
      var timeLeft = this.endTime.getTime() - new Date().getTime();
      var secondsLeft = timeLeft / 1000;
      var minutesLeft = Math.floor(secondsLeft / 60);
      secondsLeft -= minutesLeft * 60;
      secondsLeft = Math.floor(secondsLeft);
      
      if(minutesLeft < 0)
      {
        this.currentMission = null;
      }
      else
      {
        this.missionLabel.text = 'Target: ' + this.currentMission.name;
        this.missionLabel.text += '<br>Distance: ' + dist.toFixed(0) + ' meters';
        
        this.timerLabel.text = pad(minutesLeft, 2, '0') + ':' + pad(secondsLeft, 2, '0');
      }
    }
    else
    {
      this.timerLabel.text = '';
      if(this.win)
      {
        _GAME_.pushScene(new WinScene());
      }
      else
      {
        _GAME_.pushScene(new LoseScene());
      }
    }
  },
  
  setMissions: function(locationHandler, locations)
  {
    this.locationHandler = locationHandler;
    this.locations = locations;
    if(locations && locations.length > 0)
    {
      this.currentMission = locations[0];
    }
  },
  
  onMissionComplete: function(success)
  {
    if(success)
    {
      if(++this.missionIndex < this.locations.length)
      {
        this.currentMission = this.locations[this.missionIndex];
      }
      else
      {
        // Game over / player wins
        this.currentMission = null;
        this.win = true;
      }
    }
  },
});