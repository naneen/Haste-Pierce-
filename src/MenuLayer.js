
var MenuLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	},

	init: function(){
		this._super();
		this.setTouchEnabled(true);
        this.setTouchMode(1);

        var song = "res/music/chinese_baby_sms.mp3";
        cc.AudioEngine.getInstance().preloadMusic( song );
        cc.AudioEngine.getInstance().playMusic( song , true );

        var director = cc.Director.getInstance();
        var winsize = director.getWinSize();
        var center = cc.p( 600, 300 );
       
        var bg = cc.Sprite.create( 'res/images/gameStart.png' );
        bg.setPosition( center );
        this.addChild( bg );
	},

	onTouchBegan:function( touch, event ) {
        cc.log("==onplay clicked");
        var director = cc.Director.getInstance();
        director.replaceScene(cc.TransitionFade.create(1.5, new StartScene()));
    }
});

var MenuScene = cc.Scene.extend({
	ctor: function(){
		this._super();
		var layer = new MenuLayer();
		layer.init();
		this.addChild( layer );
	}
});