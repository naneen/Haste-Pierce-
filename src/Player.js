
var Player = cc.Sprite.extend({

	ctor: function(floor){

		this._super();
		this.initWithFile( 'images/mainChar.png' );
		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.gravity = 5;
		this.floor = null;
		this.status = Player.STATUS.BREAK;
		this.key = Player.KEY.RIGHT;
		this.velocity = 5;
		//this.movingAction = this.createAnimationAction();
	},

	update: function( dt ){

		var position = this.getPosition();

		if( this.floor != null ){
			if(!this.floor.checkOn( this.getBoundingBoxToWorld() )){
				this.setPosition( cc.p( position.x, position.y - this.gravity ));
				this.floor.moveFloor();
			}

			else{
				this.endSide( position ); //วน
				this.walk( position ); //เดิน
			}
		}
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
		if( this.status == Player.STATUS.START){
			if( this.key == Player.KEY.LEFT){
				this.setPosition( cc.p( position.x - this.velocity, position.y ));
			}
			else if( this.key == Player.KEY.RIGHT){
				this.setPosition( cc.p( position.x + this.velocity, position.y ));
			}
		}
	},

	stop: function(){
		this.status = Player.STATUS.STOP;
		this.stopAction( this.movingAction );
	},

	checkDie: function( monster ){
		var thisPos = this.getPosition();
		var monPos = monster.getPosition();

		return ( Math.abs( thisPos.x - monPos.x ) <= 25 && Math.abs( thisPos.y - monPos.y ) <= 10 );
	},

	checkCollect: function( ball ){
		var ballPosition = ball.getBoundingBoxToWorld();
		var playerPosition = this.getBoundingBoxToWorld();

		// if( ball.isAlive ){
		// 	if( this.key == Player.KEY.LEFT && cc.rectOverlapsRect( playerPosition, ballPosition ) ){
		// 		ball.isAlive = false;
		// 		return true;
		// 	}
		
		// 	else if( this.key == Player.KEY.RIGHT && cc.rectOverlapsRect( playerPosition, ballPosition ) ){
		// 		ball.isAlive = false;
		// 		return true;
		// 	}
		// }
		// return false;

		if(ball.isAlive && cc.rectOverlapsRect( playerPosition, ballPosition )){
			if(this.key == Player.KEY.LEFT || this.key == Player.KEY.RIGHT){
				ball.isAlive = false;
				return true;
			}
		}
		return false;
	},

	switchDirection: function( direction ){
		// if( direction == "left" ){
		// 	this.key = Player.KEY.LEFT;
		// }
		// else if( direction == "right" ){
		// 	this.key = Player.KEY.RIGHT;
		// }
		// else if( direction == "spacebar" ){
		// 	this.key = Player.KEY.SPACE;
		// }

		this.key = direction;
	}

});

Player.KEY = {
	LEFT: 37,
	RIGHT: 39,
	SPACE: 32
};

Player.STATUS = {
	START: 1,
	STOP: 2,
	BREAK: 3
};











