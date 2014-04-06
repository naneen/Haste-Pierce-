
var Monster = cc.Sprite.extend({

	ctor: function(floor){

		this._super();
		this.initWithFile( 'images/monster1.png' );
		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.floor = floor;
		this.gravity = 5;
		this.randomSide = Math.round(Math.random());
		this.velocity = Math.random() + 3.7;
	},

	update: function( dt ){

		var position = this.getPosition();

		if(!this.floor.checkOn( this.getBoundingBoxToWorld() )){
			this.setPosition( cc.p( position.x, position.y - this.gravity ));
		}
		else if( this.randomSide == 0){
			this.setPosition( cc.p( position.x - this.velocity, position.y ));
		}
		else {
			this.setPosition( cc.p( position.x + this.velocity, position.y ));
		}


		if( position.x <= 0 ){
			this.setPosition( cc.p( 780, position.y ));
		}
		else if( position.x >= 800 ){
			this.setPosition( cc.p( 10, position.y));
		}
	}

});