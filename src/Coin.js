
var Coin = cc.Sprite.extend({

	ctor: function( floor, player ){

		this._super();
		this.initImage();

		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.floor = floor;
		this.player = player;
		this.gravity = 5;
		this.randomSide = Math.round( Math.random() );
		this.started = this.player.started;

		this.movingAction = this.createAnimationAction1();

	},

	initImage: function(){
		this.initWithFile( 'images/coin1_1.png' );
	},

	update: function( dt ){
		var position = this.getPosition();

		//run animation
		if( !this.started ){
			this.started = true;
        	this.runAction( this.movingAction );
		}
		
		//checkOn floor
		if( !this.floor.checkOn( this.getBoundingBoxToWorld() ) ){
			this.setPosition(cc.p(position.x,position.y - this.gravity));
		}

		//checkHitPlayer
		if( this.checkPlayerHit() ){
			console.log("hit");
			this.removeFromParent( true );
			// this.player.isAlive = false;
		}

		//checkPlayerisAlive?
		// if( !this.player.isAlive ){
		// 	this.unscheduleUpdate();
		// }

		//loop
		if( position.x <= 0 ){
			this.setPosition( cc.p( 1180, position.y ));
		}
		else if( position.x >= 1180 ){
			this.setPosition( cc.p( 10, position.y ) );
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
        animation.addSpriteFrameWithFile( 'images/coin1_1.png' );
        animation.addSpriteFrameWithFile( 'images/coin1_2.png' );
        animation.addSpriteFrameWithFile( 'images/coin1_3.png' );
        animation.addSpriteFrameWithFile( 'images/coin1_4.png' );
        animation.addSpriteFrameWithFile( 'images/coin1_5.png' );
        animation.addSpriteFrameWithFile( 'images/coin1_6.png' );
        console.log( animation.getDelayPerUnit() );
        animation.setDelayPerUnit( 0.1 );
        return cc.RepeatForever.create( cc.Animate.create( animation ));
    }

});