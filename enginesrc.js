//  ______ _            _                         _______             _                ______                                 
// (_____ (_)          | |     /\         _      (_______)           (_)              (____  \                                
//  _____) ) _   _ ____| |    /  \   ____| |_     _____   ____   ____ _ ____   ____    ____)  )_   _                          
// |  ____/ ( \ / ) _  ) |   / /\ \ / ___)  _)   |  ___) |  _ \ / _  | |  _ \ / _  )  |  __  (| | | |                         
// | |    | |) X ( (/ /| |  | |__| | |   | |__   | |_____| | | ( ( | | | | | ( (/ /   | |__)  ) |_| |                         
// |_|    |_(_/ \_)____)_|  |______|_|    \___)  |_______)_| |_|\_|| |_|_| |_|\____)  |______/ \__  |                         
//                                                             (_____|                        (____/                          
//  _     _            _                                     ______                         _                                 
// | |   | |          | |                                   |  ___ \                       | |                                
// | |__ | | ___ _   _| | _   ____ ____  ____   ____  ___   | | _ | | ____ ____  _   _  ___| | _  _   _  ____ ____            
// |  __)| |/ _ \ | | | || \ / _  |  _ \|  _ \ / _  )/___)  | || || |/ _  |  _ \| | | |/___) || \| | | |/ _  |  _ \           
// | |   | | |_| \ V /| | | ( ( | | | | | | | ( (/ /|___ |  | || || ( ( | | | | | |_| |___ | | | | |_| ( ( | | | | |          
// |_|   |_|\___/ \_/ |_| |_|\_||_|_| |_|_| |_|\____|___/   |_||_||_|\_||_|_| |_|\____(___/|_| |_|\__  |\_||_|_| |_|          
//                                                                                               (____/                       
//   ______    _       ______   __ _______        _    __________ _______     ______                                          
//  / _____)  | |     (_____ \ /  (_______)      | |  (_______/  (_______)   / _____)                       _                 
// | /         \ \      ____) )_/ |     _       / /      ____/_/ |     _    | /      ___  ____  ____  _   _| |_  ____  ____   
// | |          \ \    /_____/  | |    / )     / /      (___ \ | |    / )   | |     / _ \|    \|  _ \| | | |  _)/ _  )/ ___)  
// | \_____ _____) )   _______  | |   / /     / /      _____) )| |   / /    | \____| |_| | | | | | | | |_| | |_( (/ /| |      
//  \______|______/   (_______) |_|  (_/     |_|      (______/ |_|  (_/      \______)___/|_|_|_| ||_/ \____|\___)____)_|                                                                                               |_|                            
//   ______                  _     _                                                                                          
//  / _____)                | |   (_)                                                                                         
// | /  ___  ____ ____ ____ | | _  _  ____  ___                                                                               
// | | (___)/ ___) _  |  _ \| || \| |/ ___)/___)                                                                              
// | \____/| |  ( ( | | | | | | | | ( (___|___ |                                                                              
//  \_____/|_|   \_||_| ||_/|_| |_|_|\____|___/                                                                               
//                    |_|                                                                                                   


function intdiv(a,b){
    if(b==0){return 0;}
    return (a-a%b)/b;
}



// //        [[1,0,1],[0,1,0],[0,0,1]], [82, 37, 1] [95, 23, 1] [102, 44, 1]
// [[1,1],[2,2]],[[1,2],[3,4]]
function matrixMult(m1,m2){
    // console.log(m1,m2);
    let out = []
    for(let i = 0; i < m2.length; ++i){
        let v = [];
        for(let j = 0; j < m1.length; ++j){
            let tmp = 0;
            for(let z = 0; z < m1[0].length; ++z){
                tmp += m1[j][z]*m2[i][z];
            }
            v.push(tmp);
        }
        out.push(v);
    }
    return out;
}

function homonormalize(vec){
    for(let i = 0; i < vec.length; ++i){
        vec[i][0]=intdiv(vec[i][0],vec[i][2]);
        vec[i][1]=intdiv(vec[i][1],vec[i][2]);
    }
    return vec;
}

class Frame{
    constructor(cellsize, pad, windowHeight, windowWidth){
        this.colors=[50,200]
        this.pad = pad;
        this.cellSize = cellsize;
        this.windowHeight=windowHeight;
        this.windowWidth=windowWidth;
        this.cellRows = intdiv(windowHeight-2*pad,this.cellSize);
        this.cellCols = intdiv(windowWidth-2*pad,this.cellSize);
        this.buffer = new Array(this.cellRows)
        this.prevpix=[];
        for(let i = 0; i < this.cellRows; ++i){ this.buffer[i]=new Array(this.cellCols);}
        this.clearbuffer()
        textSize(32);
        fill(255, 255, 255);
        text('Use ENTER key to connect the polygon.', intdiv(windowWidth-2*pad,3),30);
        fill(255, 177, 255);
        text('\n Press key and hold for effect.', intdiv(windowWidth-2*pad,2.5),30);
    }

    checkpixels(vec){
        for(let i = 0; i < vec.length; ++i){
            if(!(vec[i][0]>=0 &&  vec[i][0]<this.cellCols && vec[i][1]>=0 && vec[i][1]<this.cellRows)){
                return false
            }
        }
        return true;
    }

    clearbuffer(){
        for(let row = 0; row < this.cellRows; ++row){
            for(let col = 0; col < this.cellCols; ++col){
                this.buffer[row][col]=0;
            }
        }
    }

    drawpoints(){
        this.clearbuffer();
        for(let i = 0; i < this.prevpix.length-1; ++i){
            this.drawpixel(this.prevpix[i][0],this.prevpix[i][1]);
            this.drawpixel(this.prevpix[i+1][0],this.prevpix[i+1][1]);
            this.drawline(this.prevpix[i][0],this.prevpix[i][1], this.prevpix[i+1][0],this.prevpix[i+1][1]);
        }
        this.drawline(this.prevpix[this.prevpix.length-1][0],this.prevpix[this.prevpix.length-1][1], this.prevpix[0][0],this.prevpix[0][1]);
    }


    homogenize(){
        for(let i = 0; i < this.prevpix.length; ++i){
            this.prevpix[i].push(1);
        }
    }

    getcentroid(){
        let centroid = [0,0];
        for(let i = 0; i < this.prevpix.length; ++i){
            centroid[0]+=this.prevpix[i][0];
            centroid[1]+=this.prevpix[i][1];
        }
        centroid[0]=intdiv(centroid[0],this.prevpix.length);
        centroid[1]=intdiv(centroid[1],this.prevpix.length);
        return centroid;
    }

    rotateClockwise(t){
        
        let centroid = this.getcentroid();
        let x = centroid[0]
        let y = centroid[1]
        console.log(x,y);
        let out = matrixMult([[Math.cos(t),-Math.sin(t),x-x*Math.cos(t)+y*Math.sin(t)],[Math.sin(t),Math.cos(t),y-y*Math.cos(t)-x*Math.sin(t)],[0,0,1]],this.prevpix);
        out = homonormalize(out);
        if(this.checkpixels(out)){
            this.prevpix=out;
        }else{
            alert("You are hitting the wall with you operation, be careful.")
        }
        console.log(out);
    
    }

    rotateCounterClockwise(t){
        
        let centroid = this.getcentroid();
        let x = centroid[0]
        let y = centroid[1]
        console.log(x,y);
        let out = matrixMult([[Math.cos(t),Math.sin(t),x-x*Math.cos(t)-y*Math.sin(t)],[-Math.sin(t),Math.cos(t),y+y*Math.cos(t)+x*Math.sin(t)],[0,0,1]],this.prevpix);
        out = homonormalize(out);
        if(this.checkpixels(out)){
            this.prevpix=out;
        }else{
            alert("You are hitting the wall with you operation, be careful.")
        }
        console.log(out);
    
    }

    scale(s){
        
        let centroid = this.getcentroid();
        let x = centroid[0]
        let y = centroid[1]
        console.log(x,y);
        let out = matrixMult([[s,0,x*(1-s)],[0,s,y*(1-s)],[0,0,1]],this.prevpix);
        out = homonormalize(out);
        if(this.checkpixels(out)){
            this.prevpix=out;
        }else{
            alert("You are hitting the wall with you operation, be careful.")
        }
        console.log(out);
    
    }



    translateRight(){
        
        let out = matrixMult([[1,0,1],[0,1,0],[0,0,1]],this.prevpix);
        out = homonormalize(out);
        if(this.checkpixels(out)){
            this.prevpix=out;
        }else{
            alert("You are hitting the wall with you operation, be careful.")
        }
    
    }

    translateLeft(){
        
        let out = matrixMult([[1,0,-1],[0,1,0],[0,0,1]],this.prevpix);
        out = homonormalize(out);
        if(this.checkpixels(out)){
            this.prevpix=out;
        }else{
            alert("You are hitting the wall with you operation, be careful.")
        }
    
    }

    translateDown(){
        
        let out = matrixMult([[1,0,0],[0,1,1],[0,0,1]],this.prevpix);
        out = homonormalize(out);
        if(this.checkpixels(out)){
            this.prevpix=out;
        }else{
            alert("You are hitting the wall with you operation, be careful.")
        }
    
    }

    translateUp(){
        
        let out = matrixMult([[1,0,0],[0,1,-1],[0,0,1]],this.prevpix);
        out = homonormalize(out);
        if(this.checkpixels(out)){
            this.prevpix=out;
        }else{
            alert("You are hitting the wall with you operation, be careful.")
        }
    
    }

    drawbuffer(){
        for(let row = 0; row < this.cellRows; ++row){
            for(let col = 0; col < this.cellCols; ++col){
                fill(this.colors[this.buffer[row][col]])
                rect(this.pad+col*this.cellSize, this.pad+row*this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    convertPixel(x,y){
        return [intdiv(x-this.pad, this.cellSize),intdiv(y-this.pad, this.cellSize)];
    }

    transformPixel(t1,t2,t3, x, y){
        if(t1){x=-x;}
        if(t2){y=-y;}
        if(t3){let tmp=x; x=y; y=tmp;}
        return [x,y];
    }

    transformPixelBack(t1,t2,t3, x, y){
        if(t3){let tmp=x; x=y; y=tmp;}
        if(t2){y=-y;}
        if(t1){x=-x;}
        return [x,y];
    }

    addpoint(x,y){
        this.prevpix.push([x, y]);
    }
    
    drawpixel(x,y){
        this.buffer[y][x]=1;
    }


    drawline(x1,y1,x2,y2){
        let t1=false;
        let t2=false;
        let t3=false;
        if(x2<x1){t1=true;}
        if(y2<y1){t2=true;}
        if(Math.abs(y2-y1)>Math.abs(x2-x1)){t3=true;}
        [x1,y1] = this.transformPixel(t1,t2,t3,x1,y1);
        [x2,y2] = this.transformPixel(t1,t2,t3,x2,y2);
        let dx = x2-x1;
        let dy = y2-y1;
        let d = 2*dy-dx;
        let y = y1;
        // console.log(x1,y1,x2,y2,dy,dx, t1,t2, t3);
        for(let i = x1+1; i<x2; ++i){
            if(d<=0){
                d = d+2*dy;
                let trans = this.transformPixelBack(t1,t2,t3,i,y);
                this.buffer[trans[1]][trans[0]]=1;
            }else{
                d=d+2*dy-2*dx;
                y=y+1;
                let trans = this.transformPixelBack(t1,t2,t3,i,y);
                this.buffer[trans[1]][trans[0]]=1;
            }
        }
    }

}

let frame;
let draw_stage = true;
function setup() {

    createCanvas(windowWidth+10, windowHeight+10);
    background(0,0,0);
    frame = new Frame(10, 100, windowHeight,windowWidth);
    frame.drawbuffer();
}

function draw() {
    if(keyIsDown(RIGHT_ARROW)){
        if(draw_stage===false){
            frame.translateRight();
            frame.drawpoints();
        }
        frame.drawbuffer();
    }

    if(keyIsDown(LEFT_ARROW)){
        if(draw_stage===false){
            frame.translateLeft();
            frame.drawpoints();
        }
        frame.drawbuffer();
    }

    if(keyIsDown(UP_ARROW)){
        if(draw_stage===false){
            frame.translateUp();
            frame.drawpoints();
        }
        frame.drawbuffer();
    }

    if(keyIsDown(DOWN_ARROW)){
        if(draw_stage===false){
            frame.translateDown();
            frame.drawpoints();
        }
        frame.drawbuffer();
    }

    if(keyIsDown(82)){ //R
        if(draw_stage===false){
            frame.rotateCounterClockwise(Math.PI/2);
            frame.drawpoints();
        }
        frame.drawbuffer();
    }

    if(keyIsDown(84)){ //T
        if(draw_stage===false){
            frame.rotateClockwise(Math.PI/2);
            frame.drawpoints();
        }
        frame.drawbuffer();
    }


    if(keyIsDown(83)){ //S
        if(draw_stage===false){
            frame.scale(1.2);
            frame.drawpoints();
        }
        frame.drawbuffer();
    }

    if(keyIsDown(68)){ //S
        if(draw_stage===false){
            frame.scale(1/1.2);
            frame.drawpoints();
        }
        frame.drawbuffer();
    }
    
}

// TODO: implement resize
// function windowResized() {
//     resizeCanvas(windowWidth+10, windowHeight+10); 
// }

function mouseClicked(event) {
    if (draw_stage === true){
        [x,y]=frame.convertPixel(mouseX, mouseY)
        if(frame.prevpix.length>0){
            frame.drawpixel(x, y);
            frame.addpoint(x, y);
            frame.drawline(frame.prevpix[frame.prevpix.length-2][0],frame.prevpix[frame.prevpix.length-2][1],x, y);
        }else{
            frame.drawpixel(x, y);
            frame.addpoint(x, y);
        }
        frame.drawbuffer();
    }
    return false;
}

function keyPressed() {
    if (draw_stage===true && keyCode === ENTER && frame.prevpix.length>1  ) {
        draw_stage = false
        frame.clearbuffer();
        frame.drawpoints();
        frame.homogenize();
    }



    frame.drawbuffer();
}