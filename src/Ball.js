
var Ball = cc.Sprite.extend({

	ctor: function( floor ){
		this._super();
		this.initWithFile( 'images/ball1.png' );
		this.setAnchorPoint( cc.p( 0.5, 0 ));
		this.floor = null;
		this.gravity = 5;
		this.isAlive = true;
	},

	update: function( dt ){

		var position = this.getPosition();

		if( this.floor != null ){
			if(!this.floor.checkOn( this.getBoundingBoxToWorld() )){
				this.setPosition( cc.p( position.x, position.y - this.gravity ));
			}
		}

	}

});
