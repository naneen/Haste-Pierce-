var Floor = cc.Node.extend({
    
    ctor: function( map, player, monster, ball ) {

        this._super();
        this.WIDTH = 28;
        this.HEIGHT = 5;
        this.boxPosition = [];

        this.MAP = map;
        this.player = player;
        this.monster = monster;
        this.ball = ball;

        this.addMap();
        this.status = Floor.STATUS.IN;
        this.gravity = 10;
    },

    addLine: function(){

    },

    moveFloor: function(){
        var floorPos = this.getPosition();
        var monsterPos = this.monster.getPosition();
        var ballPos = this.ball.getPosition();

        if( this.status = Floor.STATUS.IN ){
                this.setPosition( cc.p( floorPos.x, floorPos.y + this.gravity ) );
                this.monster.setPosition( cc.p( monsterPos.x, monsterPos.y + this.gravity ));
                this.ball.setPosition( cc.p( ballPos.x, ballPos.y + this.gravity ) );
        }
    },

    // addMap: function(){

    //     for( var h = 0; h < this.HEIGHT; h++ ){
    //         for( var w = 0; w < this.WIDTH; w++ ){
    //             if( this.MAP[h][w] == '#' ){
    //                 var box = new Box( h, w );
    //                 box.setPosition( new cc.p( w * 30, (this.HEIGHT - h) * 200 ) );

    //                 this.boxPosition.push( box );
    //                 this.addChild( box );
    //                 // gameLayer.initMonster( this.getBoundingBoxToWorld().x);
    //             }
    //         }
    //         var monster = new Monster();
    //         var choicePos = [ -80, 900 ];
    //         var pos = Math.round( Math.random() );
    //         this.monster.setPosition( cc.p( choicePos[ pos ], (this.HEIGHT - this.boxHigh) * 200 ) ));
    //         this.addChild( monster, 1 );
    //         console.log(" add monster ");
    //     }
    // },
    addMap: function(){
        var gameLayer = new GameLayer();
       
        for( var h = 0; h < this.HEIGHT; h++ ){
           
            for( var w = 0; w < this.WIDTH; w++ ){
                if( this.MAP[h][w] == '#' ){
                    var box = new Box( h, w );
                    box.setPosition( new cc.p( w * 30, (this.HEIGHT - h) * 200 ) );

                    this.boxPosition.push( box );
                    this.addChild( box );
                    gameLayer.initMonster( this.getBoundingBoxToWorld().x);
                }
            }
            var monster = new Monster( this );
            var choicePos = [ -80, 900 ];
            var pos = Math.round( Math.random() );
            monster.setPosition(cc.p(choicePos[ pos ] - 30,((this.HEIGHT - h) * 200) - 200 ));
            monster.floor = this;
            monster.scheduleUpdate();
            this.addChild(monster,1);

            var ball = new Ball( this );
            ball.setPosition( cc.p( Math.round(( Math.random()+0.1 )*500 ), ((this.HEIGHT - h) * 200) +100 ));
            this.addChild( ball, 1 );
            ball.floor = this;
            ball.scheduleUpdate();
        }
        // this.addChild( monster, 1 );
    },
    checkOn: function( bb ){

        for( var i = 0; i < this.boxPosition.length; i++ ){

            var box = this.boxPosition[i];
            var boxBb = box.getBoundingBoxToWorld();

            var isOnFloor = cc.rectOverlapsRect( bb, boxBb );

            if(isOnFloor){
                return true;
            }
        }
        return false;
    },

    clearBox: function( x, y ){

    }
});

Floor.STATUS = {
    IN: 1,
    OUT: 2
}

















