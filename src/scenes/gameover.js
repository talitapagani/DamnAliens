Crafty.scene("gameover", function() {
		
	var screenText = new CustomText({'x': 0, 'y': -48, 'w': 800, 'h': 48, 'text': gameContainer.conf.get('gameOverStatus'), 'fontSize': '48', textAlign: 'center'});
	
	screenText.getEntity().addComponent("Tweener");
	screenText.getEntity().addTween({y: 230}, 'easeOutBounce', 120, function() {
		// Impede que continue sendo executado o enterframe do component
		// Evita processamento desnecessário
		this.removeComponent("Tweener");
	});
	
	Crafty.storage.load('Placar', 'save', function(data){
		new CustomText({'x': 250, 'y': 300, 'w': 300, 'h': 42, 'text': 'Sua pontuação: '+data, 'fontSize': '14', 'textAlign': 'center'});
	});
	
	new CustomButton({'x': 250, 'y': 355, 'text': "Reiniciar Jogo", 'goToScene': "main"});
	
	Crafty.audio.stop();
	Crafty.audio.add("gameover", "web/audio/game_over.mp3");
    Crafty.audio.play("gameover",-1);

});