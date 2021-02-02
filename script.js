//Elemento cavas do html
let canvas  = document.getElementById('snake');
//contexto. pode ser 2d (que rendeniza um gráfico 2d), webgl ou webgl2 (que rendenizam gráfico 3d), ou bitmaprenderer possibilitando inserir uma imagem bitmap. 
//https://www.webcodegeeks.com/html5/html5-3d-canvas-tutorial/
//https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement/getContext
let context = canvas.getContext('2d');
let box     = 32;
//as posições de cada pixel da cobra
let snake = [];
snake[0]= {
    x:8*box,
    y:8*box
};
//Recebe a direção em que a cobra se movimenta
let direction;
//As posições em x e y em q a comida aparecerá
let food = {
    x:Math.floor(Math.random() * 15 + 1) * box,
    y:Math.floor(Math.random()* 15 + 1) * box,
    //Sua pontuação
    score:0
};

var pontos = document.getElementById('pontos');

//desenha a tela do jogo
function criarBg(){
    context.fillStyle = 'lightgreen';
    //posições x , y, altura, largura
    context.fillRect(0,0,16*box,16*box);
}

//desenha a cobra na tela
function criarSnake(){
    //para cada index do vetor desenhe um segmento para o corpo da cobra
    for (let i=0; i< snake.length; i++){
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Cria um elemento 'Ouvidor' para o precionar de uma tecla
document.addEventListener('keydown',update);

function update(event){
    if(event.keyCode==37 && direction!='right') direction='left'; 
    if(event.keyCode==38 && direction!='down') direction='up'; 
    if(event.keyCode==39 && direction!='left') direction='right'; 
    if(event.keyCode==40 && direction!='up') direction='down'; 
}

//Desenha a comida na tela
function drawnFood(){
    context.fillStyle= "#fc2717";
    context.fillRect(food.x,food.y,box,box);
}

function iniciarJogo(){
    if(snake[0].x >15*box && direction == 'right') snake[0].x = 0;
    if(snake[0].x <0 && direction == 'left') snake[0].x = 15*box;
    if(snake[0].y >15*box && direction == 'down') snake[0].y = 0;
    if(snake[0].y <0 && direction == 'up') snake[0].y = 15*box;

    for(let i = 1; i<snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            //Encerra o jogo
            clearInterval(jogo);
            //Mostra sua pontuação
            document.getElementById('score').innerText=food.score;
            //Faz o card aparecer
            document.getElementById('card').style.display='block';
            //Botão que reinicia o jogo
            document.getElementById('reset').addEventListener('click',function(){
                //faz o card sumir
                document.getElementById('card').style.display='none';
                
                //reinicia o jogo
                let jogo = setInterval(iniciarJogo, 100);
                //reinicia o tamanho da snake
                for(let i=0; snake.length>1; i++){
                    snake.pop() 
                }
                //reinicia a pontuação
                food.score=0;
                pontos.innerText="Score: 0"
                // " Dá play no jogo "
                iniciarJogo();
            })
        }
    }

    criarBg();
    criarSnake();
    drawnFood();

    snakeX= snake[0].x;
    snakeY= snake[0].y;

    if(direction=='right'){snakeX+=box;}
    if(direction=='left'){snakeX-=box;}
    if(direction=='up'){snakeY-=box;}
    if(direction=='down'){snakeY+=box;}

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 14 + 1) * box;
        food.y = Math.floor(Math.random() * 14 + 1) * box;

        //Adiciona um ponto ao score e mostra na tela
            food.score++;
            pontos.innerText=`Score: ${food.score}`;
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);   
}

let jogo = setInterval(iniciarJogo, 100);

iniciarJogo();