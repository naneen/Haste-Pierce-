
var Background = cc.Sprite.extend({

	ctor: function(){

		this._super();
		this.initWithFile( 'images/bg5.png' );
		this.setAnchorPoint( cc.p( 0.5, 0.5 ));
	}

})