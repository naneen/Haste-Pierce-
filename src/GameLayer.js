var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.Floor = new Floor();
        this.Floor.setPosition( cc.p( 0, -90 ) );
        // this.Floor.scheduleUpdate();
        this.addChild( this.Floor, 1 );

        this.Monster = new Monster( this.Floor );
        this.Monster.setPosition( cc.p( 700, 60+10+400 ));
        this.addChild( this.Monster, 1);
        this.Monster.scheduleUpdate();

        this.Ball = new Ball( this.Floor );
        this.Ball.setPosition( cc.p( 500, 60+10+400 ));
        this.addChild( this.Ball, 1 );
        this.Ball.scheduleUpdate();

        this.Player = new Player( this.Floor );
        this.Player.setPosition( cc.p( 400, 60+10+400 ));
        this.addChild( this.Player, 1);
        this.Player.scheduleUpdate();

        this.Background = new Background();
        this.Background.setPosition( cc.p( 400, 300) );
        this.addChild( this.Background );

        this.setKeyboardEnabled( true );
        this.scheduleUpdate();

        return true;
    },

    onKeyDown: function(e){
        if( e == cc.KEY.left ){
            this.Player.status = 1;
        }
        else if( e == cc.KEY.right ){
            this.Player.status = 2;
        }
        else if( e == cc.KEY.space ){
            this.Player.status = 3;
        }
    },

    endGame: function(){
        // this.Player.stop();
                console.log("endGame");
        this.Player.unscheduleUpdate();
        this.Monster.unscheduleUpdate();
    },

    update: function(){
        if( this.Player.checkDie( this.Monster ) ){
            this.endGame();
            console.log("update");

        }
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

