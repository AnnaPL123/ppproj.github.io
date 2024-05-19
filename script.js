blocks=["img/block1.png","img/block2.png","img/block3.png","img/block4.png","img/block5.png","img/block6.png"];
var hearts=5;
var steps=0;
var pole_blocks=[];
var pole_barrier = [ ];
var rows=1;
var indBlock_old = 5;
//заполняем массив препятствий
for (i = 0; i < 17; i++) {
    pole_barrier[i] = 0; //0-пусто,1-кирпичный блок,2-мосток
}

//Генерируем 5 сердец
for(i=1;i<6;i++){
    idImg=document.getElementById('heart'+i);
    idImg.src="img/heart_full.png";
}
//Создаём ландшафт
pole0_0.src="img/block6.png";
pole0_16.src="img/block6.png";
pole_blocks[0] = 5;
pole_blocks[16] = 5;
for(i=1;i<16;i++){
    indBlock=Math.floor(Math.random()*5);
    while (indBlock == indBlock_old) {
        indBlock = Math.floor(Math.random() * 5)
    }
    idImg=document.getElementById('pole0_'+i);
    idImg.src=blocks[indBlock];
    pole_blocks[i] = indBlock;
    if (indBlock == 0) {
        idImg = document.getElementById('pole1_' + i);
        idImg.src = blocks[indBlock];
        pole_barrier[i] = 1;
    }
    indBlock_old = indBlock;
}
pole1_0.src="img/mario_stop.gif";
//Задаём передвижение
function mario_move(event){
    info.innerHTML="";
    if (hearts == 0&&t>0) {
        info.innerHTML="Игра окончена! Вы проиграли!";
        //alert("Игра окончена! Вы проиграли!");
        clearInterval(interval3);
        clearInterval(interval2);
        clearInterval(interval1);
        document.removeEventListener('keydown',mario_move);
    }
    else if (steps>=16){ //чтобы не уходил за поле
       steps=16;
                info.innerHTML="Победа! Вы прошли уровень!"
                //alert("Уровень пройден!");
                clearInterval(interval3);
                clearInterval(interval2);
                clearInterval(interval1);
        pole1_16.src="img/mario_stop.gif"
        document.removeEventListener('keydown', mario_move)
    }else{
    switch (event.key) {
        case 'ArrowRight':
        if (pole_barrier[steps+1] != 1 && rows==1){ //если перед игроком НЕ кирпич  
        idImg=document.getElementById('pole'+rows+'_'+steps);
        idImg.src="img/spacer.gif";
        steps++;
        idImg = document.getElementById('pole'+rows+'_' + steps);///!!!
        idImg.src="img/mario_running.gif";
        checkBlock();
      } if (rows==2){
        idImg=document.getElementById('pole'+rows+'_'+steps);
        idImg.src="img/spacer.gif";
        steps++;
        if (pole_barrier[steps] != 2 && pole_barrier[steps] != 1 ){
            rows=1;
            checkBlock();            
        }
        else {
            rows=2;
            getCoin();
        }
        idImg = document.getElementById('pole'+rows+'_' + steps);
        idImg.src="img/mario_running.gif";

     }
        break;
        case 'Shift':
            idImg = document.getElementById('pole' + rows + '_' + steps);
            idImg.src = "img/spacer.gif";
            steps++;
            if (rows==2&&pole_barrier[steps] != 1&& pole_barrier[steps] != 2){
                rows=1;
            }else{ // если Марио в первой строке, он подпрыгивает во вторую
                rows = 2;}
            idImg = document.getElementById('pole' + rows + '_' + steps);
            if(rows==2){ 
                getCoin();
            }
            idImg.src = "img/mario_running.gif";
            checkBlock();  
            break;
        case 'ArrowUp':
                idImg = document.getElementById('pole' + rows + '_' + steps);
                idImg.src = "img/spacer.gif";
                rows = 2;
                idImg = document.getElementById('pole' + rows + '_' + steps);
                getCoin();
                idImg.src = "img/mario_jumping.gif";
                break;

            case 'ArrowDown':
                if(n>1){
                    n--;
                    idImg=document.getElementById('coin'+n);
                    idImg.src="img/spacer.gif"
    
                    idImg = document.getElementById('pole1_' + (steps + 1));
                    idImg.src = "img/most.png";
                    pole_barrier[steps + 1] = 2;
                    //rows=2; из-за этого размножался Марио при прыжке на мостик, потому что rows=2 и spacer.gif записывался во вторую строку, соответственно в первой Марио не стирался
                }else{
                    info.innerHTML='У вас нет монеток для постройки моста!';
                    //alert('У вас нет монеток для постройки моста!')
                }
                    break;
  
                }
}
}
function checkBlock(){
    if(rows!=2){
        blockItem = pole_blocks[steps];
        switch (blockItem) {
            case 5: /* блок травы, при этом steps не равна нулю (а значит игрок стоит не на старте) – игра окончена*/
                if (steps != 0) { 
                    info.innerHTML="Победа! Вы прошли уровень!";
                    idImg = document.getElementById('pole' + rows + '_' + steps);
                    idImg.src = "img/spacer.gif";
                    rows = 1;
                    idImg = document.getElementById('pole' + rows + '_' + steps);
                    idImg.src = "img/mario_stop.gif";
                     }
                    //alert("Уровень пройден.") };
                break;
            case 4: // блок воды – игрок теряет жизнь
                idImg = document.getElementById('heart' + hearts);
                idImg.src = "img/heart_empty.png";
                hearts--;
                break;
            case 2: //блок листвы – возвращаемся на стартовую позицию
                idImg = document.getElementById('pole' + rows + '_' + steps);
                idImg.src = "img/spacer.gif";
                steps = 0;
                idImg = document.getElementById('pole' + rows + '_' + steps);
                idImg.src = "img/mario_running.gif";
                break;
            case 1: //блок-вопрос – заменяется рандомным блоком
                rndBlock = Math.floor(Math.random() * 5)
                idImg = document.getElementById('pole0_' + steps);
                idImg.src = blocks[rndBlock];
                pole_blocks[steps] = rndBlock;
                checkBlock();
           } 
    } 
}
var n=1; //номер ячейки верхнего ряда, где будут отображаются собранные монетки
var money=[ ];
//заполняем массив монеток изначально нулями
for (i = 1; i < 16; i++) {
    money[i] = 0; //0-пусто,1-монетка
}
for(i=1;i<6;i++){
    indCoin=Math.floor(Math.random()*15+1);
//ячейки от 1 до 16 (0 и 17 не занимаем)
    idImg=document.getElementById('pole2_'+indCoin);
    idImg.src="img/coin.gif";
    money[indCoin]=1;
}
function getCoin(){
    if(money[steps]==1){ 
//если в том месте, куда перемещаемся, монетка
        idImg1=document.getElementById('coin'+n);
        idImg1.src="img/bonus.png";
        n++;
money[steps]=0;
/*если монетку в этой клетке уже собрали, нельзя снова прыгнуть на то же (уже пустое) место и снова получить монетку*/
    }
}

document.addEventListener('keydown',mario_move)

c1.style.left=(document.documentElement.clientWidth-c1.width)+"px";
c1.style.top="150px";
c2.style.left=(document.documentElement.clientWidth-c2.width)+"px";
c2.style.top="300px";
interval1=setInterval(move_cloud1,30);//Большое облако
interval2=setInterval(move_cloud2,20)
var x1=document.documentElement.clientWidth-c1.width;
var x2=document.documentElement.clientWidth-c2.width
function move_cloud1(){
    if(x1+c1.width<0){x1=document.documentElement.clientWidth;}
    x1=x1-5;
    c1.style.left=x1+"px"
}
function move_cloud2(){
    if(x2+c2.width<0){x2=document.documentElement.clientWidth;}
    x2=x2-2;
    c2.style.left=x2+"px"
}
var t=60; 
function time_count(){
t--;
timing.innerHTML=t;
if(t==0){
    info.innerHTML="Игра окончена! Вы проиграли по времени!"
    //alert("Игра окончена! Вы проиграли по времени!");
    clearInterval(interval3);
    clearInterval(interval2);
    clearInterval(interval1);
    document.removeEventListener('keydown',mario_move);
    }
}
interval3=setInterval(time_count,1000);

