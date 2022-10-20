const gameBoard = (() =>{
    let array=[0,1,2,3,4,5,6,7,8]
    //gameBoard.reset resets game array
    const reset = () =>{
        for(let i=0;i<=8;i++){
            array.splice(i,1,i)
        }
    }
    const write = (position)=>{
        array.splice(position, 1, gameFlow.symbol())
    }
    
    
    const checkWin = () =>{
        //all possible win case
        if( array[0]==array[1]&& array[1]==array[2]||
            array[3]==array[4]&& array[4]==array[5]||
            array[6]==array[7]&& array[7]==array[8]||
            array[0]==array[3]&& array[3]==array[6]||
            array[1]==array[4]&& array[4]==array[7]||
            array[2]==array[5]&& array[5]==array[8]||
            array[6]==array[4]&& array[4]==array[2]||
            array[0]==array[4]&& array[4]==array[8]
            )return true
            
        }
        //tie case, array is full of strings and contains no numbers
        //but there is no winner     
    const checkTie = () =>{if(array.every(isNaN)){
            return true
        }
    }

    return{
        reset,
        write,
        checkWin,
        checkTie
    }
})()

const gameFlow = (() =>{
    let currentPlayer = 'X'
    let playerX = "X"
    let playerO= "O"

    const displayNames = () =>{
        let display = document.querySelector('.turn')
        if(currentPlayer === "X"){display.textContent = playerX +"'s turn!"}
        if(currentPlayer === "O"){display.textContent = playerO +"'s turn!"}
    }

    const playerReset = ()=>{
        playerX = "X"
        playerO = "O"
    }

    const getNames = () =>{
            let xname = document.getElementById('x-player')
            let oname = document.getElementById('o-player')
            if(xname.value === "")xname.value= "X"
            if(oname.value === "")oname.value= "O"
            playerX=xname.value
            playerO=oname.value
            content.innerHTML = ""
            displayBoard.create()
            displayNames()
    }

    const symbol = () => currentPlayer

    const turn = () =>{
        gameBoard.write(displayBoard.cellNum())
        //win case
        if(gameBoard.checkWin()){
            let winner
            if(currentPlayer==="X") winner = playerX
            if(currentPlayer==="O")winner = playerO
            displayBoard.endGame(winner+" wins!")
            currentPlayer = 'X'
            gameBoard.reset()
            
            return
        }
        //tie case
        if(gameBoard.checkTie()){
            displayBoard.endGame("It's a tie!")
            currentPlayer = 'X'
            gameBoard.reset()
            
            return
        }
        changePlayer()
        displayNames()
    }

    const changePlayer =() =>{
        if (currentPlayer == 'X'){
            currentPlayer = 'O'
        }else{
            currentPlayer='X'
        }
    }
    return{
        symbol,
        turn,
        getNames,
        displayNames,
        playerReset
    }  
})()

const displayBoard = (()=>{
     let body=document.querySelector('#content')
     
     let currentCell
     
     const create = () =>{
        
        let boardBackground = document.createElement('div')
        boardBackground.setAttribute('id','boardBackground')
     
        for(let i=0;i<=8;i++){
            let cell=document.createElement('div')
            cell.classList.add('boardCell',"unfilled")
            boardBackground.appendChild(cell)
            cell.setAttribute('id',i)
        }
        body.appendChild(boardBackground)
        let gametext = document.createElement('div')
        gametext.classList.add('turn')
        body.appendChild(gametext)
        const emptyCells=document.querySelectorAll('.unfilled')
        emptyCells.forEach((cell)=>{
            cell.addEventListener('click',()=>{
                cell.textContent=gameFlow.symbol()
                cell.classList.remove('unfilled')
                cell.classList.add('filled')
                currentCell=cell.getAttribute("id")
                gameFlow.turn()
            })
         })
     }

     const cellNum = ()=> currentCell
    //prints x or o on cell, intiates turn
     

     //displayBoard.reset erases board
     const reset = () =>{
        gameFlow.displayNames()
        document.querySelectorAll('.boardCell').forEach((cell)=>cell.textContent="")
        document.querySelectorAll('.filled').forEach((cell)=>{
            cell.classList.remove('filled')
            cell.classList.add('unfilled')
        })
     }
     const newGameButton=document.querySelector('#rematch')
     const resetButton=document.querySelector('#reset')
     const endText=document.querySelector('#endgame>p')
     const endDisplay = document.querySelectorAll('.hidden')

     resetButton.addEventListener('click',()=>{
        endDisplay.forEach((display)=>{
            display.classList.add('hidden')
        })
        body.textContent=""
        welcomePage.create()
        gameFlow.playerReset()

     })

     newGameButton.addEventListener('click',()=>{
        reset()
        
        endDisplay.forEach((display)=>{

            display.classList.add('hidden')
        })

     })
     const endGame = (text) =>{
        endText.textContent=text
        endDisplay.forEach((display)=>{
            display.classList.remove('hidden')
        })
     }

     return{
        create,
        cellNum,
        endGame
     }
})()


const welcomePage = (()=>{
    //these buttons are outside the scope of .create() so that 
    //they can be used in other functions
    

    let page = document.createElement('div')    

    const playerInput = ()=>{
        page.innerHTML= ""
        let formx = document.createElement('form')
        page.appendChild(formx)
        let labelx = document.createElement('label')
        labelx.innerHTML = 'Player "X":'
        labelx.setAttribute('for','x-player')
        formx.appendChild(labelx)
        let inputx = document.createElement('input')
        inputx.setAttribute('type','text')
        inputx.setAttribute('size','1')
        inputx.setAttribute('id','x-player')
        inputx.setAttribute('placeholder','X')
        formx.appendChild(inputx)
        let formo = document.createElement('form')
        page.appendChild(formo)
        let labelo = document.createElement('label')
        labelo.innerHTML = 'Player "O":'
        labelo.setAttribute('for','o-player')
        formo.appendChild(labelo)
        let inputo = document.createElement('input')
        inputo.setAttribute('type','text')
        inputo.setAttribute('size','1')
        inputo.setAttribute('id','o-player')
        inputo.setAttribute('placeholder','O')
        formo.appendChild(inputo)
        let button = document.createElement('button')
        button.setAttribute('id','player-start')
        button.innerHTML="Start"
        page.appendChild(button)
        button.addEventListener('click', gameFlow.getNames)
    }


    //creates welcome page, gives option ov PVP or PVE

    
    const create = ()=>{
        let body = document.querySelector('#content');
        
        page.setAttribute("id","welcome-page")
        page.textContent=""
        body.appendChild(page)
        let playerButton = document.createElement('button')
        playerButton.setAttribute("id","player-button")

        let cpuButton = document.createElement('button')
        cpuButton.setAttribute("id","cpu-button")
        let h1 = document.createElement('h1')
        h1.textContent = "Let's Play Tic Tac Toe!"
        page.appendChild(h1)       
        page.appendChild(playerButton)
        page.appendChild(cpuButton)

        let soon=document.createElement('p')
        soon.textContent = "coming soon!"
        page.appendChild(soon)

        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        let p3= document.createElement('p')
        p1.textContent = "Player"
        p2.textContent = "Vs."
        p3.textContent = "Player";
        let c1 = document.createElement('p')
        let c2 = document.createElement('p')
        let c3= document.createElement('p')
        c1.textContent = "Player"
        c2.textContent = "Vs."
        c3.textContent = "CPU";
        playerButton.appendChild(p1);
        playerButton.appendChild(p2);
        playerButton.appendChild(p3);
        //creates new page on click
        playerButton.addEventListener('click', playerInput)
        cpuButton.appendChild(c1);
        cpuButton.appendChild(c2);
        cpuButton.appendChild(c3);
    }

return{create}



})()

const computer = (()=>{

    const turn = ()=>{
        let emptyCells = document.querySelectorAll('.unfilled')
        //writing empty cell ids to an array.
        let empties = []
        emptyCells.forEach((cell)=>{
            empties.push(cell.getAttribute('id'))
        })
        let move = empties[Math.floor(Math.random()*empties.length)]
        document.getElementById(move).click()
    }

    return{
        turn,
    }

})()

welcomePage.create()

