Crafty.scene("instructions", function() {
	
	new CustomText({'x': 0, 'y': 48, 'w': 800, 'h': 50, 'text': "Instruções", 'fontSize': '48', textAlign: 'center'});
	
	new CustomText({'x': 200, 'y': 145, 'w': 250, 'h': 48, 'text': "Mover nave do jogador", 'fontSize': '24', textAlign: 'left'});
	new CustomText({'x': 500, 'y': 145, 'w': 100, 'h': 48, 'text': "Setas", 'fontSize': '24', textAlign: 'left'});
	
	new CustomText({'x': 200, 'y': 205, 'w': 250, 'h': 48, 'text': "Atirar", 'fontSize': '24', textAlign: 'left'});
	new CustomText({'x': 500, 'y': 205, 'w': 100, 'h': 48, 'text': "A", 'fontSize': '24', textAlign: 'left'});
	
	new CustomText({'x': 200, 'y': 265, 'w': 250, 'h': 48, 'text': "Pause", 'fontSize': '24', textAlign: 'left'});
	new CustomText({'x': 500, 'y': 265, 'w': 100, 'h': 48, 'text': "P", 'fontSize': '24', textAlign: 'left'});
	
	new CustomButton({'x': 95,  'y': 520, 'text': "Voltar à tela inicial", 'goToScene': "start"});
	new CustomButton({'x': 405, 'y': 520, 'text': "Iniciar Jogo", 'goToScene': "main"});
	
});