
var Box = cc.Sprite.extend({

	ctor: function( num ){

		this._super();

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
	},

	getPosition: function(){
		var pos = this.getBoundingBoxToWorld();
		return [ pos.x, pos.y ];
	}

});