var Floor = cc.Sprite.extend({
    
    ctor: function() {

        this._super();
        this.WIDTH = 28;
        this.HEIGHT = 3;
        this.blogPosition = [];

        this.map();

        
    },

    map: function(){
        this.MAP = [
            '############################',
            '#########...################',
            '############################'
            // '###.....####################',
            // '############################'
            // '############################',
            // '############################',
            // '############################',
            // '############################',
            // '############################',
            // '############################',
            // '############################',
            // '############################'
        ];

        for( var h = 0; h < this.HEIGHT; h++ ){
            for( var w = 0; w < this.WIDTH; w++ ){
                if( this.MAP[h][w] == '#' ){
                    var box = new Box( h, w );
                    box.setPosition( new cc.p( w * 30, (this.HEIGHT - h) * 200 ) );

                    this.blogPosition.push( box );
                    this.addChild( box );
                }
            }
        }
    },

    // checkOn: function( x, y ){

    //     for( var i = 0; i < this.blogPosition.length; i++ ){

    //         if( this.blogPosition[i].getPosition()[0] + 10 >= x && this.blogPosition[i].getPosition()[0] - 20 <= x
    //             && this.blogPosition[i].getPosition()[1] + 25 >= y && this.blogPosition[i].getPosition()[1] - 5 <= y){
    //             return true;
    //         }

    //     }
    //     return false;
    // },
    checkOn: function( bb ){

        // var hover = 10;

        for( var i = 0; i < this.blogPosition.length; i++ ){

            var item = this.blogPosition[i];
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

















