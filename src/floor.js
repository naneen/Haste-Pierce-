var Floor = cc.Node.extend({

    ctor: function( level ){
        this._super();
        this.level = level;

        this.lines = []
        this.velocity = [ 1.3, 1.9, 2.2 ];
        this.v = this.velocity[ this.level ];
        this.nLine = 1;
        this.isInitLine = false;

        this.life = 3;
        this.playerDie = false;
        this.effectDie = false;
        this.gameOver = false;

        this.player = null;
        this.coinCollected = false;
        this.passFloor = false;
        this.started = false;
        this.isPause = false;
    },

    update: function( dt ){
        if( this.player != null ){  

            if( this.started ){

                this.moveFloorUp();
                this.removeLine();

                this.v += 0.0001;
            }
        }
    },

    pause: function(){
        this.unscheduleUpdate();
        this.stopAllActions();
        this.isPause = true;
    },

    resume: function(){
        this.scheduleUpdate();
        this.isPause = false;
    },

    moveFloorUp: function(){
        this.setPosition( cc.p( this.getPosition().x, this.getPosition().y + this.v ) );
    },

    addNewLine: function(){

        var line = [];
        var lastLine = 400;

        if( this.lines.length > 0 ) {
            lastLine = this.lines[ this.lines.length - 1 ][ 0 ].getPosition().y;
        }

        var h = lastLine - 200;

        for( var i = 0; i < 45; i++ ){
            var box = new Box( h, i, this.nLine );
            box.setPosition( new cc.p( i * 30, h ) );

            line.push( box );
            this.addChild( box );
        }

        this.nLine++;
        this.lines.push(line);

        this.initMonster( h );
        this.initCoin( h );
    },

    removeLine: function(){
        if( this.lines[ 0 ][ 44 ].getBoundingBoxToWorld().y > 900 ){
            for( var i = 0; i < this.lines[ 0 ].length; i++ ){
                this.lines[ 0 ][ i ].removeFromParent( true );
            }

            this.lines.splice( 0, 1 );
            this.addNewLine();
        }
    },

    initMonster: function( h ){
        var monsPosition = [ 0, 800 ];
        var choice = Math.round( Math.random() );
        
        var monster = new Monster( this, this.player );
        monster.setPosition( cc.p( monsPosition[ choice ], h + 50 ) );
        this.addChild(monster);
        monster.scheduleUpdate();
    },

    initCoin: function( h ){
        var coinPosition = Math.round( Math.random() * 1100);
        
        var coin = new Coin( this, this.player );
        coin.setPosition( cc.p( coinPosition, h + 50 ) );
        this.addChild(coin);
        coin.scheduleUpdate();
    },

    initLine: function(){
        for( var i = 0; i < 7; i++ ){
            this.addNewLine();
        }
    },

    checkOn: function( obj ){
        for( var i = 0; i < this.lines.length; i++ ){
            for( var j = 0; j < this.lines[ i ].length; j++ ){

                var box = this.lines[i][j];
                var boxBB = box.getBoundingBoxToWorld();

                if( cc.rectOverlapsRect( obj, boxBB ) ){
                    if( box.isShow ) return box.isShow;
                }
            }
        }
        return false;
    },

    destoryBox: function( x, y ){
        for( var i = 0; i < this.lines.length; i++ ){
            for( var j = 0; j < this.lines[ i ].length; j++ ){

                var box = this.lines[ i ][ j ];
                var boxBB = box.getBoundingBoxToWorld();

                if( boxBB.x > x - 55 && boxBB.x < x + 55 &&
                    boxBB.y > y - 50 && boxBB.y < y + 50 ){

                    box.removeFromParent( true );
                    box.isShow = false;
                }
            }
        }
        this.passFloor = true;
    }
});