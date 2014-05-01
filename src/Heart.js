
var Heart = cc.Sprite.extend({

    ctor: function( floor ){

        this._super();

        this.floor = floor;
        this.heart = [ 'res/images/life_3.png', 'res/images/life_2.png', 'res/images/life_1.png', 'res/images/life_0.png' ];
        this.initWithFile( this.heart[0] );

        this.setAnchorPoint( cc.p( 0.5, 0.5 ) );
    },

    decrease: function( life ){
    	if( life == 2 ){
    		this.initWithFile( this.heart[1] );
    	}
    	else if( life == 1 ){
    		this.initWithFile( this.heart[2] );
    	}
    	else if( life == 0 ){
    		this.initWithFile( this.heart[3] );
    	}
    }
});