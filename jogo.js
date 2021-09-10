    console.log('[Ilukinha-moya] Flappy Bird');

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
    }

    
    const flappubird = {
        spritesX: 0,
        spritesY: 0,
        width: 33,
        height: 24,
        x: 10,
        y: 50,
        desenha(){
             contexto.drawImage(
                sprites,
                flappubird.spritesX, flappubird.spritesY, //Sprite X e Sprite Y 
                flappubird.width, flappubird.height, //Sprite w e Sprite h tamanho do recorte na sprite
                flappubird.x, flappubird.y, //X e Y da figura geometrica do canvas
                flappubird.width, flappubird.height,
            );    
        } 
        
    }

    function loop(){
        
        bg.desenha();  
        chao.desenha();
        flappubird.desenha();
        
        flappubird.y = flappubird.y + 1;
        requestAnimationFrame(loop);
    }

    loop();