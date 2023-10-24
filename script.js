let area = document.getElementById('area')
let cells = document.getElementsByClassName('cell')
let whoWins = document.getElementById('whoWins')
let currentPlayer = document.getElementById('currentPl')
let audio = document.getElementById('bell')

let roundHistory = []

let player = 'X'
let ai = 'O'

let stat = {
    'X':0,
    'O':0,
    'D':0
}

let winCombination = [
[1,2,3],
[4,5,6],
[7,8,9],
[1,4,7],
[2,5,8],
[3,6,9],
[1,5,9],
[3,5,7],
]

for(let i = 1; i<=9;i++){
    area.innerHTML += `<div class="cell" pos = "${i}"></div>`
}

for(let i = 0; i < cells.length;i++){
    console.log(cells[i])
    cells[i].addEventListener("click",cellOnClick)

}

function cellOnClick(){
    let data = []
    if(!this.innerHTML){
        this.innerHTML = player
    }else{
        alert('Cells is full !')
    }
    for(let i in cells){
        if(cells[i].innerHTML==player){
            data.push(parseInt(cells[i].getAttribute('pos')))
        }
    }
    if(checkWinner(data)){
        stat[player] +=1
        whoWins.innerHTML = 'Won :' + [player] 
        roundHistory.push(whoWins.innerHTML)
        document.getElementById("roundHistory").innerHTML+=`Won ${player},</br>`
        refresh()
    }else{
        let draw = true;
        for(let i in cells){
            if(cells[i].innerHTML=="")
            draw = false
        }
        if(draw){
            stat.D +=1
            whoWins.innerHTML= "No one won" 
            roundHistory.push(whoWins.innerHTML)
        document.getElementById("roundHistory").innerHTML+=`No one won,</br>`
        refresh()
        
        }
    }
    player = player==="X"?"O":"X"
currentPlayer.innerHTML = player
audio.play()
} 

function checkWinner(data){
for (let i in winCombination){
    let win = true
    for(let j in winCombination[i]){
        let id = winCombination[i][j]
        let ind = data.indexOf(id)
        if(ind == -1){
            win = false
        }
    }
    if(win)return true
}
return false
}

function refresh(){
    for(let i =0; i<cells.length;i++){
        cells[i].innerHTML = ""
    }
    updateState()
}


function updateState(){
    document.getElementById("sX").innerHTML = stat.X
    document.getElementById("sO").innerHTML = stat.O
    document.getElementById("sD").innerHTML = stat.D
}