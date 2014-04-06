
var Ball = cc.Sprite.extend({

	ctor: function( floor ){
		this._super();
		this.initWithFile( 'images/ball1.png' );
		this.setAnchorPoint( cc.p( 0.5, 0 ));
		this.floor = floor;
		this.gravity = 5;
	},

	update: function( dt ){

		if(!this.floor.checkOn( this.getBoundingBoxToWorld() )){
			this.setPosition( cc.p( this.getPosition().x, this.getPosition().y - this.gravity ));
		}

	}

});
