    console.log('[Ilukinha-moya] Flappy Bird');

    const som_HIT = new Audio();
    som_HIT.src = './efeitos/hit.wav'
    
    const sprites = new Image();
    sprites.src = './sprites.png';

    const $canvas = document.querySelector('canvas');
    const contexto = $canvas.getContext('2d');

    //chao
    const chao = {
        spritesX: 0,
        spritesY: 610,
        width: 224,
        height: 112,
        x: 0,
        y: $canvas.height - 112,
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spritesX, chao.spritesY, //Sprite X e Sprite Y 
                chao.width, chao.height, //Sprite w e Sprite h tamanho do recorte na sprite
                chao.x, chao.y, //X e Y da figura geometrica do canvas
                chao.width, chao.height,
            );  
            contexto.drawImage(
                sprites,
                chao.spritesX, chao.spritesY, //Sprite X e Sprite Y 
                chao.width, chao.height, //Sprite w e Sprite h tamanho do recorte na sprite
                (chao.x + chao.width), chao.y, //X e Y da figura geometrica do canvas
                chao.width, chao.height,
            );    
        }
    };

    //background
    const bg = {
        spritesX: 390,
        spritesY: 0,
        width: 276,
        height: 204,
        x: 0,
        y: $canvas.height - 204,
        desenha(){
            contexto.fillStyle = '#70c5ce';
            contexto.fillRect(0,0, $canvas.width, $canvas.height);
            contexto.drawImage(
                sprites,
                bg.spritesX, bg.spritesY, //Sprite X e Sprite Y 
                bg.width, bg.height, //Sprite w e Sprite h tamanho do recorte na sprite
                bg.x, bg.y, //X e Y da figura geometrica do canvas
                bg.width, bg.height,
            );  
            contexto.drawImage(
                sprites,
                bg.spritesX, bg.spritesY, //Sprite X e Sprite Y 
                bg.width, bg.height, //Sprite w e Sprite h tamanho do recorte na sprite
                (bg.x + bg.width), bg.y, //X e Y da figura geometrica do canvas
                bg.width, bg.height,
            );   
        }
    };

    function fazColisao(flappyBird, chao){
        const flappyBirdY = flappyBird.y + flappyBird.height;
        const chaoY = chao.y;
        
        if(flappyBirdY >= chaoY){
            return true;
        }

        return false;

    }
    
    function criaFlappyBird(){
        const flappyBird = {
            spritesX: 0,
            spritesY: 0,
            width: 33,
            height: 24,
            x: 10,
            y: 50,
            pulo: 4.6,
            pula(){
                console.log('Devo pular');
                //console.log('[antes]',flappyBird.velocidade);
                flappyBird.velocidade = - flappyBird.pulo;
                //console.log('[depois]',flappyBird.velocidade);
            },
            gravidade: 0.25,
            velocidade: 0,
            atualiza(){
                if(fazColisao(flappyBird, chao)){
                    console.log('Fez colisão');
                    som_HIT.play();

                    setTimeout( () => {

                        mudaParaTela(Telas.INICIO);

                    }, 500);
                    return;
                }
                flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
                flappyBird.y = flappyBird.y + flappyBird.velocidade;
            },
            desenha(){
                 contexto.drawImage(
                    sprites,
                    flappyBird.spritesX, flappyBird.spritesY, //Sprite X e Sprite Y 
                    flappyBird.width, flappyBird.height, //Sprite w e Sprite h tamanho do recorte na sprite
                    flappyBird.x, flappyBird.y, //X e Y da figura geometrica do canvas
                    flappyBird.width, flappyBird.height,
                );    
            } 
            
        };
        return flappyBird;
   };


    //[mensagemGetReady]
    const mensagemGetReady = {
        spritesX: 134,
        spritesY: 0,
        width: 174,
        height: 152,
        x: ($canvas.width / 2) - 174 / 2,
        y: 50,
        desenha(){
            contexto.drawImage(
                sprites,
                mensagemGetReady.spritesX, mensagemGetReady.spritesY, //Sprite X e Sprite Y 
                mensagemGetReady.width, mensagemGetReady.height, //Sprite w e Sprite h tamanho do recorte na sprite
                mensagemGetReady.x, mensagemGetReady.y, //X e Y da figura geometrica do canvas
                mensagemGetReady.width, mensagemGetReady.height,
            );    
        }
    };

    //
    // [Telas]
    //
    const globais = {};
    let telaAtiva = {};
    
    function mudaParaTela(novaTela){
        telaAtiva = novaTela;

        if(telaAtiva.inicializa){
            telaAtiva.inicializa();
        }
        
    }

    const Telas = {
        INICIO: {
            inicializa() {
                globais.flappyBird = criaFlappyBird();
            },
            desenha() {
                bg.desenha();  
                chao.desenha();
                globais.flappyBird.desenha();
                mensagemGetReady.desenha();
            },
            click(){
                mudaParaTela(Telas.JOGO);
            },
            atualiza() {

            }
        }
    };

    Telas.JOGO = {
        desenha(){
            bg.desenha();  
            chao.desenha();
            globais.flappyBird.desenha();

        },
        click(){
            globais.flappyBird.pula();
        },
        atualiza(){
            globais.flappyBird.atualiza();
        }
    };


    function loop(){
        telaAtiva.desenha();
        telaAtiva.atualiza();

        requestAnimationFrame(loop);
    }

    //click na tela do canvas
    $canvas.addEventListener('click', function(){
        if(telaAtiva.click){
            telaAtiva.click()
        };
    });

    mudaParaTela(Telas.INICIO);
    loop();