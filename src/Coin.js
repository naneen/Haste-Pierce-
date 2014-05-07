
var Coin = cc.Sprite.extend({

	ctor: function( floor, player ){

		this._super();
		this.initImage();

		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.floor = floor;
		this.player = player;
		this.gravity = 5;
		this.randomSide = Math.round( Math.random() );
		this.started = false;

		this.movingAction = this.createAnimationAction1();

	},

	initImage: function(){
		this.initWithFile( 'res/images/coin1_1.png' );
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
			console.log("coin hit");
			this.floor.coinCollected = true;
			this.removeFromParent( true );
			// this.player.isAlive = false;
		}

		//check over border
		if( this.getBoundingBoxToWorld().y > 600 ){
			this.removeFromParent( true );
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
        animation.addSpriteFrameWithFile( 'res/images/coin1_1.png' );
        animation.addSpriteFrameWithFile( 'res/images/coin1_2.png' );
        animation.addSpriteFrameWithFile( 'res/images/coin1_3.png' );
        animation.addSpriteFrameWithFile( 'res/images/coin1_4.png' );
        animation.addSpriteFrameWithFile( 'res/images/coin1_5.png' );
        animation.addSpriteFrameWithFile( 'res/images/coin1_6.png' );
        animation.setDelayPerUnit( 0.1 );
        return cc.RepeatForever.create( cc.Animate.create( animation ));
    }

});