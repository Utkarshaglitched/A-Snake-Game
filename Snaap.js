let sar = document.getElementById("Head");
let khana = document.getElementById("food");
let Ground = document.getElementById("board");
let BodyPart = document.getElementsByClassName("SnakeBody");
let AfterPause=document.getElementById('Pause');
let EscpScore=document.getElementById('Score');
let ScoreCount=document.getElementById("Count");
let ibutton=document.getElementById("ibutton");
let Ins=document.getElementById("instruction");
let HeadDirection = 0;
let Speed = 5;
let TopCntr = 240;
let LeftCntr = 200;
let takkar = false;
let StartGame = false;
let ResetGame = false;
let TopFood = 0;
let LeftFood = 0;
let EatCntr = 0;
let TheDataHistory = [];
const colors = [
    "#6B8E23", // olive drab
    "#556B2F", // dark olive green
    "#8B4513", // saddle brown
    "#A0522D", // sienna
    "#228B22", // forest green
    "#696969", // dim gray
    "#708090", // slate gray
    "#2E8B57", // sea green
    "#8FBC8F", // dark sea green
    "#9ACD32", // yellowgreen
    "#5C4033"  // dark brown
  ];
  
function AddBody() {
    let RandIndex=Math.floor(Math.random()*colors.length);
    let Body = document.createElement("div");
    Body.className = "SnakeBody";
    Body.id = `SnakeBody${EatCntr}`;
    Body.style.background = `${colors[RandIndex]}`;
    Body.style.display = "inline-block";
    Ground.appendChild(Body);
    ScoreCount.innerText=`${EatCntr*10}`;
}

function DisplayFood() {
    TopFood = Math.floor(Math.random() * (440 / Speed)) * 5;
    LeftFood = Math.floor(Math.random() * (440 / Speed)) * 5;
    khana.style.display = "inline-block";
    khana.style.top = `${TopFood}px`;
    khana.style.left = `${LeftFood}px`;
}
DisplayFood();
const movement = setInterval(() => {
    if (StartGame) {
        if (takkar) {
            clearInterval(movement);
            alert(`OOOOOOPPSSSSS.....Takkar Hogya\nScore:${EatCntr*10}`)
            window.location.reload();
        }
        else {
            HeadDirection = (HeadDirection + 360) % 360;

            if (HeadDirection === 0) {
                TopCntr -= Speed;

                Array.from(BodyPart).forEach((ele, ind) => {
                    let BhootKaal = TheDataHistory[(ind + 1) * 5];
                    if (BhootKaal) {
                        ele.style.top = `${BhootKaal.Top}px`;
                        ele.style.left = `${BhootKaal.Left}px`;
                        ele.style.transform = `rotate(${BhootKaal.HeadPos}deg)`;
                    }
                })
            }
            else if ((HeadDirection === 90) || (HeadDirection === -270)) {
                LeftCntr += Speed;
                Array.from(BodyPart).forEach((ele, ind) => {
                    let BhootKaal = TheDataHistory[(ind + 1) * 5];
                    if (BhootKaal) {
                        ele.style.top = `${BhootKaal.Top}px`;
                        ele.style.left = `${BhootKaal.Left}px`;
                        ele.style.transform = `rotate(${BhootKaal.HeadPos}deg)`;
                    }
                })

            }

            else if ((HeadDirection === 180) || (HeadDirection === -180)) {
                TopCntr += Speed;
                Array.from(BodyPart).forEach((ele, ind) => {
                    let BhootKaal = TheDataHistory[(ind + 1) * 5];
                    if (BhootKaal) {
                        ele.style.top = `${BhootKaal.Top}px`;
                        ele.style.left = `${BhootKaal.Left}px`;
                        ele.style.transform = `rotate(${BhootKaal.HeadPos}deg)`;
                    }
                })

            }

            else if ((HeadDirection === 270) || (HeadDirection === -90)) {
                LeftCntr -= Speed;
                Array.from(BodyPart).forEach((ele, ind) => {
                    let BhootKaal = TheDataHistory[(ind + 1) * 5];
                    if (BhootKaal) {
                        ele.style.top = `${BhootKaal.Top}px`;
                        ele.style.left = `${BhootKaal.Left}px`;
                        ele.style.transform = `rotate(${BhootKaal.HeadPos}deg)`;
                    }
                })
            }
        }
        TheDataHistory.unshift(
            {
                Top: TopCntr,
                Left: LeftCntr,
                HeadPos: HeadDirection
            });
        if (TheDataHistory.length > 500) {
            TheDataHistory.pop();
        }

        sar.style.top = `${TopCntr}px`;
        sar.style.left = `${LeftCntr}px`;
        sar.style.transform = `rotate(${HeadDirection}deg)`;

        if ((TopCntr < 0) || (TopCntr > 445) || (LeftCntr < 0) || (LeftCntr > 445)) {
            takkar = true;
        }

        if (TopCntr >= (TopFood - 10) && (TopCntr <= (TopFood + 10)) && LeftCntr >= (LeftFood - 10) && (LeftCntr <= (LeftFood + 10))) {
            EatCntr++;
            DisplayFood();
            AddBody();
        }
    }
    else {
        sar.style.top = `${TopCntr}px`;
        sar.style.left = `${LeftCntr}px`;
    }
}, 50);

document.addEventListener('keydown', (eve) => {

    if (eve.key === " ") {
        AfterPause.style.display="none";
        StartGame = true;
        return;
    }

    if (eve.key === "Escape") {
        StartGame = false;
        AfterPause.style.display="inline-block";
        EscpScore.innerText=`Score:${EatCntr*10}`;
        return;
    }
    if (StartGame) {

        HeadDirection = (HeadDirection + 360) % 360;

        if (HeadDirection === 0) {
            if (eve.key === "ArrowRight") {
                HeadDirection += 90;
            }
            else if (eve.key === "ArrowLeft") {
                HeadDirection -= 90;
            }
        }

        if ((HeadDirection === 90)) {
            if (eve.key === "ArrowDown") {
                HeadDirection += 90;
            }
            else if (eve.key === "ArrowUp") {
                HeadDirection -= 90;
            }
        }

        if ((HeadDirection === 180)) {
            if (eve.key === "ArrowLeft") {
                HeadDirection += 90;
            }
            else if (eve.key === "ArrowRight") {
                HeadDirection -= 90;
            }
        }

        if ((HeadDirection === 270)) {
            if (eve.key === "ArrowUp") {
                HeadDirection += 90;
            }
            else if (eve.key === "ArrowDown") {
                HeadDirection -= 90;
            }
        }
    }
})


let ShowIns=false;
ibutton.addEventListener('click',()=>{
    if(!ShowIns){
        Ins.style.display="grid";
        ShowIns=true;
    }
    else{
        Ins.style.display="none";
        ShowIns=false;
    }
})