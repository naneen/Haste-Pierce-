var GameLayer = cc.LayerColor.extend({

    init: function( level ) {

        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.score = 0;
        this.level = level;
        
        this.initFloor();
        this.initPlayer();
        this.initHeart();
        this.initMusic();
        // this.heart = 3;
        
        this.initScore();
        this.initBackgound();

        // this.bgMusic = "res/music/toy_doll.mp3";
        // this.gameoverMusic = "res/music/hahaha.mp3";
        // this.coinMusic = "res/music/coin8.wav";
        // this.dieMusic = "res/music/squeeze-toy-1.mp3";
        
        this.playMusic( "res/music/toy_doll.mp3", true );
        this.isMute = false;

        this.floor.player = this.player;
        this.setKeyboardEnabled( true );
        this.setMouseEnabled( true );
        this.scheduleUpdate();

        return true;
    },

    update: function( dt ){
        if( !this.floor.isInitLine ) {
                this.floor.initLine();
                this.floor.isInitLine = true;
        }

        if( this.floor.coinCollected ){
            this.score += 10;
            this.scoreLabel.setString( this.score );
            this.playEffect( "res/music/coin8.wav" );
            this.floor.coinCollected = false;
        }

        if( this.floor.passFloor ){
            this.score += 5;
            this.scoreLabel.setString( this.score );
            this.playEffect( 'res/music/floor.wav' );
            this.floor.passFloor = false;
        }

        if( this.floor.effectDie ){
            this.playEffect( "res/music/squeeze-toy-1.mp3" );
            this.floor.effectDie = false;
        }

        // if( this.floor.playerDie && this.floor.life == 0 ){
        if( this.floor.gameOver ){
            // this.floor.gameOver = true;
            this.shadow.setVisible( true );
            this.playMusic( "res/music/hahaha.mp3" , false );
            this.setKeyboardEnabled( false );
            this.floor.unscheduleUpdate();
            this.player.unscheduleUpdate();
            this.unscheduleUpdate();
        }

        this.heart.decrease( this.floor.life );
    },

    initFloor: function(){
        this.floor = new Floor( this.level );
        this.floor.setAnchorPoint( cc.p( 1, 1 ) );
        this.addChild( this.floor, 1 );

    },

    initPlayer: function(){
        this.player = new Player( this.floor, this.level );
        this.player.setPosition( 500, 400 );
        this.addChild( this.player, 1 );
    },

    initHeart: function(){
        this.heart = new Heart( this );
        this.heart.setPosition( cc.p( 1070, 550 ) );
        this.addChild( this.heart, 1 );
    },

    initBackgound: function(){
        this.background = new Background('bg2');
        this.background.setPosition( cc.p( 600, 300) );
        this.addChild( this.background );

        this.shadow = new Background('gameOver');
        this.shadow.setPosition( cc.p(600, 300) );
        this.addChild( this.shadow, 2 );
        // this.shadow.setOpacity( 0 );
        this.shadow.setVisible( false );
    },

    initScore: function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'HanziPen SC', 40 );
        this.scoreLabel.setPosition( new cc.Point( 100, 540 ) );
        this.scoreLabel.setColor( cc.c3b( 255, 255, 255 ) );
        this.addChild( this.scoreLabel, 2 );
        this.scoreLabel.setString( this.score );

        this.scoreBg = cc.Sprite.create( 'res/images/score3.png' );
        this.scoreBg.setPosition( new cc.p( 100, 550 ) );
        this.addChild( this.scoreBg, 1 );
    },

    initMusic: function(){
        this.butt = cc.Sprite.create( 'res/images/sound_unmute.png');
        this.butt.setPosition( cc.p( 1150, 40 ) );
        this.butt.setOpacity( 200 );
        this.addChild( this.butt, 2 );
    },

    onKeyDown: function( e ){

        if( e == 32 ){
            this.player.destoryBox();
        }
        else if( e == 37 || e == 39 ){
            this.player.walk( e );
        }
        else if( e == 80 && !this.isPause ){
            this.player.pause();
            this.floor.pause();
            this.isPause = true;
        }
        else if( e == 80 && this.isPause ){
            this.player.resume();
            this.floor.resume();
            this.isPause = false;
        }
        else if(e == 82){
            this.restart();
        }

        //
        if( !this.player.started && !this.floor.started ){
            this.startGame();
        }
    },

    restart: function(){
        var director = cc.Director.getInstance();
        director.replaceScene( cc.TransitionFade.create( 1.5, new MenuScene()));
    },

    startGame: function() {
        this.player.started = true;
        this.player.runAction( this.player.movingAction );

        this.floor.started = true;
        // this.scheduleUpdate();
        this.floor.scheduleUpdate();
        this.player.scheduleUpdate();

    },

    playMusic: function( song, re ){
        cc.AudioEngine.getInstance().preloadMusic( song );
        cc.AudioEngine.getInstance().playMusic( song , re );
        cc.AudioEngine.getInstance().setMusicVolume( 0.8 );
    },

    playEffect: function( effect ){
        if( !this.isMute ){
            cc.AudioEngine.getInstance().playEffect( effect );
        }
    },

    onMouseMoved: function( event ){
        var loc = event.getLocation();
        var b = this.butt.getBoundingBoxToWorld();

        if( !this.isMute ){
            if(cc.rectContainsPoint( b, loc ) ){
                this.butt.initWithFile('res/images/sound_mute.png');
                this.butt.setOpacity( 200 );

            }else{
                this.butt.initWithFile('res/images/sound_unmute.png');
                this.butt.setOpacity( 200 );
            }
        }
        else{
            if(cc.rectContainsPoint( b, loc ) ){
                this.butt.initWithFile('res/images/sound_unmute.png');
                this.butt.setOpacity( 200 );

            }else{
                this.butt.initWithFile('res/images/sound_mute.png');
                this.butt.setOpacity( 200 );
            }
        }
    },

    onMouseDown: function(event){
        var loc = event.getLocation();
        var b = this.butt.getBoundingBoxToWorld();

        if( cc.rectContainsPoint( b, loc ) && !this.isMute ){
            this.isMute = true;
            this.butt.initWithFile('res/images/sound_mute.png');
            cc.AudioEngine.getInstance().setMusicVolume( 0 );
        }
        else if( cc.rectContainsPoint( b, loc ) && this.isMute ){
            this.isMute = false;
            this.butt.initWithFile('res/images/sound_unmute.png');
            cc.AudioEngine.getInstance().setMusicVolume( 0.8 );
        }
    }
});

var StartScene = cc.Scene.extend({

    ctor: function( level ){
        this._super();
        this.level = level;
    },

    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init( this.level );
        this.addChild( layer );
    }
});

