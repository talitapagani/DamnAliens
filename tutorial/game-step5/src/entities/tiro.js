Tiro = BaseEntity.extend({
	defaults: {
        
    },
    initialize: function(parent){
    	var model = this;
    	var disparou = false, explodiu = false;
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", tiro, SpriteAnimation, Collision");

    	entity
            .attr({x: ((parent.x+(parent.w/2))-8), y: ((parent.y+(parent.h/2))-8), z: 300})
            .collision(new Crafty.polygon([8,0],[5,3],[5,12],[3,13],[3,15],[14,15],[14,13],[12,3],[9,0]))
            .bind('EnterFrame', moveTiro)
            .onHit("nave", function(hit) {
            	
            	for(i = 0; i < hit.length; i++) {
            		var nave = hit[i]['obj'];
            		
            		Crafty.sprite(34, "web/images/explosion.png", {
					    explosion: [0,0]
					});
					
					var explosion = Crafty.e("2D, Canvas, SpriteAnimation, explosion")
										.attr({w: 34, h: 34, x: nave.x, y: nave.y, z: 300})
									    .animate('explosion', 0, 0, 8) // setup animation
									    .animate('explosion', 8, 0) // start animation
								    
            		nave.destroy();
            	}
            	
            	this.destroy();
            	
            	var evt = document.createEvent("Event");
            	evt.initEvent("SpaceshipEvent", true, true);
            	document.dispatchEvent(evt);
            	
            })
            
            function moveTiro(e) {
            	if(this.y < 10)
				{
					this.destroy();
				}
				else
				{
					this.y -= 10;
				}
				
				/*
				 * Controle para disparar o evento que indica que foi realizado um tiro apenas uma vez,
				 * caso contrário, ele irá disparar o evento durante toda a trajetória da bala
				 * e atualizará o indicador de disparos erroneamente
				 */
				if(!disparou) {
					var evt = document.createEvent("Event");
	            	evt.initEvent("ShotEvent", true, true);
	            	document.dispatchEvent(evt);
	            	
	            	disparou = true;
				}
            }

            entity.origin(entity.w/2, entity.h/2);

    	model.set({'entity' : entity });
    }
});