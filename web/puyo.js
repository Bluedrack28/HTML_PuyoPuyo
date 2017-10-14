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
        this.stop = false;
    }
    
}
class Game {
    constructor(x,y){
        this.fallenPuyo = {
            firstPuyo : null,
            secondPuyo : null,
            x : null
        }
        this.x = x;
        this.y = y;
        this.table = new Array();
        for (var i = 0; i < x; i++) {
           this.table[i] = new Array();
        }
        this.pos = 0;
        this.sc = 0;
    }
    getPuyo(x,y){
        return this.table[x][y];
    }
    newRound(){
        this.pos = 0;
        let e1 = new Puyo(3,0);
        let e2 = new Puyo(4,0);
        e1.focus = true;
        e2.focus = true;
        this.addPuyo(e1);
        this.addPuyo(e2);
        //console.log(this.returnFocusPuyo());
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
                        e.fell = true;
                        if(e.y+1 >= game.y){
                            //console.log('salut')
                            e.focus = false;
                        }
                        
                        
                        this.table[j][i+1] = e;
                        this.table[j][i] = null;
                    }else if(this.table[j][i+1] != null){
                        //console.log('pute')
                        e.focus = false;
                    }
                }
            }
        }
        
    }
    isIn(x,y){
        if(x < 0 || y < 0 || x >= this.x || y >= this.y) return false;
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
    findPath(x,y,color,path){
        this.sc = 0;
        let verif = 0;
        //let path = [];
        let e = {
            x: x,
            y: y,
            color: color
        }
        while(true){
            verif = 0;
            if(this.isIn(e.x+1,e.y)
            && this.getPuyo(e.x+1,e.y) != null
            && this.getPuyo(e.x+1,e.y).color == color
            && this.getPuyo(e.x+1,e.y).focus == false
            && path.indexOf(this.getPuyo(e.x+1,e.y)) ==  -1
            ){
                this.sc ++;
                e = this.getPuyo(e.x+1,e.y)
                
                path.push(e);
                path.concat(this.findPath(e.x,e.y,e.color,path));
                verif ++;
        
            }
            if(this.isIn(e.x,e.y+1)
            && this.getPuyo(e.x,e.y+1) != null
            && this.getPuyo(e.x,e.y+1).color == color 
            && this.getPuyo(e.x,e.y+1).focus == false
            && path.indexOf(this.getPuyo(e.x,e.y+1)) == -1
            ){
                this.sc ++;
                e = this.getPuyo(e.x,e.y+1)
                path.push(e);
                path.concat(this.findPath(e.x,e.y,e.color,path));
                verif ++;
            }
            if(this.isIn(e.x,e.y-1)
            &&this.getPuyo(e.x,e.y-1) != null
            && this.getPuyo(e.x,e.y-1).color == color
            && this.getPuyo(e.x,e.y-1).focus == false
            && path.indexOf(this.getPuyo(e.x,e.y-1)) == -1
            ){
                this.sc ++;
                e = this.getPuyo(e.x,e.y-1)
                path.push(e);
                path.concat(this.findPath(e.x,e.y,e.color,path));
                verif ++;
            }
            if(this.isIn(e.x-1,e.y) 
            && this.getPuyo(e.x-1,e.y) != null
            && this.getPuyo(e.x-1,e.y).color == color
            && this.getPuyo(e.x-1,e.y).focus == false
            && path.indexOf(this.getPuyo(e.x-1,e.y)) == -1
            ){
            
                this.sc ++;
                e = this.getPuyo(e.x-1,e.y)
                path.push(e);
                path.concat(this.findPath(e.x,e.y,e.color,path));
                verif ++;
            }
            if(verif == 0){
                break;
            }
        }
        
        return path;
    }
    played(){
        for (let i = this.y; i >= 0; i--) {
            for (let j = 0; j < this.x; j++) {
                if(this.table[j][i] != null){
                    this.sc = 0;
                    let e = this.table[j][i];
                    let path = this.findPath(e.x,e.y,e.color,[]);
                    //console.log(path)
                    if(path.length > 3){
                        //console.log(path)
                        score += path.length*30;
                        labelScore.innerHTML = "Ton score: " + score
                        path.forEach(function(poyu) {
                            
                            this.removePuyo(poyu.x,poyu.y);
                            //this.updatePuyo();
                        }, this);
                    }
                    
                }
            }
        }
    }
    
}