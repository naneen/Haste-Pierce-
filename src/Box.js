
var Box = cc.Sprite.extend({

    ctor: function( h, w ,line){

        this._super();
        this.height = h;
        this.width = w;
        this.line = line;
        this.isShow = true;
        var num = h + w;

        if( num % 3 == 0 ){
            this.initWithFile( 'images/box1.png' );
        }
        else if( num % 2 == 0 ){
            this.initWithFile( 'images/box2.png' );
        }
        else{
            this.initWithFile( 'images/box3.png' );
        }
        this.setAnchorPoint( cc.p( 0.5, 1 ) );
    }

});