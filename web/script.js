const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let labelScore = document.getElementById('score');
let score = 0;
labelScore.innerHTML = 'Ton score: ' + 0
let tableChar = document.getElementById('charactere');

let puyo = new Puyo();
let game = new Game(6,12);

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.table.forEach(function(yTable) {
        yTable.forEach(function(e) {
            if(e != null){
                switch (e.color) {
                    case 0:
                        ctx.fillStyle = '#36f940'
                        break;
                    case 1:
                        ctx.fillStyle = '#ff3f3f'
                        break;
                    case 2:
                        ctx.fillStyle = '#e7f73d'
                        break;
                    case 3:
                        ctx.fillStyle = '#4286f4'
                        break;
                }
                ctx.fillRect(e.x*40,e.y*40,40,40);
            }
        }, this);
    }, this);
}

let i = 0;
function update(){
    if(i > 1){
        game.resetAllPoyu()
        game.updatePuyo();
        game.played();
        if(game.returnFocusPuyo() == null){
            game.newRound();
        }
        i = 0;
    }else{
        i += 0.08;
    }
}
function loop(){
    draw();
    update();
    requestAnimationFrame(loop);
}
let puyos;
document.addEventListener('keypress',(e) =>{
    switch (e.key) {
        case 'a':
            puyos = game.returnFocusPuyo();
            
            if(puyos != null){
                if(puyos.e1.x > 0 
                    && puyos.e2.x > 0
                    && game.getPuyo(puyos.e1.x-1,puyos.e1.y) == null
                ){
                    game.table[puyos.e1.x][puyos.e1.y] = null;
                    game.table[puyos.e2.x][puyos.e2.y] = null;
                    puyos.e1.x -= 1;
                    puyos.e2.x -= 1;

                    game.addPuyo(puyos.e1);
                    game.addPuyo(puyos.e2);
                }
            }
            break;
        case 'd':
            puyos = game.returnFocusPuyo();
        
            if(puyos != null ){
                if(puyos.e1.x+1 < game.x
                    && puyos.e2.x+1 < game.x
                    && game.getPuyo(puyos.e2.x+1,puyos.e2.y) == null
                ){
                    game.table[puyos.e1.x][puyos.e1.y] = null;
                    game.table[puyos.e2.x][puyos.e2.y] = null;
                    puyos.e1.x += 1;
                    puyos.e2.x += 1;
    
                    game.addPuyo(puyos.e1);
                    game.addPuyo(puyos.e2);
                }
            }
        break;
        case 's':
            i += 0.5;
        break;
        case 'g':
            puyos = game.returnFocusPuyo();
            game.pos += 1;
            game.pos = game.pos % 4;
            if(puyos != null){
                switch (game.pos) {
                    case 0:
                        if(game.isIn(puyos.e2.x-1,puyos.e2.y-1)
                        && game.getPuyo(puyos.e2.x-1,puyos.e2.y-1) == null
                        ){
                            game.table[puyos.e2.x][puyos.e2.y] = null;
                            puyos.e2.x -= 1;
                            puyos.e2.y -= 1;
                            //puyos.e2.focus = true;
                            game.addPuyo(puyos.e2);
                        }else{
                            game.pos -= 1;
                        }
                        break;
                    case 1:
                        if(game.isIn(puyos.e1.x+1,puyos.e1.y-1)
                        && game.getPuyo(puyos.e1.x+1,puyos.e1.y-1) == null
                        ){
                            game.table[puyos.e1.x][puyos.e1.y] = null;
                            puyos.e1.x += 1;
                            puyos.e1.y -= 1;
                            game.addPuyo(puyos.e1);
                        }else{
                            game.pos -= 1;
                        }
                        break;
                    case 2:
                        if(game.isIn(puyos.e1.x+1,puyos.e1.y+1)
                        && game.getPuyo(puyos.e1.x+1,puyos.e1.y+1) == null
                        ){
                            game.table[puyos.e1.x][puyos.e1.y] = null;
                            puyos.e1.x += 1;
                            puyos.e1.y += 1;
                            game.addPuyo(puyos.e1);
                        }else{
                            game.pos -= 1;
                        }
                        break;
                    case 3:
                        if(game.isIn(puyos.e2.x-1,puyos.e2.y+1)
                        && game.getPuyo(puyos.e2.x-1,puyos.e2.y+1) == null
                        ){
                            game.table[puyos.e2.x][puyos.e2.y] = null;
                            puyos.e2.x -= 1;
                            puyos.e2.y += 1;
                            game.addPuyo(puyos.e2);
                        }else{
                            game.pos -= 1;
                        }
                        break;
            }
            
            }
        break;
        case 'h':
            puyos = game.returnFocusPuyo();
            game.pos -= 1;
            if(game.pos == -1) game.pos = 3;
            if(puyos != null){
                switch (game.pos) {
                    case 0:
                        if(game.isIn(puyos.e1.x-1,puyos.e1.y+1)
                        && game.getPuyo(puyos.e1.x-1,puyos.e1.y+1) == null
                        ){
                            game.table[puyos.e1.x][puyos.e1.y] = null;
                            puyos.e1.x -= 1;
                            puyos.e1.y += 1;
                            //puyos.e2.focus = true;
                            game.addPuyo(puyos.e1);
                        }else{
                            game.pos -= 1;
                        }
                        break;
                    case 1:
                        if(game.isIn(puyos.e2.x-1,puyos.e2.y-1)
                        && game.getPuyo(puyos.e2.x-1,puyos.e2.y-1) == null
                        ){
                            game.table[puyos.e2.x][puyos.e2.y] = null;
                            puyos.e2.x -= 1;
                            puyos.e2.y -= 1;
                            game.addPuyo(puyos.e2);
                        }else{
                            game.pos -= 1;
                        }
                        break;
                    case 2:
                        if(game.isIn(puyos.e2.x+1,puyos.e2.y-1
                        && game.getPuyo(puyos.e2.x+1,puyos.e2.y-1) == null
                        )){
                            game.table[puyos.e2.x][puyos.e2.y] = null;
                            puyos.e2.x += 1;
                            puyos.e2.y -= 1;
                            game.addPuyo(puyos.e2);
                        }else{
                            game.pos -= 1;
                        }
                        break;
                    case 3:
                        if(game.isIn(puyos.e1.x+1,puyos.e1.y+1)
                        && game.getPuyo(puyos.e1.x+1,puyos.e1.y+1) == null
                        ){
                            game.table[puyos.e1.x][puyos.e1.y] = null;
                            puyos.e1.x += 1;
                            puyos.e1.y += 1;
                            game.addPuyo(puyos.e1);
                        }else{
                            game.pos -= 1;
                        }
                        break;
                }
            
            }
        
        break;
        case ' ':
            game.newRound();
        break;
        default:
            break;
    }
});


window.requestAnimationFrame(loop);

game.newRound();