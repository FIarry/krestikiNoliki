let currentPlr = 'X'
let gameEnd = false
let board = [ 
["", "", "", "", "",] ,
["", "", "", "", "",] ,
["", "", "", "", "",] ,
["", "", "", "", "",] ,
["", "", "", "", "",] ,
]
let blueWin = 0
let redWin = 0

const btnCont = document.querySelector('.btnContainer')
const btnAgain = document.getElementById('playAgain')
const btnRestart = document.getElementById('restart')

let mode = 'vs'
let botPlr = "O"

const slct = document.querySelector('.selection')
const bot = document.getElementById('bot')
const vs = document.getElementById('vs')

const moveSFX = document.getElementById('move')
const winSFX = document.getElementById('win')

for (let r = 0; r < 5; r++) {
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell${r}${i}`)
        cell.classList.add(`XCursor`)
    }
}

bot.addEventListener('click', (e) => {
    mode = 'bot'
    slct.classList.add("hidden")
    document.getElementById("gameBoard").classList.remove('hidden')
})

vs.addEventListener('click', (e) => {
    mode = 'vs'
    slct.classList.add("hidden")
    document.getElementById("gameBoard").classList.remove('hidden')
})


function cellClicked(r,i) {
    if (!gameEnd) {
        if (board[r][i] == '' || board[r][i] == undefined) {
            moveSFX.play()
            const cell = document.getElementById(`cell${r}${i}`)
            cell.textContent = currentPlr
            cell.setAttribute('data-value', currentPlr)
            board[r][i] = currentPlr
            if (checkWinner(currentPlr, r, i)) {
                winSFX.play()
                document.getElementById('message').textContent = `Игрок ${currentPlr} победил`
                if (currentPlr == 'O') {
                    document.getElementById('message').style.color = 'blue'
                    blueWin++
                } else {
                    document.getElementById('message').style.color = "red"
                    redWin++
                }
                let oldPlr = currentPlr
                currentPlr = currentPlr === "X" ? "O" : "X"
                restartCursors(oldPlr)
                document.querySelector('.redCount').textContent = redWin
                document.querySelector('.blueCount').textContent = blueWin
                btnCont.classList.remove('hidden')
                gameEnd = true
            } else if (isBoardFull()) {
                document.getElementById('message').textContent = `Ничья`
                document.getElementById('message').style.color = 'white'
                let newPlayer = Math.random(0,1)
                let oldPlr = currentPlr
                if (newPlayer == 0) {
                    currentPlr = 'X'
                } else {
                    currentPlr = 'O'
                }
                restartCursors(oldPlr)
                btnCont.classList.remove('hidden')
                gameEnd = true
            } else {
                    let oldPlr = currentPlr
                    currentPlr = currentPlr === "X" ? "O" : "X"
                    restartCursors(oldPlr)
                if (mode == 'bot' && currentPlr == botPlr) {
                    botAlgorithm()
                }
            }
        }
    }
}

let state = 'idle'

function botAlgorithm() {
    if (state == 'idle') {
        let rowSlt = Math.floor(Math.random() * 4)
        let cellSlt = Math.floor(Math.random() * 4)
        if (board[rowSlt][cellSlt] == '' || board[rowSlt][cellSlt] == undefined) {
            cellClicked(rowSlt,cellSlt)
        } else {
            botAlgorithm()
        }
    }
}

function checkWinner(plr, row, id) {
    for (let r = 0; r < 5; r++) {
        for (let i = 0; i < 5; i++) {
            if ( i == 1 || i == 2) {
                if (board[r][i] == plr && board[r][i - 1] == plr && board[r][i + 1] == plr && board[r][i + 2] == plr) { // ГОРИЗОНТАЛЬНО
                    let cell = document.getElementById(`cell${r}${i}`)
                    cell.textContent = "―"
                    cell = document.getElementById(`cell${r}${i - 1}`)
                    cell.textContent = "―"
                    cell = document.getElementById(`cell${r}${i + 1}`)
                    cell.textContent = "―"
                    cell = document.getElementById(`cell${r}${i + 2}`)
                    cell.textContent = "―"
                    return true
                }
            } 
            if (r == 1 || r == 2) {
                if (board[r][i] == plr && board[r - 1][i] == plr && board[r + 1][i] == plr && board[r + 2][i] == plr) { // ВЕРТИКАЛЬНО
                    let cell = document.getElementById(`cell${r}${i}`)
                    cell.textContent = "|"
                    cell = document.getElementById(`cell${r - 1}${i}`)
                    cell.textContent = "|"
                    cell = document.getElementById(`cell${r + 1}${i}`)
                    cell.textContent = "|"
                    cell = document.getElementById(`cell${r + 2}${i}`)
                    cell.textContent = "|"
                    return true
                }
            }
             if ((r == 1 || r == 2) && (i == 1 || i == 2)) {
                if (board[r][i] == plr && board[r - 1][i-1] == plr && board[r+1][i+1] == plr && board[r+2][i+2] == plr) { // ДИАГОНАЛЬНО 1
                    let cell = document.getElementById(`cell${r}${i}`)
                    cell.textContent = "⧵"
                    cell = document.getElementById(`cell${r - 1}${i-1}`)
                    cell.textContent = "⧵"
                    cell = document.getElementById(`cell${r + 1}${i+1}`)
                    cell.textContent = "⧵"
                    cell = document.getElementById(`cell${r + 2}${i+2}`)
                    cell.textContent = "⧵"
                    return true
                }
            } 
             if ((r == 1 || r == 2) && (i == 2 || i == 3))
            if (board[r][i] == plr && board[r - 1][i+1] == plr && board[r+1][i-1] == plr && board[r+2][i-2] == plr) { // ДИАГОНАЛЬНО 2
                let cell = document.getElementById(`cell${r}${i}`)
                cell.textContent = "/"
                cell = document.getElementById(`cell${r - 1}${i+1}`)
                cell.textContent = "/"
                cell = document.getElementById(`cell${r + 1}${i-1}`)
                cell.textContent = "/"
                cell = document.getElementById(`cell${r + 2}${i-2}`)
                cell.textContent = "/"
                return true
            }
        }
    }
    return false
}

function isBoardFull() {
    let spaceLeft = false
    for (let r = 0; r < 5; r++) {
        for (let i = 0; i < 4; i++) {
            const cell = document.getElementById(`cell${r}${i}`)
            if (cell.textContent == "") {
                return false
            }
        }
    }
    return true
}

btnAgain.addEventListener('click', (e) => {
    gameEnd = false
    btnCont.classList.add('hidden')
    for (let r = 0; r < 5; r++) {
        for (let i = 0; i < 5; i++) {
            const cell = document.getElementById(`cell${r}${i}`)
            cell.textContent = ''
            document.getElementById('message').textContent = ``
            board[r][i] = ""
    
            cell.setAttribute('data-value', '')
        }
    }
    if (mode == 'bot' && currentPlr == botPlr) {
        botAlgorithm()
    }
})

btnRestart.addEventListener('click', (e) => {
    location.reload()
})

function restartCursors(oldPlr) {
    for (let r = 0; r < 5; r++) {
        for (let i = 0; i < 5; i++) {
            const cell = document.getElementById(`cell${r}${i}`)
            cell.classList.remove(`${oldPlr}Cursor`)
        }
    }
    for (let r = 0; r < 5; r++) {
        for (let i = 0; i < 5; i++) {
            const cell = document.getElementById(`cell${r}${i}`)
            cell.classList.add(`${currentPlr}Cursor`)
        }
    }
}
