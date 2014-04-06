
var Player = cc.Sprite.extend({

	ctor: function(floor){

		this._super();
		this.initWithFile( 'images/mainChar.png' );
		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.gravity = 5;
		this.floor = floor;
		this.started = true;
		this.status = 0;
		//this.movingAction = this.createAnimationAction();
	},

	update: function( dt ){

		var position = this.getPosition();

		if(!this.floor.checkOn( this.getBoundingBoxToWorld() )){
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
		if( this.status == 1 && this.started == true ){
			this.setPosition( cc.p( position.x - 5, position.y ));
		}
		else if( this.status == 2 && this.started == true ){
			this.setPosition( cc.p( position.x + 5, position.y ));
		}
		
		// spacebar
		// if( this.status == 3 ){
		// 	this.floor.clearBox( position.x, position.y );
		// }
	},
	// movingAction: function(){

	// },

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

		// console.log("checkCollect")
		var playerPosition = this.getBoundingBoxToWorld();
		// console.log("max ball:"+cc.rectGetMaxX( ballPosition));
		// console.log("min player: "+cc.rectGetMinX( playerPosition ));
		if( this.status == 1 && cc.rectGetMaxX( ballPosition ) == cc.rectGetMinX( playerPosition ) ){ //left player
			// console.log("from left side");
			return true;
		}
		
		else if( this.status == 2 && cc.rectGetMinX( ballPosition ) == cc.rectGetMaxX( playerPosition ) ){ //right
			// console.log("from right side");
			return true;
		}
		return false;
	}

});












