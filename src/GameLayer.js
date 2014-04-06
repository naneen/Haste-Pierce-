var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.score = 0;

        this.initFloor();
        this.initMonster();
        this.initBall();
        this.initPlayer();
        this.initScore();
        this.initBackgound();

        this.setKeyboardEnabled( true );
        this.scheduleUpdate();

        return true;
    },

    update: function(){
        if( this.Player.checkDie( this.Monster ) ){
            this.endGame();
        }

        if( this.Player.checkCollect( this.Ball.getBoundingBoxToWorld() ) ){
            this.ballDisappear();
        }

    },

    initFloor: function(){
        this.Floor = new Floor();
        this.Floor.setPosition( cc.p( 0, -90 ) );
        // this.Floor.scheduleUpdate();
        this.addChild( this.Floor, 1 );
    },

    initMonster: function(){
        this.Monster = new Monster( this.Floor );
        this.Monster.setPosition( cc.p( 700, 60+10+400 ));
        this.addChild( this.Monster, 1);
        this.Monster.scheduleUpdate();
    },

    initBall: function(){
        this.Ball = new Ball( this.Floor );
        this.Ball.setPosition( cc.p( 500, 60+10+400 ));
        this.addChild( this.Ball, 1 );
        this.Ball.scheduleUpdate();
    },

    initPlayer: function(){
        this.Player = new Player( this.Floor );
        this.Player.setPosition( cc.p( 400, 60+10+400 ));
        this.addChild( this.Player, 1);
        this.Player.scheduleUpdate();
    },

    initBackgound: function(){
        this.Background = new Background();
        this.Background.setPosition( cc.p( 400, 300) );
        this.addChild( this.Background );
    },

    initScore: function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 50, 550 ) );
        this.addChild( this.scoreLabel, 1);
        this.scoreLabel.setString( this.score );
    },

    onKeyDown: function(e){
        if( e == cc.KEY.left ){
            this.Player.switchStatus( "left" );
        }
        else if( e == cc.KEY.right ){
            this.Player.switchStatus( "right" );
        }
        else if( e == cc.KEY.space ){
            this.Player.switchStatus( "spacebar" );
        }
    },

    endGame: function(){
        this.Player.stop();
        this.Player.unscheduleUpdate();
        this.Monster.unscheduleUpdate();
        this.unscheduleUpdate();
    },

    ballDisappear: function(){
        this.removeChild( this.ball );
        this.score++;
        this.scoreLabel.setString( this.score );
        console.log("pass ball");
    },

    


});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

