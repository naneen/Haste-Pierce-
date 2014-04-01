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

        /*
        for(var h = 0; h < this.HEIGHT; h++){
            for(var w = 0; w < this.WIDTH; w++){
            
                if(  this.MAP[h][w] == '#' && (h+w) % 3 == 0 ){
                    this.box = cc.Sprite.create( 'images/box1.png' );
                }
                else if( this.MAP[h][w] == '#' && (h+w) % 2 == 0 ){
                    this.box = cc.Sprite.create( 'images/box2.png' );
                }
                else if( this.MAP[h][w] == '#' ){
                    this.box = cc.Sprite.create( 'images/box3.png' );
                }
                this.box.setAnchorPoint( new cc.p( 0, 1 ) );
                this.box.setPosition( new cc.p( w * 30, 200 ) );

                this.blogPosition.push( [ this.box.getPosition().x, this.box.getPosition().y ]);
                this.addChild( this.box );
            }
        }
        */

        for(var h = 0; h < this.HEIGHT; h++){
            for(var w = 0; w < this.WIDTH; w++){
            
                if(  this.MAP[h][w] == '#' ){
                    this.box = cc.Sprite.create( 'images/box1.png' );
                }
                // else if( this.MAP[h][w] == '#' && (h+w) % 2 == 0 ){
                //     this.box = cc.Sprite.create( 'images/box2.png' );
                // }
                //else if( this.MAP[h][w] == '#' ){
                //    this.box = cc.Sprite.create( 'images/box3.png' );
                //}
                this.box.setAnchorPoint( new cc.p( 0, 1 ) );
                this.box.setPosition( new cc.p( w * 30, (this.HEIGHT - h) * 200 ) );

                this.blogPosition.push( [ this.box.getPosition().x, this.box.getPosition().y ]);
                this.addChild( this.box );
            }
        }


        
        
        // for(var i = 0;i<this.blogPosition.length;i++) console.log(this.blogPosition[i][0]+ " " + this.blogPosition[i][1]);
    },

    checkOn: function( x, y ){
        for( var i = 0; i < this.blogPosition.length; i++ ){
            console.log( y+"  "+this.blogPosition[i][1]);
            if( this.blogPosition[i][1] <= y ){
                return true;   
            }
        }
        return false;
    },

    update: function( dt ){

    }
});

















