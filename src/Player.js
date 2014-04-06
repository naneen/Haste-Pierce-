
var Player = cc.Sprite.extend({

	ctor: function(floor){

		this._super();
		this.initWithFile( 'images/mainChar.png' );
		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.gravity = 5;
		this.floor = floor;
		this.started = true;
		this.status = Player.STATUS.RIGHT;
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
		// if( this.status == 3 ){
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
		if( this.status == Player.STATUS.LEFT && this.started == true ){
			this.setPosition( cc.p( position.x - 5, position.y ));
		}
		else if( this.status == Player.STATUS.RIGHT && this.started == true ){
			this.setPosition( cc.p( position.x + 5, position.y ));
		}
	},

	stop: function(){
		this.started = false;
		this.stopAction( this.movingAction );
	},

	checkDie: function( monster ){
		var thisPos = this.getPosition();
		var monPos = monster.getPosition();

		return ( Math.abs( thisPos.x - monPos.x ) <= 25 && Math.abs( thisPos.y - monPos.y ) <= 5 );
	},

	checkCollect: function( ballPosition ){

		var playerPosition = this.getBoundingBoxToWorld();

		if( this.status == Player.STATUS.LEFT && cc.rectGetMaxX( ballPosition ) == cc.rectGetMinX( playerPosition ) 
			&& cc.rectGetMinY( ballPosition ) == cc.rectGetMinY( playerPosition ) ){ //left
			return true;
		}
		
		else if( this.status == Player.STATUS.RIGHT && cc.rectGetMinX( ballPosition ) == cc.rectGetMaxX( playerPosition ) 
			&& cc.rectGetMinY( ballPosition ) == cc.rectGetMinY( playerPosition ) ){ //right
			return true;
		}
		return false;
	},

	switchStatus: function( direction ){
		if( direction == "left" ){
			this.status = Player.STATUS.LEFT;
		}
		else if( direction == "right" ){
			this.status = Player.STATUS.RIGHT;
		}
		else if( direction == "spacebar" ){
			this.status = Player.STATUS.SPACE;
		}
	}

});

Player.STATUS = {
	LEFT: 1,
	RIGHT: 2,
	SPACE: 3
};












