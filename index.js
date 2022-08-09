const prompt = require("prompt")
class tictactoe {
    constructor() {
        this.run()
    }
    async run() {
        this.winner = 0
        this.on = false
        this.play()
        
    }
    async play() {
        if(!this.on) {
            this.board = []
            for (let i = 0; i < 9; i++) {
                this.board[i] = {code: 0}

            }
            this.drawBoard(this.board)
            this.on = true
        }
        
        let place = await this.prompt()
        if(!/[0-9]/g.test(Number(place)) || this.board[Number(place) - 1].code !== 0) {
            return
        }
        this.markPoint(Number(place) - 1, 1)
        await new Promise(r => setTimeout(r, 1000));
        let filtered = this.board.filter(obj => obj.code == 0)
        let index = this.board.indexOf(filtered[Math.floor(Math.random()* filtered.length)])
        this.checkWinner()
        if(index === -1 && this.winner === 0) return console.log("How the heck you drawed")
        if(this.winner === 0) {
            this.markPoint(index, 2)
            this.play()
        }
        else {
            console.log(`${this.winner} won!`)
        }
    }
    drawBoard(arr) {
        let board = ``
        let o = 0
        arr.forEach(i => {
            switch(i.code) {
                case 0:
                    board += o === 3 ? `\n- ` : `- `
                break;
                case 1:
                    board += o === 3 ? `\nX ` : `X `
                break;
                case 2:
                    board += o === 3 ? `\nO ` : `O `
                break;
            }
            if(o === 3) o = 0
            o++
        })
        console.clear()
        console.log(board)
        
    }
    markPoint(place, code) {
        this.board[place] = {code}
        this.drawBoard(this.board)
    }
    async prompt() {
        prompt.start()
        let place = await prompt.get("Where to place?")
        return place["Where to place?"]
    }
    checkWinner() {
        let arr = [[0, 1, 2],[3, 4, 5],[6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        arr.forEach(array => {
            if(array.every(num => this.board[num].code === 1)) {
                this.winner = "You"
            } 
            if(array.every(num => this.board[num].code === 2)) {
               this.winner = "AI"
            }
        })
    }
    
}
new tictactoe()
