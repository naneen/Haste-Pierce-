
var Player = cc.Sprite.extend({

	ctor: function(floor){

		this._super();
		this.initWithFile( 'images/mainChar.png' );
		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.gravity = 5;
		this.floor = floor;
		this.status = Player.STATUS.START;
		this.key = Player.KEY.RIGHT;
		//this.movingAction = this.createAnimationAction();
	},

	update: function( dt ){

		var position = this.getPosition();

		if(!this.floor.checkOn( this.getBoundingBoxToWorld() )){
			this.setPosition( cc.p( position.x, position.y - this.gravity ));
		}

		else{
			this.endSide( position ); //วน
			this.walk( position ); //เดิน
		}
		// spacebar
		// if( this.key == 3 ){
		// 	this.floor.clearBox( position.x, position.y );
		// }
	},

	endSide: function( position ){
		if( position.x >= 800 ){
			this.setPosition( cc.p( 10, position.y ));
		}
		else if( position.x <= 0 ){
			this.setPosition( cc.p( 790, position.y ));
		}
	},

	walk: function( position ){
		if( this.key == Player.KEY.LEFT && this.status == Player.STATUS.START ){
			this.setPosition( cc.p( position.x - 5, position.y ));
		}
		else if( this.key == Player.KEY.RIGHT && this.status == Player.STATUS.START ){
			this.setPosition( cc.p( position.x + 5, position.y ));
		}
	},

	// stopWalk: function(){
	// 	this.status = Player.STATUS.BREAK;
	// 	this.stopAction( this.movingAction );
	// },

	stop: function(){
		this.status = Player.STATUS.STOP;
		this.stopAction( this.movingAction );
	},

	checkDie: function( monster ){
		var thisPos = this.getPosition();
		var monPos = monster.getPosition();

		return ( Math.abs( thisPos.x - monPos.x ) <= 25 && Math.abs( thisPos.y - monPos.y ) <= 5 );
	},

	checkCollect: function( ball ){
		var ballPosition = ball.getBoundingBoxToWorld();
		var playerPosition = this.getBoundingBoxToWorld();

		if( ball.isAlive ){
			if(this.key == Player.KEY.LEFT && cc.rectOverlapsRect(playerPosition,ballPosition)){
				ball.isAlive = false;
				return true;
			}
		
			else if(this.key == Player.KEY.RIGHT && cc.rectOverlapsRect(playerPosition,ballPosition)){
				
				ball.isAlive = false;
				return true;
			}
		}
		return false;
	},

	switchStatus: function( direction ){
		if( direction == "left" ){
			this.key = Player.KEY.LEFT;
		}
		else if( direction == "right" ){
			this.key = Player.KEY.RIGHT;
		}
		else if( direction == "spacebar" ){
			this.key = Player.KEY.SPACE;
		}
	}

});

Player.KEY = {
	LEFT: 1,
	RIGHT: 2,
	SPACE: 3
};

Player.STATUS = {
	START: 1,
	STOP: 2,
	BREAK: 3
};











