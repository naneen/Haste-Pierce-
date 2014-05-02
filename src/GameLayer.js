var GameLayer = cc.LayerColor.extend({

    init: function() {

        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.score = 0;
        
        this.initFloor();
        this.initPlayer();
        this.initHeart();
        // this.heart = 3;
        
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
        if( !this.floor.isInitLine ) {
                this.floor.initLine();
                this.floor.isInitLine = true;
        }

        if( this.floor.coinCollected ){
            this.score += 10;
            this.scoreLabel.setString( this.score );
            this.floor.coinCollected = false;
        }

        if( this.floor.passFloor ){
            this.score += 5;
            this.scoreLabel.setString( this.score );
            this.floor.passFloor = false;
        }

        if( this.floor.playerDie && this.floor.life == 0 ){
            this.floor.playerDie = false;
            this.shadow.setVisible( true );
            cc.AudioEngine.getInstance().stopMusic( this.bgMusic );

            this.playMusic( this.gameoverMusic, false );
        }

        this.heart.decrease( this.floor.life );

        console.log( 'life:'+ this.floor.life );
    },

    initFloor: function(){
        this.floor = new Floor();
        this.floor.setAnchorPoint( cc.p( 1, 1 ) );
        this.addChild( this.floor, 1 );

    },

    initPlayer: function(){
        this.player = new Player( this.floor );
        this.player.setPosition( 500, 400 );
        this.addChild( this.player, 1 );
    },

    initHeart: function(){
        this.heart = new Heart( this );
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
        // this.shadow.setOpacity( 0 );
        this.shadow.setVisible( false );
    },

    initScore: function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'HanziPen SC', 40 );
        this.scoreLabel.setPosition( new cc.Point( 100, 540 ) );
        this.scoreLabel.setColor( cc.c3b( 255, 255, 255 ) );
        this.addChild( this.scoreLabel, 2 );
        this.scoreLabel.setString( this.score );

        this.scoreBg = cc.Sprite.create( 'res/score3.png' );
        this.scoreBg.setPosition( new cc.p( 100, 550 ) );
        this.addChild( this.scoreBg, 1 );
    },

    onKeyDown: function( e ){
        if( e == 32 )this.player.destoryBox();
        if( e == 37 || e == 39 ) this.player.walk( e );
        
        if( !this.player.started && !this.floor.started ){
            this.startGame();
        }
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
        cc.AudioEngine.getInstance().setMusicVolume( 0.5 );
    },

    countTime: function(){
        date = new Date();
        hitTime = date.getTime() * 1000;
        console.log("hitTime"+hitTime);
        return hitTime;
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

