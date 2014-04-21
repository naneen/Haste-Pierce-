var Monster = cc.Sprite.extend({

	ctor: function( floor, player ){

		this._super();
		this.images = [ 'images/monster1.png', 'images/monster2.png', 'images/monster3.png' ]; 
		this.initImage();

		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.floor = floor;
		this.player = player;
		this.gravity = 5;
		this.randomSide = Math.round( Math.random() );
		this.velocity = Math.random() + 1.7;
		this.started = this.player.started;

		this.movingAction = this.createAnimationAction1();

	},

	initImage: function(){
		// var pic = Math.round( Math.random() * 2 );
		// this.initWithFile( this.images[ pic ] );
		this.initWithFile( 'images/monster_4.png' );
	},

	update: function( dt ){
		var position = this.getPosition();

		//checkOn floor
		if( !this.floor.checkOn( this.getBoundingBoxToWorld() ) ){
			this.setPosition(cc.p(position.x,position.y - this.gravity));
		}
		
		//move
		else{
			if( this.randomSide == 0){
				this.setFlippedX( true );
				this.setPosition( cc.p( position.x - this.velocity, position.y ));
			}
			else {
				this.setPosition( cc.p( position.x + this.velocity, position.y ));
			}
		}

		//checkHitPlayer
		if( this.checkPlayerHit() ){
			console.log("hit");
			this.player.isAlive = false;
		}

		//checkPlayerisAlive?
		if( !this.player.isAlive ){
			this.unscheduleUpdate();
		}

		//loop
		if( position.x <= 0 ){
			this.setPosition( cc.p( 780, position.y ));
		}
		else if( position.x >= 800 ){
			this.setPosition( cc.p( 10, position.y ) );
		}

		//run animation
		if( !this.started ){
			this.started = true;
        	this.runAction( this.movingAction );
		}
	},

	checkPlayerHit: function(){
		var playerBox = this.player.getBoundingBoxToWorld();
		var thisBox = this.getBoundingBoxToWorld();
		
		if(cc.rectOverlapsRect( playerBox, thisBox ))return true;
		return false;
	},

	createAnimationAction1: function() {
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( 'images/monster1_1.png' );
        animation.addSpriteFrameWithFile( 'images/monster1_2.png' );
        animation.addSpriteFrameWithFile( 'images/monster1_3.png' );
        animation.addSpriteFrameWithFile( 'images/monster1_4.png' );
        animation.addSpriteFrameWithFile( 'images/monster1_5.png' );
        console.log( animation.getDelayPerUnit() );
        animation.setDelayPerUnit( 0.1 );
        return cc.RepeatForever.create( cc.Animate.create( animation ));
    }

});