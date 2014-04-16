var GameLayer = cc.LayerColor.extend({
    init: function() {

        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.score = 0;
        this.scheduleUpdate();
        
        this.initPlayer();
        this.initMonster();
        this.initBall();
        this.initFloor();

        this.initScore();
        this.initBackgound();

        this.setKeyboardEnabled( true );
        

        return true;
    },

    update: function(){
        if( this.Player.checkDie( this.Monster ) ){
            console.log("die");
            this.endGame();
        }

        // if( this.Player.checkCollect( this.Ball ) ){
        //     this.ballDisappear();
        // }

    },

    initFloor: function(){
        var MAP1 = [
            '############################',
            '########....################',
            '################....########',
            '####....####################',
            '############################'
        ];

        // var MAP2 = [
        //     '###########.################',
        //     '##########..################',
        //     '#########...################',
        //     '########....################',
        //     '############################'
        // ];

        this.Floor = new Floor( MAP1, this.Player, this.Monster, this.Ball );
        this.Floor.setPosition( cc.p( 0, -100 ) );
        this.addChild( this.Floor, 1 );
        this.Floor.scheduleUpdate();

        // this.Floor2 = new Floor( MAP2, this.Player, this.Monster );

        this.Monster.floor = this.Floor;
        this.Player.floor = this.Floor;
        this.Ball.floor = this.Floor;
    },

    initMonster: function(){
        this.Monster = new Monster();
        // var choicePos = [ -80, 900 ];
        // var pos = Math.round( Math.random() );
        // this.Monster.setPosition( cc.p( choicePos[ pos ], 350 ));
        this.addChild( this.Monster, 1);
        this.Monster.scheduleUpdate();
    },

    initBall: function(){
        this.Ball = new Ball( this.Floor );
        // this.Ball.setPosition( cc.p( Math.round(( Math.random()+0.1 )*500 ), 350 ));
        // console.log("ball -> x:"+this.Ball.getPosition().x + " y:" +this.Ball.getPosition().y);
        this.addChild( this.Ball, 1 );
        this.Ball.scheduleUpdate();
    },

    initPlayer: function(){
        this.Player = new Player( this.Floor );
        this.Player.setPosition( cc.p( 400, 350 ));
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
        this.Player.status = Player.STATUS.START;
        // if( e == cc.KEY.left ){
        //     this.Player.switchStatus( "left" );
        // }
        // else if( e == cc.KEY.right ){
        //     this.Player.switchStatus( "right" );
        // }
        // else if( e == cc.KEY.space ){
        //     this.Player.switchStatus( "spacebar" );
        // }
        this.Player.switchDirection(e);
    },

    // onKeyUp: function(e){
    //     this.Player.status = Player.STATUS.BREAK;
    // },

    endGame: function(){
        this.Player.stop();
        this.Monster.stop();
        this.Player.unscheduleUpdate();
        this.Monster.unscheduleUpdate();
        this.unscheduleUpdate();
    },

    ballDisappear: function(){
        this.removeChild( this.Ball );
        this.score++;
        this.scoreLabel.setString( this.score );
        console.log("pass ball");
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

