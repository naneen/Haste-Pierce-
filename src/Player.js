
var Player = cc.Sprite.extend({

	ctor: function(floor){

		this._super();
		this.initWithFile( 'images/mainChar.png' );
		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.gravity = 5;
		this.floor = floor;

		this.status = 0;
	},

	update: function(dt){

		var position = this.getPosition();

		if(!this.floor.checkOn( position.x, position.y - this.gravity )){
			this.setPosition( cc.p( position.x, position.y - this.gravity ));
		}

		//วน
		if( position.x >= 800 ){
			this.setPosition( cc.p( 10, position.y ));
		}
		else if( position.x <= 0 ){
			this.setPosition( cc.p( 790, position.y ));
		}


		// status
		if( this.status == 1 ){
			this.setPosition( cc.p( position.x - 5, position.y ));
		}
		else if( this.status == 2 ){
			this.setPosition( cc.p( position.x + 5, position.y ));
		}
	}

});