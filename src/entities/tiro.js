Tiro = BaseEntity.extend({
	defaults: {
        
    },
    initialize: function(params){
    	var model = this,
    		disparou = false, explodiu = false,
    		parent = params.parent,
    		entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", tiro, Collision");

    	entity
            .attr({x: ((parent.x+(parent.w/2))-8), y: ((parent.y+(parent.h/2))-8), z: 300})
            .collision(new Crafty.polygon([8,0],[5,3],[5,12],[3,13],[3,15],[14,15],[14,13],[12,3],[9,0]))
            .bind('EnterFrame', moveTiro)
            .onHit("nave", function(hit) {
            	
            	/* A flag garante que o som será executado apenas uma vez por colisão
            	 * caso contrário seria executada durante toda a trajetória dentro
            	 * do polígono do elemento colidido */
            	if (!explodiu)
            	{
            		Crafty.audio.add("boom", "web/audio/bullet_boom.mp3");
            		Crafty.audio.play("boom",1);
            		
            		explodiu = true;
            	}
            	
            	for(i = 0; i < hit.length; i++) {
            		var nave = hit[i]['obj'];
					
					var explosion = Crafty.e("2D, Canvas, SpriteAnimation, explosion")
										.attr({x: nave.x, y: nave.y, z: 300})
									    .animate('explosion', 0, 0, 8) // setup animation
									    .animate('explosion', 8, 0) // start animation
								    
            		nave.destroy();
            	}
            	
            	this.destroy();
            	
            	/* Dispara um evento que será tratado pela cena 'main'.
            	 * Este evento indica que foi removida uma nave do canvas e é preciso
            	 * decrementar a variável que controla quantas naves há no exército.
            	 * Quando a quantidade chega a 0, a função que trata o recebimento do evento
            	 * verifica se precisa fazer level up ou, caso esteja no último level,
            	 * passar para a tela de game over indicando que o jogador zerou o jogo */
            	var evt = document.createEvent("Event");
            	evt.initEvent("SpaceshipEvent", true, true);
            	document.dispatchEvent(evt);
            	
            }, function() {
            	explodiu = false;
            })
            
            function moveTiro() {
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
					Crafty.audio.add("bullet", "web/audio/bullet.mp3");
					Crafty.audio.play("bullet",1);

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