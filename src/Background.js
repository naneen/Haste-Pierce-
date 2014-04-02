
var Background = cc.Sprite.extend({

	ctor: function(){

		this._super();
		this.initWithFile( 'images/kite.png' );
		this.setAnchorPoint( cc.p( 0.5, 0.5 ));
	}

})