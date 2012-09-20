ScreenText = BaseEntity.extend({
	defaults: {
        'text' : '',
    },
    initialize: function(params){
    	var model = this;
    	var animationStep = 0;
    	var entity = Crafty.e("2D, DOM, Text, Tween");

    	entity
            .attr({w: 800, x: 0, y: -48, z: 1000})
            .text(params['text'])
            .css({fontFamily: 'Impact', fontSize: '48px', color: '#FFF', textAlign: 'center'})
            .tween({y: 280}, 30)
            .bind('TweenEnd', function(){
            	switch(animationStep) {
            		case 0:
            			this.tween({y: 200}, 30);
            			animationStep++;
            			break;
            		case 1:
            			this.tween({y: 250}, 20);
            			animationStep++;
            			break;
            		case 2:
            			if((params['pause'] != null) && (params['pause'] == true))
            			{
            				Crafty.pause();
            				this.unbind('TweenEnd');
            			}
            			else
            			{
            				if ((params['fadeOut'] != null) && (params['fadeOut'] == false))
            				{
            					this.unbind('TweenEnd');
            				}
            				else
            				{
            					this.tween({alpha: 0}, 100);
            					animationStep++;
            				}
            			}
            			break;
            		case 3:
            			this.unbind('TweenEnd');
            			this.destroy();
            			break;
            	}     
            })

    	model.set({'entity' : entity});
    },
    remove : function(){
        var entity = this.getEntity();

        if (entity){
        	entity
        		.tween({alpha: 0}, 50)
	        	.bind('TweenEnd', function(){
	            	entity.destroy();
	          	})
        }
    }
});