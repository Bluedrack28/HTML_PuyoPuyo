class Puyo {
    constructor(x,y){
        /*
        0:vert
        1:rouge
        2:jaune
        3:bleu
        */
        this.color = Math.floor(Math.random()*4);
        this.x = x;
        this.y = y;
        this.focus = false;
        this.fell = false;
        this.asFell = false;
        this.stop = false;
    }
    
}
class Game {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.table = new Array();
        for (var i = 0; i < x; i++) {
           this.table[i] = new Array();
        }
        this.pos = 0;
        this.sc = 0;
        this.score = 0;
        this.end = false;
    }
    getPuyo(x,y){
        return this.table[x][y];
    }
    newRound(){
        if(this.getPuyo(2,0) == null
        && this.getPuyo(3,0) == null
        ){
            this.pos = 0;
            let e1 = new Puyo(2,0);
            let e2 = new Puyo(3,0);
            e1.focus = true;
            e2.focus = true;
            this.addPuyo(e1);
            this.addPuyo(e2);
        }else{
            this.end = true;
        }
        
    }
    returnFocusPuyo(){
        let e1;
        let e2;
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                let e = this.table[j][i];
                if(e!=null){
                    if(e.focus == true && e1 == null){
                        e1 = e;
                    }else if(e.focus == true && e1 != null){
                        e2 = e;
                        return {
                            e1,
                            e2
                        }
                    }
                }
            }
            
        }
        return null;
    }
    addPuyo(puyo){
        this.table[puyo.x][puyo.y] = puyo;
    }
    removePuyo(x,y){
        this.table[x][y] = null;
    }
    updatePuyo(){
        for (let i = this.y; i >= 0; i--) {
            for (let j = 0; j < this.x; j++) {
                if(this.table[j][i] != null  && this.table[j][i].fell == false){
                    let e = this.table[j][i];
                    if(this.table[j][i+1] == null){
                        e.x = j;
                        e.y = i+1;
                        //verifie qu'il y a du vide au dessous
                        
                        if(e.y+1 >= game.y){
                            console.log('salut');
                            e.focus = false;
                            e.asFell = true;
                            e.fell = true;
                        }else if(this.table[j][i+2] == null){
                            e.asFell = false;
                        }
                        e.fell = true;
                        this.table[j][i+1] = e;
                        this.table[j][i] = null;
                    }else if(this.table[j][i+1] != null){
                    
                        e.focus = false;
                        e.asFell = true;
                    }
                }
            }
        }
        
    }
    isIn(x,y){
        if(x < 0 || y < 0 || x > this.x-1 || y > this.y-1) return false;
        return true;
    }
    resetAllPoyu(){
        for (let i = 0; i < this.y-1; i++) {
            for (let j = 0; j < this.x; j++) {
                if(this.table[j][i] != null){
                    this.table[j][i].fell = false;
                }
            }
        }
    }
    findPath(x,y,color,focus,path){
        if(focus == false){
            this.sc = 0;
            let verif = 0;
            let e = {
                x: x,
                y: y,
                color: color
            }
            path.push(this.getPuyo(e.x,e.y));
            while(true){
                verif = 0;
                
                if(this.isIn(e.x+1,e.y)
                && this.getPuyo(e.x+1,e.y) != null
                && this.getPuyo(e.x+1,e.y).color == color
                && this.getPuyo(e.x+1,e.y).focus == false
                && this.getPuyo(e.x+1,e.y).asFell == true
                && path.indexOf(this.getPuyo(e.x+1,e.y)) ==  -1
                ){
                    this.sc ++;
                    e = this.getPuyo(e.x+1,e.y);
                    path.concat(this.findPath(e.x,e.y,e.color,e.focus,path));
                    verif ++;
            
                }
                if(this.isIn(e.x,e.y+1)
                && this.getPuyo(e.x,e.y+1) != null
                && this.getPuyo(e.x,e.y+1).color == color
                && this.getPuyo(e.x,e.y+1).focus == false
                && this.getPuyo(e.x,e.y+1).asFell == true
                && path.indexOf(this.getPuyo(e.x,e.y+1)) == -1
                ){
                    this.sc ++;
                    e = this.getPuyo(e.x,e.y+1);
                    path.concat(this.findPath(e.x,e.y,e.color,e.focus,path));
                    verif ++;
                }
                if(this.isIn(e.x,e.y-1)
                &&this.getPuyo(e.x,e.y-1) != null
                && this.getPuyo(e.x,e.y-1).color == color
                && this.getPuyo(e.x,e.y-1).focus == false
                && this.getPuyo(e.x,e.y-1).asFell == true
                && path.indexOf(this.getPuyo(e.x,e.y-1)) == -1
                ){
                    this.sc ++;
                    e = this.getPuyo(e.x,e.y-1);
                    path.concat(this.findPath(e.x,e.y,e.color,e.focus,path));
                    verif ++;
                }
                if(this.isIn(e.x-1,e.y) 
                && this.getPuyo(e.x-1,e.y) != null
                && this.getPuyo(e.x-1,e.y).color == color
                && this.getPuyo(e.x-1,e.y).focus == false
                && path.indexOf(this.getPuyo(e.x-1,e.y)) == -1
                ){
                
                    this.sc ++;
                    e = this.getPuyo(e.x-1,e.y);
                    path.concat(this.findPath(e.x,e.y,e.color,e.focus,path));
                    verif ++;
                }
                if(verif == 0){
                    break;
                }
            }
            return path;
        }
        return [];
    }
    played(){
        for (let i = this.y; i >= 0; i--) {
            for (let j = 0; j < this.x; j++) {
                if(this.table[j][i] != null){
                    this.sc = 0;
                    let e = this.table[j][i];
                    let path = this.findPath(e.x,e.y,e.color,e.focus,[]);
                    if(path.length > 3){
                        this.score += path.length*30;
                        path.forEach(function(poyu) {
                            this.removePuyo(poyu.x,poyu.y);
                        }, this);
                    }
                    
                }
            }
        }
    }
    getScore(){
        return this.score;
    }
    
}