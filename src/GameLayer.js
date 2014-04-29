var GameLayer = cc.LayerColor.extend({

    init: function() {

        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.score = 0;
        
        this.initFloor();
        this.initPlayer();
        this.initHeart();
        
        this.initScore();
        this.initBackgound();

        this.bgMusic = "res/music/Peach Gardens.wav";
        this.gameoverMusic = "res/music/effect_game_fail.mp3"
        this.playMusic( this.bgMusic, true );

        this.floor.player = this.player;
        this.setKeyboardEnabled( true );
        this.scheduleUpdate();

        return true;
    },

    update: function( dt ){
        if( this.floor.coinCollected ){
            this.score++;
            this.scoreLabel.setString( this.score );
            this.floor.coinCollected = false;
        }

        if( this.floor.passFloor ){
            this.score += 10;
            this.scoreLabel.setString( this.score );
            this.floor.passFloor = false;
        }

        if( this.floor.playerDie ){
            console.log("die");
            this.floor.playerDie = false;
            this.shadow.setOpacity( 500 );
            cc.AudioEngine.getInstance().stopMusic( this.bgMusic );

            this.playMusic( this.gameoverMusic, false );
            this.setKeyboardEnabled( false );
        }
    },

    initFloor: function(){
        this.floor = new Floor();
        this.floor.setAnchorPoint( cc.p( 1, 1 ) );
        this.addChild( this.floor, 1 );
        this.floor.scheduleUpdate();
    },

    initPlayer: function(){
        this.player = new Player( this.floor );
        this.player.setPosition( 500, 550 );
        this.player.scheduleUpdate();
        this.addChild( this.player, 1 );
    },

    initHeart: function(){
        this.heart = new Heart();
        this.heart.setPosition( cc.p( 1050, 550 ) );
        this.addChild( this.heart, 1 );
    },

    initBackgound: function(){
        this.background = new Background('bg2');
        this.background.setPosition( cc.p( 600, 300) );
        this.addChild( this.background );

        this.shadow = new Background('gameOver');
        this.shadow.setPosition( cc.p(600, 300) );
        this.addChild( this.shadow, 2 );
        this.shadow.setOpacity( 0 );
    },

    initScore: function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 100, 550 ) );
        this.scoreLabel.setColor( cc.c3b( 200, 0, 0 ));
        this.addChild( this.scoreLabel, 1);
        this.scoreLabel.setString( this.score );
    },

    onKeyDown: function( e ){
        // console.log(e);
        if( e == 32 )this.player.destoryBox();
        if( e == 37 || e == 39 ) this.player.walk( e );
        
        if( !this.player.started ){
            this.startGame();
        }
    },

    startGame: function() {
        this.player.start();
    },

    updateScore: function(){
        this.score++;
        // this.scoreLabel.setString( this.score );
        console.log("up point");
    },

    playMusic: function( song, re ){
        cc.AudioEngine.getInstance().preloadMusic( song );
        cc.AudioEngine.getInstance().playMusic( song , re );
        cc.AudioEngine.getInstance().setMusicVolume( 0.5 );
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

