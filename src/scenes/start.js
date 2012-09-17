Crafty.scene("start", function() {

	var elements = [
		"src/classes/movieclip.js",
        "src/interfaces/text.js",
        "src/interfaces/button.js"
	];
	
	require(elements, function() {
		
		var screenText = new CustomText({'x': 0, 'y': -48, 'w': 800, 'h': 48, 'text': "Damn Aliens!", 'fontSize': '48', textAlign: 'center'});
		
		screenText.getEntity().addComponent("Tweener");
		screenText.getEntity().addTween({y: 230}, 'easeOutBounce', 120, function() {
			// Impede que continue sendo executado o enterframe do component
			// Evita processamento desnecessário
			this.removeComponent("Tweener");
		});
		
		new CustomButton({'x': 250, 'y': 300, 'text': "Iniciar Jogo", 'goToScene': "main"});
		new CustomButton({'x': 250, 'y': 355, 'text': "Instruções",   'goToScene': "instructions"});
		
		Crafty.audio.stop();
		Crafty.audio.add("start", "web/audio/start.mp3");
        Crafty.audio.play("start",-1);
   			
	});

});