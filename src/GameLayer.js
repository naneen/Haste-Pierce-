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

        this.floor.player = this.player;
        this.setKeyboardEnabled( true );
        return true;
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
        this.Background = new Background();
        this.Background.setPosition( cc.p( 600, 300) );
        this.addChild( this.Background );
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

