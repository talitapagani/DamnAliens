Crafty.scene("main", function() {

	var elements = [
        "src/entities/heroi.js",
        "src/entities/nave.js",
        "src/interfaces/screentext.js",
        "src/interfaces/text.js"
        
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		/* Variáveis que controlam a quantidade de naves no exercito */
		var exercito = 0, numNaves = 8;
		/* Variáveis que controlam os parâmetros do nível do jogo */
		var nivel = 1, acertos = 0, disparos = 0, pontos = 0, valorAcerto = 0, naveSpeed = 1;
		/* Array que controla a quantidade de vidas do jogador */
		lifes = [], lifes_remaining = 0;
			   
		sc['heroi'] 			= new Heroi();
		infc['placar'] 			= new CustomText({'x': 650, 'y': 10, 'w': 40, 'h': 12, 'text': 'Placar: ', 			 'fontSize': '12'});
		infc['placar_score'] 	= new CustomText({'x': 690, 'y': 10, 'w': 40, 'h': 12, 'text': pontos.toString(),    'fontSize': '12'});
		infc['nivel'] 			= new CustomText({'x': 650, 'y': 30, 'w': 40, 'h': 12, 'text': 'Nível: ',  			 'fontSize': '12'});
		infc['nivel_num'] 		= new CustomText({'x': 690, 'y': 30, 'w': 40, 'h': 12, 'text': nivel.toString(),     'fontSize': '12'});
		infc['disparos'] 		= new CustomText({'x': 650, 'y': 50, 'w': 40, 'h': 12, 'text': 'Disparos/Acertos: ', 'fontSize': '12'});
		infc['disparos_num'] 	= new CustomText({'x': 750, 'y': 50, 'w': 40, 'h': 12, 'text': disparos+'/'+acertos, 'fontSize': '12'});
		
		function criaExercito(numNaves, naveSpeed) {
			exercito = 0;
			
			for(var i = 0, posX = 0, posY = 0; i < numNaves; i++, exercito++, posX += 100) {
				/* Se o índice da nave for múltiplo de 8, redefine os valores de posicionamento
				 * para que as próximas naves fiquem em uma nova linha */
				if ((i % 8) == 0)
				{
					posX = 20;
					if (i > 0)
					{
						posY += 80;
					}
				}
				
				sc['nave_'+i] = new Nave({'id': 'nave_'+i, 'x': posX, 'y': posY, 'speed': naveSpeed});
			}
		}
		
		/*
		 * setLevel
		 * 
		 * Define o nível do jogo a qual está o jogador
		 * 
		 * @param	level			Nível do jogo
		 * @param	numNaves		Quantas naves devem ter neste nível
		 * @param	valorPonto		Quanto vale cada acerto em uma nave
		 * @param	naveSpeed		A velocidade das naves
		 * */
		function setLevel(_level, _numNaves, _valorPonto, _naveSpeed) {
			nivel = _level;
			numNaves = _numNaves;
			valorAcerto = _valorPonto;
			naveSpeed = _naveSpeed;
			
			infc['nivel_num'].setText({'text': nivel});
			
			infc['level_tween'] = new ScreenText({'text': 'Nível '+nivel});
			
			criaExercito(_numNaves, _naveSpeed);
		}
		
		/*
		 * setLifes
		 * 
		 * Define a quantidade de vidas do jogador
		 * 
		 * @param	amount	Quantidade de vidas
		 * */
		function setLifes(_amount) {
			var _w = 16, _h = 16;
			for (var i = 0, posX = 10, posY = 10; i < _amount; i++, posX += 21) {
				lifes[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", DOM, Image, vida")
		            				.attr({w: _w, h: _h, x: posX, y: posY, z: 1000})
		            				.image("web/images/life.png");
		        
				/* Fix - a largura e altura são definidas corretamente através do método attr() apenas no primeiro item, nos demais
				 * é preciso definir a largura e altura individualmente */
				lifes[i].w = _w;
				lifes[i].h = _h;
			}
			lifes_remaining = _amount;
		}
		
		/*
		 * EVENTO - ShotEvent
		 * 
		 * Capturado sempre que a nave herói atira
		 */
		document.addEventListener("ShotEvent", function() {
			++disparos;
			atualizaDisparos();
		}, false);
		
		/*
		 * EVENTO - SpaceShipEvent
		 * 
		 * Capturado quando uma nave é destruída
		 */
		document.addEventListener("SpaceshipEvent", function() {
			--exercito; // decrementa o contador de naves
			++acertos;
			pontos += valorAcerto;
			
			atualizaPlacar();
			atualizaDisparos();
			
			/*
			 * Se não tiver mais nenhuma nave no palco, faz 2 verificações
			 * */
			if(exercito == 0) {
				/*
				 * Se não há mais nenhuma nave e o jogador está no último nível,
				 * significa que ele venceu o jogo, então despacha o evento para a 
				 * classe Main informando que o jogador venceu.
				 * Caso contrário, faz o upgrade de nível
				 * */
				if (nivel == 3) {
					//Encerra o jogo como vencedor e passa para a tela de 'Game Over'
					gameContainer.conf.set({'gameOverStatus': "Você ganhou =)"});
					Crafty.scene("gameover");
				} else {
					/*
					 * Regras para level up:
						 * Adiciona mais 8 naves (1 linha de naves) ao exército
						 * Dobra o valor do tiro caso ele acerte a nave
						 * Incrementa a velocidade das naves
					 * */
					setLevel(++nivel, (numNaves + 8), (valorAcerto * 2), (naveSpeed + 0.5));
				}
			}
		}, false);
		
		/*
		 * EVENTO - HitHeroEvent
		 * 
		 * Capturado quando a nave herói é atingida
		 * Decrementa a quantidade de vidas
		 */
		document.addEventListener("HitHeroEvent", function() {
			--lifes_remaining;
			if (lifes_remaining < 0)
			{
				//Encerra o jogo e passa para a tela de 'Game Over'
				gameContainer.conf.set({'gameOverStatus': "Você perdeu =("});
				Crafty.scene("gameover");
			} else {
				// Remove sempre o último item da array de vidas
				lifes[lifes_remaining].destroy();
			}
		}, false);
		
		/*
		 * EVENTO - keydown
		 * 
		 * Capturado ao pressionar uma tecla
		 * Valida se a tecla pressionada for a barra de espaço e, caso seja, pausa ou despausa o jogo
		 */
		document.addEventListener("keydown", function(e) {
			if(e.key == Crafty.keys['SPACE']) {
				if (!Crafty.isPaused())
				{
					infc['pause_tween'] = new ScreenText({'text': 'Pause II', 'pause': true});
				}
				else
				{
					infc['pause_tween'].remove();
					Crafty.pause();
				}
				
			}
		},false);
		
		function atualizaPlacar() {
			infc['placar_score'].setText({'text': pontos.toString()});
			Crafty.storage.save('Placar', 'save', pontos);
		}
		
		function atualizaDisparos() {
			infc['disparos_num'].setText({'text': disparos+'/'+acertos})
		}
		
		/* Inicia o Jogo */
		Crafty.storage.open('SpaceInvaders');
		setLevel(1, 8, 10, 1);
		setLifes(3);
		Crafty.storage.save('Placar', 'save', pontos); // Salva a pontuação inicial para que não haja problemas quando reiniciar o jogo
		
		/*Crafty.audio.stop();
		Crafty.audio.add('ambient', "web/audio/game2.mp3");
        Crafty.audio.play("ambient",-1);*/
		
	});

});
