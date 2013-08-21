var CreditsScene = Class.create(Scene, {

	initialize: function() {
		Scene.apply(this);
		game = Game.instance;
		
		bg = new Sprite(_WIDTH_, _HEIGHT_);
		bg.image = game.assets['res/credit.png'];
		this.addChild(bg);
    },
});

creditsOnLoad = function() {
  _GAME_.preload('res/credit.png');
};