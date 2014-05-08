
var DescriptionLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	},

	init: function( level ){
		this._super();
        this.setMouseEnabled( true );
        this.level = level;

        var director = cc.Director.getInstance();
        var winsize = director.getWinSize();
        var center = cc.p( 600, 300 );
       
        var bg = cc.Sprite.create( 'res/images/description.png' );
        bg.setPosition( center );
        this.addChild( bg );

        this.next = cc.Sprite.create( 'res/images/playButton2.png');
        this.next.setPosition( cc.p( 920, 120 ) );
        // this.next.setOpacity( 125 );
        this.addChild( this.next );
	},

    onMouseMoved: function( event ){
        var loc = event.getLocation();
        var nextBut = this.next.getBoundingBoxToWorld();

        if(cc.rectContainsPoint( nextBut, loc ) ){
            this.next.initWithFile('res/images/playButton1.png');
            // this.next.setOpacity( 200 );

        }else{
            this.next.initWithFile('res/images/playButton2.png');
            // this.next.setOpacity( 200 );
        }
    },

    onMouseDown: function(event){
        var loc = event.getLocation();
        var nextBut = this.next.getBoundingBoxToWorld();
        
        if( cc.rectContainsPoint( nextBut, loc ) ){
	        this.onPlay();
        }
    },

    onPlay: function() {
        var director = cc.Director.getInstance();
        director.replaceScene( cc.TransitionFade.create( 1.5, new StartScene( this.level )));
    }
});

var DescriptionScene = cc.Scene.extend({
	
	ctor: function( level ){
        this._super();
        this.level = level;
    },

    onEnter: function() {
        this._super();
        var layer = new DescriptionLayer();
        layer.init( this.level );
        this.addChild( layer );
    }
});