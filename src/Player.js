var Player = cc.Sprite.extend({

	ctor: function(floor){

		this._super();
		this.initWithFile( 'images/mainChar.png' );
		this.setAnchorPoint( cc.p( 0.5, 0 ) );
		this.gravity = 5;
		this.floor = floor;
		this.v = 0;
		this.isAlive = true;
	},
	update: function( dt ){
		var position = this.getPosition();
		
		//checkOn floor
		if(!this.floor.checkOn(this.getBoundingBoxToWorld())){
			this.setPosition(cc.p(position.x,position.y - this.gravity));
			this.floor.setPosition( cc.p( this.floor.getPosition().x, this.floor.getPosition().y + 3 ) );
		}
		else{
			// console.log("in");
			this.setPosition(cc.p(position.x+this.v,position.y+this.floor.v));
		}

		//out of screen
		if(position.x < 0) {
			this.setPosition(cc.p(770,position.y));
			this.v = -5;
		}
		if(position.x > 770){
			this.setPosition(cc.p(20,position.y));
			this.v = 5;
		}

		//check died
		if(!this.isAlive) this.unscheduleUpdate();

	},
	destoryBox: function(){
		var pos = this.getBoundingBoxToWorld();
		this.floor.destoryBox(pos.x,pos.y);
	},
	walk: function(e){
		if(e==37){
			this.v = -5;
			this.setFlippedX(true);
		}
		if(e==39){
			this.v = 5;
			this.setFlippedX(false);
		}
	}
});