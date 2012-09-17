Heroi = BaseEntity.extend({
	defaults: {
        'speed' : 3,
    },
    initialize: function(){
    	var model = this,
    		colidiu = false,
    		animationStep = 0,
    		entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Keyboard, heroi, Mouse, Collision, Tween");

    	entity
            .attr({x: 350, y: 530, z: 300})
            .collision(new Crafty.polygon([31,2],[24,21],[14,29],[12,23],[10,27],[10,37],[12,39],[21,39],[25,41],[25,60],[38,60],[38,41],[42,39],[51,39],[53,37],[54,27],[51,23],[49,29],[39,21],[32,2]))
            .multiway(model.get('speed'), {RIGHT_ARROW: 0, LEFT_ARROW: 180})
            .bind('Moved', moveHeroi)
            .bind('KeyDown', atira)
            .onHit("nave", function(hit) {
            	/*
            	 * A flag 'colidiu' permite disparar o evento de colisão apenas uma vez
            	 * por colisão
            	 */
            	if (!colidiu) {
					var evt = document.createEvent("Event");
	            	evt.initEvent("HitHeroEvent", true, true);
	            	document.dispatchEvent(evt);
	            	
	            	animationStep = 0;
	            	this.tween({alpha: 0}, 5);
	            	this.bind('TweenEnd', anima);
	            	
	            	colidiu = true;
            	}
	            	
            }, function() {
            	colidiu = false;
            })
            
            function moveHeroi(frame) {
            	if(frame.x < 0)
                {
                	entity.x = 0;
                }
                else if (frame.x > 740)
                {
                	entity.x = 740;
                }
            }
            
            function atira(keyPressed) {
            	if(keyPressed.key == Crafty.keys['A'])
            	{
					var elements = [
	                    "src/entities/tiro.js",
		    		];
	
	    			require(elements, function() {
	    				 var tiro = new Tiro({'parent': entity});
	    			});
            	}
            }
            
            function anima(){
            	switch(animationStep) {
            		case 0:
            			this.tween({alpha: 1.0}, 5)
            			animationStep++;
            			break;
            		case 1:
            			this.tween({alpha: 0}, 5)
            			animationStep++;
            			break;
            		case 2:
            			this.tween({alpha: 1.0}, 5)
            			animationStep++;
            			break;
            		case 3:
            			this.unbind('TweenEnd');
            			break;
            	}     
            }

            entity.origin(entity.w/2, entity.h/2);

    	model.set({'entity' : entity });
    }
});