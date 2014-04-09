
var Monster = cc.Sprite.extend({

	ctor: function(floor){

		this._super();
		this.images = [ 'images/monster1.png', 'images/monster2.png', 'images/monster3.png' ]; 
		this.initImage();
		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.floor = null;
		this.gravity = 5;
		this.randomSide = Math.round( Math.random() );
		this.velocity = Math.random() + 3.7;
		this.status = Monster.STATUS.START;
	},

	initImage: function( boxPosition ){
		var pic = Math.round( Math.random() * 2 );
		this.initWithFile( this.images[ pic ] );
	},

	stop: function(){
		this.status = Monster.STATUS.STOP;
		this.stopAction( this.movingAction );
	},

	update: function( dt ){

		var position = this.getPosition();
		if( this.floor != null ){
			if( !this.floor.checkOn( this.getBoundingBoxToWorld() )){
	            this.setPosition( cc.p( position.x, position.y - this.gravity ));
	        }
	        else if( this.status == Monster.STATUS.START ){
				if( this.randomSide == 0){
					this.setPosition( cc.p( position.x - this.velocity, position.y ));
				}
				else {
					this.setPosition( cc.p( position.x + this.velocity, position.y ));
				}
			}
	    }
		
		//วน
		if( position.x <= 0 ){
			this.setPosition( cc.p( 780, position.y ));
		}
		else if( position.x >= 800 ){
			this.setPosition( cc.p( 10, position.y));
		}
	}

});

Monster.STATUS = {
	START: 1,
	STOP: 2
};



