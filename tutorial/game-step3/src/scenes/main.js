Crafty.scene("main", function() {

	var elements = [
        "src/entities/heroi.js",
        "src/entities/nave.js",
        "src/interfaces/text.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		
		sc['heroi'] = new Heroi();
		
		sc['nave'] = new Nave({'id': 'nave', 'x': 0, 'y': 0, 'speed': 1});
		
		infc['placar'] 	 = new CustomText({'x': 650, 'y': 10, 'w': 40, 'h': 12, 'text': 'Placar: ', 		  'fontSize': '12'});
		infc['nivel']	 = new CustomText({'x': 650, 'y': 30, 'w': 40, 'h': 12, 'text': 'Nível: ',  		  'fontSize': '12'});
		infc['disparos'] = new CustomText({'x': 650, 'y': 50, 'w': 40, 'h': 12, 'text': 'Disparos/Acertos: ', 'fontSize': '12'});
		
	});

});
