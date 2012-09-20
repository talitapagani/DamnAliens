Crafty.scene("main", function() {

	var elements = [
        "src/entities/heroi.js",
        "src/entities/nave.js"
        
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		
		sc['heroi'] = new Heroi();
		
		sc['nave'] = new Nave({'id': 'nave', 'x': 0, 'y': 0, 'speed': 1});
		
	});

});
