Crafty.scene("gameover", function() {

	var elements = [
        "src/interfaces/screentext.js",
        "src/interfaces/button.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		
		var screenText = new ScreenText({'text': gameContainer.conf.get('gameOverStatus'), 'fadeOut': false});
		
		var pontuacao = Crafty.storage.load('Placar', 'save', function(data){
			var txtScore = new CustomText({'x': 250, 'y': 300, 'w': 300, 'h': 42, 'text': 'Sua pontuação: '+data, 'fontSize': '14', 'textAlign': 'center'});
		});
		
		var btnStart = new CustomButton({'x': 250, 'y': 355, 'text': "Reiniciar Jogo", 'goToScene': "main"});
		
		/*Crafty.audio.stop();
		Crafty.audio.add("gameover", "web/audio/game_over.mp3");
        Crafty.audio.play("gameover",-1);*/
   			
	});

});