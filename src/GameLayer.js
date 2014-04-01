var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.Floor = new Floor();
        // this.Floor.setPosition( cc.p( 0, - 900 ) );
        this.Floor.setPosition( cc.p( 0, 000 ) );
        this.Floor.scheduleUpdate();

        this.addChild( this.Floor );

        this.Monster = new Monster( this.Floor );
        this.Monster.setPosition( cc.p( 700, 60+10+400 ));
        this.addChild( this.Monster );
        this.Monster.scheduleUpdate();

        this.Player = new Player( this.Floor );
        this.Player.setPosition( cc.p( 400, 60+10+400 ));
        this.addChild( this.Player );
        this.Player.scheduleUpdate();

        this.setKeyboardEnabled( true );

        return true;
    },

    onKeyDown: function(e){
        if( e == cc.KEY.left ){
            this.Player.status = 1;
        }
        else if( e == cc.KEY.right ){
            this.Player.status = 2;
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

