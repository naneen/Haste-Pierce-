var Floor = cc.Sprite.extend({
    
    ctor: function() {

        this._super();
        this.WIDTH = 28;
        this.HEIGHT = 3;
        this.blogPosition = [];

        this.MAP = [
            '###############...##########',
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

        for(var h = 0; h < this.HEIGHT; h++){
            for(var w = 0; w < this.WIDTH; w++){
                if( this.MAP[h][w] == '#' ){
                    var box = new Box(w);
                    box.setPosition( new cc.p( w * 30, (this.HEIGHT - h) * 200 ) );

                    this.blogPosition.push( box );
                    this.addChild( box );
                }
            }
        }
    },

    checkOn: function( x, y ){
        for( var i = 0; i < this.blogPosition.length; i++ ){

            if( this.blogPosition[i].getPosition()[0] + 10 >= x && this.blogPosition[i].getPosition()[0] - 20 <= x
                && this.blogPosition[i].getPosition()[1] + 25 >= y && this.blogPosition[i].getPosition()[1] - 5 <= y){
                return true;
            }

        }
        return false;
    },

    update: function( dt ){

    }
});

















