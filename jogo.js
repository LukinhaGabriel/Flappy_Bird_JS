    console.log('[Ilukinha-moya] Flappy Bird');

    let frames = 0;
    const som_HIT = new Audio();
    som_HIT.src = './efeitos/caiu.wav'

    
    const sprites = new Image();
    sprites.src = './sprites.png';

    const $canvas = document.querySelector('canvas');
    const contexto = $canvas.getContext('2d');

    function criaChao(){
        //chao
        const chao = {
            spritesX: 0,
            spritesY: 610,
            width: 224,
            height: 112,
            x: 0,
            y: $canvas.height - 112,
            atualiza(){
                //para cada quadro que anda o jogo vai andar o chao 1 para frente
                const movimentoDoChao = 1; 
                const repeteEm = chao.width / 2;
                const movimentacao = chao.x - movimentoDoChao;
                // console.log('[chao.x]', chao.x);
                // console.log('[repeteEm]', repeteEm);
                // console.log('[Calculo maluco]', movimentacao % repeteEm);

                chao.x = movimentacao %repeteEm;
            },
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
        return chao;
    }

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
                // console.log('Devo pular');
                // console.log('[antes]',flappyBird.velocidade);
                flappyBird.velocidade = - flappyBird.pulo;
                // console.log('[depois]',flappyBird.velocidade);
            },
            gravidade: 0.25,
            velocidade: 0,
            atualiza(){
                if(fazColisao(flappyBird, globais.chao)){
                    console.log('Fez colisão');
                    som_HIT.play();
                    
                    mudaParaTela(Telas.GAME_OVER);
                    
                    return;
                }
                flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
                flappyBird.y = flappyBird.y + flappyBird.velocidade;
            },
            movimentos: [
                { spritesX: 0, spritesY: 0,  }, //asa pra cima
                { spritesX: 0, spritesY: 26, }, //asa no meio
                { spritesX: 0, spritesY: 52, }, // asa pra baixo
            ],
            frameAtual: 0,
            atualizaOFrameAtual(){
                const intevaloDeFrames = 10;
                const passouOIntervalo = frames % intevaloDeFrames === 0;
                // console.log('[passouOIntervalo]', passouOIntervalo);

                if(passouOIntervalo){
                    const baseDoIncremento = 1
                    const incremento = baseDoIncremento + flappyBird.frameAtual;
                    const baseRepeticao = flappyBird.movimentos.length;
                    // console.log('[incremento]', incremento);
                    // console.log('[baseRepeticao]', baseRepeticao);
                    // console.log('[frames]',incremento % baseRepeticao);
                    flappyBird.frameAtual = incremento % baseRepeticao;
                }              
            },
            desenha(){
                flappyBird.atualizaOFrameAtual();
                const { spritesX, spritesY } = flappyBird.movimentos[flappyBird.frameAtual];
                contexto.drawImage(
                    sprites,
                    spritesX, spritesY, //Sprite X e Sprite Y 
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

    //[Mensagem de GameOver]
    const mensagemGameOver = {
        spritesX: 134,
        spritesY: 153,
        width: 226,
        height: 200,
        x: ($canvas.width / 2) - 226 / 2,
        y: 50,
        desenha(){
            contexto.drawImage(
                sprites,
                mensagemGameOver.spritesX, mensagemGameOver.spritesY, //Sprite X e Sprite Y 
                mensagemGameOver.width, mensagemGameOver.height, //Sprite w e Sprite h tamanho do recorte na sprite
                mensagemGameOver.x, mensagemGameOver.y, //X e Y da figura geometrica do canvas
                mensagemGameOver.width, mensagemGameOver.height,
            );    
        }
    };

    function criaCanos(){
        const canos = {
            width: 52,
            height: 400,
            chao: {
                spritesX: 0,
                spritesY: 169,
            },
            ceu: {
                spritesX: 52,
                spritesY: 169,
            },
            espaco: 80,
            desenha(){
                canos.pares.forEach(function(par){
                    const yRandom = par.y;
                    const espacamentoEntreCanos = 90;
    
                    const canoCeuX = par.x;
                    const canoCeuY = yRandom;
                    
                    //[Cano do Céu]
                    contexto.drawImage(
                        sprites,
                        canos.ceu.spritesX, canos.ceu.spritesY,
                        canos.width, canos.height,
                        canoCeuX, canoCeuY,
                        canos.width, canos.height,
                    );
                    //[Cano do Chão]
                    const canoChaoX = par.x;
                    const canoChaoY = canos.height + espacamentoEntreCanos + yRandom;
                    contexto.drawImage(
                        sprites,
                        canos.chao.spritesX, canos.chao.spritesY,
                        canos.width, canos.height,
                        canoChaoX, canoChaoY,
                        canos.width, canos.height,
                    );
                    par.canoCeu = {
                        x: canoCeuX,
                        y: canos.height + canoCeuY,
                    };
                    par.canoChao = {
                        x: canoChaoX,
                        y: canoChaoY,
                    }
                })
            },
            temColisaoComOFlappyBird(par){
                const cabecaDoFlappy = globais.flappyBird.y;
                const peDoFlappy = globais.flappyBird.y + globais.flappyBird.height;
                
                if((globais.flappyBird.x + globais.flappyBird.width) >= par.x){
                    // console.log('Flappy bird invadiu a área dos canos')    
                    if(cabecaDoFlappy <= par.canoCeu.y){
                        return true;
                    }
                    if(peDoFlappy >= par.canoChao.y){
                        return true;
                    }
                };
                return false;
            },
            pares: [],
            atualiza(){ 
                const passou100Frames = frames % 100 === 0;
                if(passou100Frames){
                    console.log('passou 100 Frames');
                    canos.pares.push({
                        x: $canvas.width,
                        y: -150 * (Math.random() + 1),
                    },);
                }
                canos.pares.forEach(function(par){
                    par.x = par.x - 2;

                    if(canos.temColisaoComOFlappyBird(par)){
                        console.log('perdeu')
                        mudaParaTela(Telas.GAME_OVER);
                    }
                    if(par.x + canos.width <= 0){
                        canos.pares.shift();
                    }
                
                }); 
            }
        }
        return canos;

    }

    function criaPlacar(){
        const placar = {
            
            pontuacao: 0,
            desenha(){
                contexto.font = '35px "VT323" ';
                contexto.textAlign = 'center';
                contexto.fillStyle = 'white';
                contexto.fillText(`Score ${placar.pontuacao}`, $canvas.width - 160, 35);
            },
            atualiza(){
                const intevaloDeFrames = 20;
                const passouOIntervalo = frames % intevaloDeFrames === 0;

                if(passouOIntervalo){
                    placar.pontuacao = placar.pontuacao + 1;
                }
            }
        };
        return placar;
    }

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
                globais.chao = criaChao();
                globais.canos = criaCanos();
            },
            desenha() {
                bg.desenha();  
                globais.flappyBird.desenha();
                globais.chao.desenha();
                mensagemGetReady.desenha();
            },
            click(){
                mudaParaTela(Telas.JOGO);
            },
            atualiza() {
                globais.chao.atualiza();
            }
        }
    };

    Telas.JOGO = {
        inicializa(){
            globais.placar = criaPlacar();
        },
        desenha(){
            bg.desenha();
            globais.canos.desenha();  
            globais.chao.desenha();
            globais.flappyBird.desenha();
            globais.placar.desenha();

        },
        click(){
            globais.flappyBird.pula();
        },
        atualiza(){
            globais.flappyBird.atualiza();
            globais.canos.atualiza();
            globais.chao.atualiza();
            globais.placar.atualiza();
        }
    };

    Telas.GAME_OVER = {
        desenha(){  
            mensagemGameOver.desenha();
        },

        click(){
            mudaParaTela(Telas.INICIO);
        },

        atualiza(){

        },
    }
    

    function loop(){
        telaAtiva.desenha();
        telaAtiva.atualiza();

        frames = frames + 1;
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