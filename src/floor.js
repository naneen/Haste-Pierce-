var Floor = cc.Node.extend({

    ctor: function(){
        this._super();
        this.lines = []
        this.v = 1.3;
        this.nLine = 1;
        // this.initLine();
        this.isInit = false;
        this.player = null;
    },

    update: function( dt ){
        var position = this.getPosition();
        
        if( this.player != null ){  
            
            if( !this.isInit ) {
                this.initLine();
                this.isInit = true;
            }

            //move floor up
            this.setPosition( cc.p( position.x, position.y + this.v ) );
            
            //add Line
            if( this.lines[ 0 ][ 44 ].getBoundingBoxToWorld().y > 600 ){
                for( var i = 0; i < this.lines[ 0 ].length; i++ ){
                    this.lines[ 0 ][ i ].removeFromParent( true );
                }

                this.lines.splice( 0, 1 );//!!!!!!!!!!
                this.addLine();
            }

            //check player isAlive?
            if( !this.player.isAlive ){
                this.unscheduleUpdate();
            }
        }
    },

    addLine: function(){

        var line = [];
        var lastLine = 400;

        if( this.lines.length > 0 ) {
            // console.log(this.lines.length);
            lastLine = this.lines[ this.lines.length - 1 ][ 0 ].getPosition().y;
        }

        var h = lastLine - 200;

        for( var i = 0; i < 45; i++ ){
            var box = new Box( h, i, this.nLine );//!!!!!!!!!!
            box.setPosition( new cc.p( i * 30, h ) );

            line.push( box );
            this.addChild( box );
        }

        this.nLine++;//!!!!!!!!!!
        this.lines.push(line);

        //add monster
        this.initMonster( h );
        
        //add ball
        this.initCoin( h );
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
        for( var i = 0; i < 4; i++ ){
            this.addLine();
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
    }
});