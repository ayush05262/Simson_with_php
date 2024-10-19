let gameseq = [];
let userseq = [];
let started = false;
let level = 0;
let btns = ["yellow", "red", "purple", "green"];
let h3 = document.querySelector("h3");


window.onload = function() {
    fetchHighScore();
};

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game started");
        started = true;
        levelup();
    }
});


function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}


function levelup() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randid = Math.floor(Math.random() * 4);
    let randcolor = btns[randid];
    gameseq.push(randcolor);
    let randbtn = document.querySelector(`.${randcolor}`);
    btnFlash(randbtn);
}


function check(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h3.innerHTML = `Game over! Your score was<br>${level}<br><br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        sendScoreToServer(level); 
        reset();
    }
}


function btnpress() {
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    check(userseq.length - 1);
}


let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}


function reset() {
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}


function sendScoreToServer(score) {
    if (score > 0) {
        fetch('save_score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'score': score
            })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}


function fetchHighScore() {
    fetch('fetch_high_score.php')
        .then(response => response.json())
        .then(data => {
            const highScoreDisplay = document.createElement('div');
            highScoreDisplay.innerHTML = `<h3>High Score: ${data.high_score}</h3>`;
            document.body.appendChild(highScoreDisplay);
        })
        .catch(error => {
            console.error('Error fetching high score:', error);
        });
}









// let gameseq = [];
// let userseq = [];
// let started = false;
// let level = 0;
// let btns = ["yellow", "red", "purple", "green"];
// let h3 = document.querySelector("h3");

// document.addEventListener("keypress", function() {
//     if (!started) {
//         console.log("game started");
//         started = true;
//         levelup();
//     }
// });

// function btnFlash(btn) {
//     btn.classList.add("flash");
//     setTimeout(function() {
//         btn.classList.remove("flash");
//     }, 250);
// }

// function levelup() {
//     userseq = [];
//     level++;
//     h3.innerText = `Level ${level}`;
//     let randid = Math.floor(Math.random() * 4);
//     console.log(randid);
//     let randcolor = btns[randid];
//     gameseq.push(randcolor);
//     console.log(gameseq);
//     console.log(randcolor);
//     let randbtn = document.querySelector(`.${randcolor}`);
//     btnFlash(randbtn);
// }

// function check(idx) {
//     console.log("current level", level);

//     if (userseq[idx] === gameseq[idx]) {
//         if (userseq.length === gameseq.length) {
//             setTimeout(levelup, 1000);
//         }
//     } else {
//         h3.innerHTML = `Game over! Your score was<br>${level}<br><br>Press any key to start`;
//         document.querySelector("body").style.backgroundColor="red";
//         setTimeout(function(){
//             document.querySelector("body").style.backgroundColor="white";
//         },200)
//         reset();
//     }
// }

// function btnpress() {
//     let btn = this;
//     btnFlash(btn);
//     let userColor = btn.getAttribute("id");
//     userseq.push(userColor);
//     check(userseq.length - 1);
// }

// let allbtns = document.querySelectorAll(".btn");
// for (let btn of allbtns) {
//     btn.addEventListener("click", btnpress);
// }

// function reset() {
//     started = false;
//     level = 0;
//     gameseq = [];
//     userseq = [];
// }
