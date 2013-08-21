enchant();

var _GAME_;
var _WIDTH_ = 320;
var _HEIGHT_ = 460;

var MISSION_IDS = new Object();
MISSION_IDS.NONE = -1;
MISSION_IDS.TIE = 4;
MISSION_IDS.SKITTLES = 1;
MISSION_IDS.LOCK = 2;
MISSION_IDS.KEYPAD = 3;
MISSION_IDS.WIRECUT = 0;

function getGame()
{
  return _GAME_;
}

window.onload = function()
{
  _GAME_ = new Core(_WIDTH_, _HEIGHT_);
  _GAME_.fps = 30;
  _GAME_.location = MISSION_IDS.NONE;
  
  hubOnLoad();
  cassetteOnLoad();
  skittlesOnLoad();
  keypadOnLoad();
  tieOnLoad();
  lockOnLoad();
  wirecutOnLoad();
  creditsOnLoad();
  LoseSceneOnLoad();
  WinSceneOnLoad();
  
  _GAME_.start();
  window.scrollTo(0, 0);
  
  var scenes;
  var locations;
  var doingIntro = true;

  _GAME_.onload = function()
  {
    _GAME_.rootScene.backgroundColor = 'black';
    
    locations = generateLocations();
    scenes = _GAME_.generateScenes();
    
    var locationHandler = new LocationHandler(locations, _GAME_.onLocationEnter);
    
    _GAME_.hub = new HubScene();
    _GAME_.hub.setMissions(locationHandler, locations);
    _GAME_.pushScene(_GAME_.hub);
    
    locationHandler.start();
    
    var casette = new CassetteScene();
    _GAME_.pushScene(casette);
  };
  
  _GAME_.onLocationEnter = function(location)
  {
    if(doingIntro)
    {
      return;
    }
    
    // Not passing in a location means we are not in any specific area
    if(location == undefined)
    {
      location = MISSION_IDS.NONE;
    }
    
    // Only allow the player to enter the current mission
    if(!_GAME_.hub.currentMission || _GAME_.hub.currentMission.id != location)
    {
      return;
    }

    // If we are already in the right location, don't do anything
    if(_GAME_.location != location)
    {      
      _GAME_.pushScene(scenes[location]);
      
      _GAME_.location = location;
    }
  }
  
  _GAME_.skipToNext = function()
  {
    _GAME_.onLocationEnter(_GAME_.hub.currentMission.id);
  }
  
  _GAME_.onMissionComplete = function(mission, success)
  {
    if(_GAME_.hub.currentMission.id != mission && !doingIntro)
    {
      return;
    }
    
    if(doingIntro)
    {
      doingIntro = false;
      _GAME_.hub.restart();
    }
    else
    {
      _GAME_.hub.onMissionComplete(success);
    }
    
    _GAME_.popScene();
  }
  
  _GAME_.generateScenes = function()
  {
    var scenes = new Array();
    
    scenes[MISSION_IDS.TIE] = new TieScene();
    scenes[MISSION_IDS.SKITTLES] = new SkittlesScene();
    scenes[MISSION_IDS.LOCK] = new LockScene();
    scenes[MISSION_IDS.KEYPAD] = new KeypadScene();
    scenes[MISSION_IDS.WIRECUT] = new WirecutScene();
    
    return scenes;
  }
  
  function generateLocations()
  {
    var constructionInnovations = new GPSLocation('CI Building', MISSION_IDS.TIE, 20,
      [
        {latitude: 35.2995195, longitude: -120.6627912},
        {latitude: 35.2992437, longitude: -120.663097}
      ]);
      
    var courtyard = new GPSLocation('CSC Courtyard', MISSION_IDS.SKITTLES, 20,
      [
        {latitude: 35.3000427, longitude: -120.6620456}
      ]);
      
    var csl = new GPSLocation('CSL', MISSION_IDS.LOCK, 20,
      [
        {latitude: 35.3002191, longitude: -120.6624935}
      ]);
      
    var arch = new GPSLocation('Architecture', MISSION_IDS.KEYPAD, 20,
    [
      {latitude: 35.300421, longitude: -120.6643484}
    ]);
    
    var dexter = new GPSLocation('Dexter Lawn', MISSION_IDS.WIRECUT, 20,
      [
        {latitude: 35.3005593, longitude: -120.6628422},
        {latitude: 35.3005046, longitude: -120.6632606}
      ]);
    
    var locations = new Array();
    locations.push(constructionInnovations);
    locations.push(courtyard);
    locations.push(csl);
    locations.push(arch);
    locations.push(dexter);
    
    return locations;
  }
};

function output(text, replace)
{
  if(replace)
  {
    document.getElementById('output').innerHTML = text;
  }
  else
  {
    document.getElementById('output').innerHTML += text + '<br/>';
  }
}