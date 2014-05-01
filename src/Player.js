var Player = cc.Sprite.extend({

	ctor: function(floor){

		this._super();
		this.images = [ 'res/images/player1_1.png', 'res/images/player2_1.png', 'res/images/player3_1.png' ];
		this.initImage();

		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.gravity = 5;
		this.floor = floor;
		this.v = 0;
		this.isAlive = true;
		this.started = false;

		this.movingAction = this.createAnimationAction1();
	},

	createAnimationAction1: function() {
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( 'res/images/player1_1.png' );
        animation.addSpriteFrameWithFile( 'res/images/Player1_2.png' );
        animation.addSpriteFrameWithFile( 'res/images/Player1_3.png' );
        animation.addSpriteFrameWithFile( 'res/images/Player1_4.png' );
        animation.addSpriteFrameWithFile( 'res/images/Player1_5.png' );
        animation.addSpriteFrameWithFile( 'res/images/Player1_6.png' );
        animation.addSpriteFrameWithFile( 'res/images/Player1_7.png' );
        animation.addSpriteFrameWithFile( 'res/images/Player1_8.png' );
        animation.addSpriteFrameWithFile( 'res/images/Player1_9.png' );
        console.log( animation.getDelayPerUnit() );
        animation.setDelayPerUnit( 0.1 );
        return cc.RepeatForever.create( cc.Animate.create( animation ));
    },

    // start: function() {
    //     this.started = true;
    //     this.runAction( this.movingAction );
    // },

	initImage: function(){
		// var pic = this.images[ Math.round( Math.random() * 2 ) ];
		// this.initWithFile( pic );
		this.initWithFile( 'res/images/player1_1.png' );
	},

	update: function( dt ){
		var position = this.getPosition();
		
		//checkOn floor
		if( !this.floor.checkOn( this.getBoundingBoxToWorld() ) ){
			this.setPosition( cc.p( position.x, position.y - this.gravity ) );
			this.floor.setPosition( cc.p( this.floor.getPosition().x, this.floor.getPosition().y + 5 ) );
		}
		else{
			// console.log("in");
			this.setPosition( cc.p( position.x + this.v, position.y + this.floor.v ) );
		}

		//out of screen
		if( position.x < 0 ) {
			this.setPosition( cc.p( 1170, position.y ) );
			this.v = -5;
		}
		if( position.x > 1170 ){
			this.setPosition( cc.p( 20, position.y ) );
			this.v = 5;
		}

		//check died
		if( !this.isAlive || position.y > 600 || position.y < -100) {
			this.floor.playerDie = true;
			this.unscheduleUpdate();
		}

	},

	destoryBox: function(){
		var pos = this.getBoundingBoxToWorld();
		this.floor.destoryBox( pos.x, pos.y );
	},

	walk: function( e ){
		if( e == 37 ){
			this.v = -5;
			this.setFlippedX( true );
		}
		if( e == 39 ){
			this.v = 5;
			this.setFlippedX( false );
		}
	}
});