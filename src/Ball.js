
var Ball = cc.Sprite.extend({

	ctor: function( floor ){
		this._super();
		this.initWithFile( 'images/ball1.png' );
		this.setAnchorPoint( cc.p( 0.5, 0 ));
		this.floor = floor;
		this.gravity = 5;
	},

	update: function( dt ){

		var position = this.getPosition();

		if(!this.floor.checkOn( position.x, position.y - this.gravity )){
			this.setPosition( cc.p( position.x, position.y - this.gravity ));
		}
	}

});