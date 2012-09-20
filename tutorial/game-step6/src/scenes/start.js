Crafty.scene("start", function() {

	var elements = [
        "src/interfaces/screentext.js",
        "src/interfaces/button.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		
		var screenText = new ScreenText({'text': 'Damn Aliens!', 'fadeOut': false});
		
		var btnStart = new CustomButton({'x': 250, 'y': 300, 'text': "Iniciar Jogo", 'goToScene': "main"});
		
	});

});