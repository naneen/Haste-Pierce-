
var MenuLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	},

	init: function(){
		this._super();
        this.setMouseEnabled( true );
        this.level = null;
        this.isMute = false;

        var song = "res/music/chinese_baby_sms.mp3";
        cc.AudioEngine.getInstance().preloadMusic( song );
        cc.AudioEngine.getInstance().playMusic( song , true );
        cc.AudioEngine.getInstance().setMusicVolume( 0.5 );

        var director = cc.Director.getInstance();
        var winsize = director.getWinSize();
        var center = cc.p( 600, 300 );
       
        var bg = cc.Sprite.create( 'res/images/gameStart.png' );
        bg.setPosition( center );
        this.addChild( bg );

        var level = cc.Sprite.create( 'res/images/level.png' );
        level.setPosition( cc.p( 920, 515 ) );
        this.addChild( level );

        this.butt1 = cc.Sprite.create( 'res/images/level_easy.png');
        this.butt1.setPosition( cc.p( 820, 360 ) );
        this.butt1.setOpacity( 125 );
        this.addChild( this.butt1 );

        this.butt2 = cc.Sprite.create( 'res/images/level_medium.png');
        this.butt2.setPosition( cc.p( 990, 245 ) );
        this.butt2.setOpacity( 125 );
        this.addChild( this.butt2 );

        this.butt3 = cc.Sprite.create( 'res/images/level_hard.png');
        this.butt3.setPosition( cc.p( 850, 100 ) );
        this.butt3.setOpacity( 125 );
        this.addChild( this.butt3 );

        this.butt = cc.Sprite.create( 'res/images/sound_unmute.png');
        this.butt.setPosition( cc.p( 1150, 40 ) );
        this.butt.setOpacity( 125 );
        this.addChild( this.butt, 2 );
	},

    onMouseMoved: function( event ){
        var loc = event.getLocation();
        var b1 = this.butt1.getBoundingBoxToWorld();
        var b2 = this.butt2.getBoundingBoxToWorld();
        var b3 = this.butt3.getBoundingBoxToWorld();
        var b = this.butt.getBoundingBoxToWorld();
        this.onButt = false;

        if(cc.rectContainsPoint( b1, loc ) ){
            this.butt1.setOpacity( 500 );
            if( !this.onButt ){
                this.playEffect();
                this.onButt = true;
            }
        }else{
            this.butt1.setOpacity( 125 );
            this.onButt = false;
        }

        if(cc.rectContainsPoint( b2, loc ) ){
            this.butt2.setOpacity( 500 );
            this.playEffect();
        }else{
            this.butt2.setOpacity( 125 );
        }

        if(cc.rectContainsPoint( b3, loc ) ){
            this.butt3.setOpacity( 500 );
            this.playEffect();
        }else{
            this.butt3.setOpacity( 125 );
        }

        if(cc.rectContainsPoint( b, loc ) ){
            this.butt.initWithFile('res/images/sound_mute.png');
            this.butt.setOpacity( 200 );
            this.playEffect();
        }else{
            this.butt.initWithFile('res/images/sound_unmute.png');
            this.butt.setOpacity( 200 );
        }
    },

    onMouseDown: function(event){
        var loc = event.getLocation();
        var b1 = this.butt1.getBoundingBoxToWorld();
        var b2 = this.butt2.getBoundingBoxToWorld();
        var b3 = this.butt3.getBoundingBoxToWorld();
        var b = this.butt.getBoundingBoxToWorld();
        var onButt = false;

        if( cc.rectContainsPoint( b1, loc ) ){
            this.level = 0;
            this.onPlay();
        }

        if( cc.rectContainsPoint( b2, loc ) ){
            this.level = 1;
            this.onPlay();
        }

        if( cc.rectContainsPoint( b3, loc ) ){
            this.level = 2;
            this.onPlay();
        }

        if( cc.rectContainsPoint( b, loc ) && !this.isMute ){
            this.isMute = true;
            cc.AudioEngine.getInstance().setMusicVolume( 0 );
        }
        else if( cc.rectContainsPoint( b, loc ) && this.isMute ){
            this.isMute = false;
            cc.AudioEngine.getInstance().setMusicVolume( 0.8 );
        }
        
    },

    playEffect: function(){
        // if( !this.isMute ){
        //     cc.AudioEngine.getInstance().playEffect( "res/music/blop.mp3" );
        // }
    },

    onPlay: function() {
        var director = cc.Director.getInstance();
        director.replaceScene( cc.TransitionFade.create( 1.5, new DescriptionScene( this.level )));
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