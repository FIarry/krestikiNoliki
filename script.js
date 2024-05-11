let currentPlr = 'X'
let gameEnd = false
let board = [{ row1: ["", "", "", "", "",] },
{ row2: ["", "", "", "", "",] },
{ row3: ["", "", "", "", "",] },
{ row4: ["", "", "", "", "",] },
{ row5: ["", "", "", "", "",] },
]
let blueWin = 0
let redWin = 0

const btnCont = document.querySelector('.btnContainer')
const btnAgain = document.getElementById('playAgain')
const btnRestart = document.getElementById('restart')

let forbiddenList = [0, 4, 5, 9, 10, 14, 15, 19, 20, 24]

function cellClicked(i) {
    if (!gameEnd) {
        let row = 1
        let id = 0
        if (i < 24) {
            row = 5
        } else if (i < 19) {
            row = 4
        } else if (i < 14) {
            row = 3
        } else if (i < 9) {
            row = 2
        } else {
            row = 1
        }
        id = (i + 1) / row
        id = id.toString()
        id = id.replace(id[0], 0)
        id = Number(id)
        if (id == 0 || id == 5) {
            id = 1
        }
        id = id * 5
        if (board[row][id] === '') {
            const cell = document.getElementById(`cell${id}`)
            cell.textContent = currentPlr
            cell.setAttribute('data-value', currentPlr)
            board[id] = currentPlr
            if (checkWinner(currentPlr, row, id)) {
                document.getElementById('message').textContent = `Игрок ${currentPlr} победил`
                if (currentPlr == 'O') {
                    document.getElementById('message').style.color = 'blue'
                    blueWin++
                    currentPlr = 'X'
                } else {
                    document.getElementById('message').style.color = "red"
                    redWin++
                    currentPlr = 'O'
                }
                document.querySelector('.redCount').textContent = redWin
                document.querySelector('.blueCount').textContent = blueWin
                btnCont.classList.remove('hidden')
                gameEnd = true
            } else if (isBoardFull()) {
                document.getElementById('message').textContent = `Ничья`
                document.getElementById('message').style.color = 'white'
                btnCont.classList.remove('hidden')
                gameEnd = true
            } else {
                currentPlr = currentPlr === "X" ? "O" : "X"
            }
        }
    }
}

function checkWinner(plr, row, id) {
    for (let r = 0; r < 5; r++) {
        for (let i = 0; i < 5; i++) {
            if (board[r][i] == plr && board[r - 1][i - 1] == plr && board[r + 1][i + 1] == plr && board[r + 2][i + 2] == plr) { // ГОРИЗОНТАЛЬНО
                return true
            }
            if (board[i] == plr && board[r - 1][i] == plr && board[r + 1][i] == plr && board[r + 2][i] == plr) { // ВЕРТИКАЛЬНО
                return true
            }
            if (board[i] == plr && board[i - 4] == plr && board[i + 4] == plr && board[i + 8] == plr) { // ДИАГОНАЛЬНО 1
                return true
            }
            if (board[i] == plr && board[i - 6] == plr && board[i + 6] == plr && board[i + 12] == plr) { // ДИАГОНАЛЬНО 2
                return true
            }
        }
    }
    return false
}

function isBoardFull() {
    return board.every(cell => cell !== "")
}

btnAgain.addEventListener('click', (e) => {
    gameEnd = false
    btnCont.classList.add('hidden')
    for (let i = 0; i < 25; i++) {
        const cell = document.getElementById(`cell${i}`)
        cell.textContent = ''
        document.getElementById('message').textContent = ``
        board[i] = ""

        cell.setAttribute('data-value', '')
    }
})

btnRestart.addEventListener('click', (e) => {
    location.reload()
})