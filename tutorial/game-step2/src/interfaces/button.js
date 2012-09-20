CustomButton = BaseEntity.extend({
	defaults: {
        'w' : 300,
        'h': 45
    },
    initialize: function(params){
    	var model = this;
    	var entity = Crafty.e("2D, DOM, Text, Mouse, btnNormal");

    	entity
            .attr({x: params['x'], y: params['y'], z: 1000, w: model.get('w'), h: model.get('h')})
            .sprite(0,0,1,1)
            .text(params['text'])
            .css({cursor: 'pointer', fontFamily: 'Impact', fontSize: '24px', color: '#FFF', lineHeight: '42px', textAlign: 'center'})
            .bind('Click', function(){
            	if (params['goToScene'] != undefined)
            	{
            		Crafty.scene(params['goToScene']);
            	}
            })
            .bind('MouseOver', function(){
                 this
                 	.css({color: '#000'})
                 	.sprite(0,1,1,1);
            })
            .bind('MouseOut', function(){
                 this
                 	.css({color: '#FFF'})
                 	.sprite(0,0,1,1);
            })

    	model.set({'entity' : entity });
    }
});