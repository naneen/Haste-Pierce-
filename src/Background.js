
var Background = cc.Sprite.extend({

	ctor: function(name){

		this._super();
		this.initWithFile( 'res/images/' + name + '.png' );
		this.setAnchorPoint( cc.p( 0.5, 0.5 ));
	}

})