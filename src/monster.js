var Monster = cc.Sprite.extend({

	ctor: function( floor, player ){

		this._super();
		this.images = [ 'res/images/monster1.png', 'res/images/monster2.png', 'res/images/monster3.png' ]; 
		this.initImage();

		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.floor = floor;
		this.player = player;
		this.gravity = 5;
		this.randomSide = Math.round( Math.random() );
		this.velocity = Math.random() + 1.7;
		this.started = false;
		this.hittable = true;

		this.movingAction = this.createAnimationAction1();

	},

	initImage: function(){
		// var pic = Math.round( Math.random() * 2 );
		// this.initWithFile( this.images[ pic ] );
		this.initWithFile( 'res/images/monster2_1.png' );
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
		
		//move
		else{
			if( this.randomSide == 0){
				this.setFlippedX( true );
				this.velocity = -( Math.random() + 1.7 );
			}
			else {
				this.velocity = Math.random() + 1.7;
			}
			this.setPosition( cc.p( position.x + this.velocity, position.y ));
		}

		//checkHitPlayer
		if( this.checkPlayerHit() && this.hittable ){
			this.floor.life -= 1;
			this.hittable = false;
			this.floor.effectDie = true;
			this.scheduleOnce( this.setHittable, 2 );
			
			if( this.floor.life <= 0 ){
                this.unscheduleUpdate();
                this.floor.playerDie = true;
            }
		}

		//remove
		if ( this.getBoundingBoxToWorld().y > 900 ){
			this.removeFromParent( true );
		}

		//loop
		if( position.x <= 10 ){
			this.setPosition( cc.p( 1150, position.y ));
		}
		else if( position.x >= 1150 ){
			this.setPosition( cc.p( 10, position.y ) );
		}

	},

	checkPlayerHit: function(){
		var playerBox = this.player.getBoundingBoxToWorld();
		var thisBox = this.getBoundingBoxToWorld();
		
		if(cc.rectOverlapsRect( playerBox, thisBox )){
			return true;
		}
		return false;
	},

	setHittable: function() {
		this.hittable = true;
	},

	createAnimationAction1: function() {
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( 'res/images/monster2_1.png' );
        animation.addSpriteFrameWithFile( 'res/images/monster2_2.png' );
        animation.addSpriteFrameWithFile( 'res/images/monster2_3.png' );
        animation.addSpriteFrameWithFile( 'res/images/monster2_4.png' );
        animation.addSpriteFrameWithFile( 'res/images/monster2_5.png' );
        animation.addSpriteFrameWithFile( 'res/images/monster2_6.png' );
        
        animation.setDelayPerUnit( 0.07 );
        return cc.RepeatForever.create( cc.Animate.create( animation ));
    }

});