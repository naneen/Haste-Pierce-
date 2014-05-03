
var Music = cc.Sprite.extend({

	ctor: function( floor ){
		this._super();
		this.floor = floor;

		this.init();
		this.preload();
	},

	preload: function(){
		cc.Loader.shareLoader().preload([
    		{type:"effect",src:"Resources/effect2"},
    		{type:"bgm",src:"Resources/background"}
   		]);
	},

	init: fuction(){
		cc.AudioEngine.getInstance().setEffectsVolume(0.5);
        cc.AudioEngine.getInstance().setBackgroundMusicVolume(0.5);
	}
});