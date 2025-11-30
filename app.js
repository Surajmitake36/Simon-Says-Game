let gameseq=[];
let userseq=[];

let btn = ["salmon" , "aquamarine", "greenyellow", "skyblue"]

let started = false;
let level =0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("#score");
let lvl = document.querySelector("#lvl");
let body = document.querySelector("body");
let sound = document.querySelector("#sound");
let score = 0;
let Highest_score = 0;

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("game started");
        started =true;

        levelup();

    }
    
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash")
    }, 250);
}

function levelup(){
    userseq=[];
    level++;
    h2.innerHTML= `level ${level} </br> Your Score ${calculateScore(level)}`;

    let rdmidx = Math.floor(Math.random()*4);
    let rdmcolor = btn[rdmidx];
    let random = document.querySelector(`.${rdmcolor}`);
    btnflash(random);
    gameseq.push(rdmcolor);
}

function checkans(idx){


    if(userseq[idx]==gameseq[idx]){
        console.log("same value");
        if(userseq.length == gameseq.length){
            h2.innerHTML= `Level ${level} </br>  Your Score ${calculateScore(level)}`;
            setTimeout(levelup, 1000);
            
        }

    }
    else{
        sound.play();
        over_warn();
        h2.innerHTML = `Game Over! Press any key to start again.</br> Your Score is ${calculateScore(level)}`;
        highest();
        h3.innerText = `Highest Score = ${Highest_score}`;
        lvl.innerText = `Highest Level Completed = ${level-1}`;
        reset();

    }
}

function btnpress(){
    let btn = this;
    userflash(btn);

    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkans(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(let btn of allbtns){
    btn.addEventListener("click", btnpress);
}

function calculateScore(level) {
    if (level <= 1) {
        return 0;
    }
    else{
        score = level * (level + 1) / 2;
    }
    return score;
}

function reset(){
    started = false;
    level=0;
    gameseq=[];
}

function highest(){
    if(score>Highest_score){
        Highest_score = score;
    }
    return Highest_score;
}

function over_warn(){
    body.classList.add("game_over");
    setTimeout(function(){
        body.classList.remove("game_over");
    }, 150);
}
