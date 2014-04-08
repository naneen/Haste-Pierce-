var Floor = cc.Node.extend({
    
    ctor: function() {

        this._super();
        this.WIDTH = 28;
        this.HEIGHT = 5;
        this.boxPosition = [];

        this.map1();  
    },

    map1: function(){
        this.MAP1 = [
            '############################',
            '########....################',
            '################....########',
            '####....####################',
            '############################'
        ];

        for( var h = 0; h < this.HEIGHT; h++ ){
            for( var w = 0; w < this.WIDTH; w++ ){
                if( this.MAP1[h][w] == '#' ){
                    var box = new Box( h, w );
                    box.setPosition( new cc.p( w * 30, (this.HEIGHT - h) * 200 ) );

                    this.boxPosition.push( box );
                    this.addChild( box );
                }
            }
        }
    },

    checkOn: function( bb ){

        for( var i = 0; i < this.boxPosition.length; i++ ){

            var item = this.boxPosition[i];
            var itemBb = item.getBoundingBoxToWorld();

            var isOnFloor = cc.rectGetMaxY(itemBb) == cc.rectGetMinY(bb) &&
                cc.rectGetMinX(itemBb) < cc.rectGetMaxX(bb) &&
                cc.rectGetMaxX(itemBb) > cc.rectGetMinX(bb);

            if(isOnFloor){
                return true;
            }
        }
        return false;
    },

    clearBox: function( x, y ){

    }
});

















