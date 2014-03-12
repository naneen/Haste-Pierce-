var Floor = cc.Node.extend({
    
    ctor: function() {

        this._super();
        this.WIDTH = 27;
        this.HEIGHT = 10;

        this.blogPosition = [];

        this.setAnchorPoint( cc.p( 0, 0 ) );
        
        this.MAP = [
            '###########################',
            '###########################',
            '###########################',
            '###########################',
            '###########################',
            '###########################',
            '###########################',
            '###########################',
            '###########################',
            '###########################',
            '###########################',
            '###########################',
            '###########################'
        ];

        for ( var r = 0; r < this.HEIGHT; r++ ) {
            for ( var c = 0; c < this.WIDTH; c++ ) {
                if ( this.MAP[ r ][ c ] == '#' && c%3==0) {
                    var s = cc.Sprite.create( 'images/box1.png' );
                    s.setAnchorPoint( cc.p( 0.5, 1 ) );
                    s.setPosition( cc.p( c * 30 , (this.HEIGHT - r - 1) * 200) );
                    this.addChild( s );
                }
                else if ( this.MAP[ r ][ c ] == '#' && c%2==0) {
                    var s = cc.Sprite.create( 'images/box2.png' );
                    s.setAnchorPoint( cc.p( 0.5, 1 ) );
                    s.setPosition( cc.p( c * 30 , (this.HEIGHT - r - 1) * 200) );
                    this.addChild( s );
                }
                else if ( this.MAP[ r ][ c ] == '#') {
                    var s = cc.Sprite.create( 'images/box3.png' );
                    s.setAnchorPoint( cc.p( 0.5, 1 ) );
                    s.setPosition( cc.p( c * 30 , (this.HEIGHT - r - 1) * 200) );
                    this.addChild( s );
                }
                this.blogPosition.push([ c*30,  (this.HEIGHT - r - 1) * 200]);
            }
        }
        for(var i = 0;i<this.blogPosition.length;i++) console.log(this.blogPosition[i][0]+ " " + this.blogPosition[i][1]);
    },

    checkOn: function( x, y ){
        for( var i = 0; i < this.blogPosition.length; i++ ){
            if( this.blogPosition[i][0] + 20 >= x && this.blogPosition[i][0] - 20 <= x
                && this.blogPosition[i][1] - 5 >= y && this.blogPosition[i][1] - 10 <= y ){
                return true;
            }
        }
        return false;
    }
});

















