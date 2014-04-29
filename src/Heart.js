
var Heart = cc.Sprite.extend({

    ctor: function(){

        this._super();
        this.initWithFile( 'res/images/life_3.png' );
        this.setAnchorPoint( cc.p( 0.5, 0.5 ) );
    }

});