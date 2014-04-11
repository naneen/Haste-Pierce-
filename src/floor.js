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
        this.gravity = 5;
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
        }
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

















