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

    const symbol = () => currentPlayer

    const turn = () =>{
        gameBoard.write(displayBoard.cellNum())
        //win case
        if(gameBoard.checkWin()){
            displayBoard.endGame(currentPlayer+" wins!")
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
        turn
    }  
})()

const displayBoard = (()=>{
     const emptyCells=document.querySelectorAll('.unfilled')
     let currentCell
     
     const cellNum = ()=> currentCell
    //prints x or o on cell, intiates turn
     emptyCells.forEach((cell)=>{
        cell.addEventListener('click',()=>{
            cell.textContent=gameFlow.symbol()
            cell.classList.remove('unfilled')
            cell.classList.add('filled')
            currentCell=cell.getAttribute("id")
            gameFlow.turn()
        })
     })

     //displayBoard.reset erases board
     const reset = () =>{
        document.querySelectorAll('.boardCell').forEach((cell)=>cell.textContent="")
        document.querySelectorAll('.filled').forEach((cell)=>{
            cell.classList.remove('filled')
            cell.classList.add('unfilled')
        })
     }
     const newGameButton=document.querySelector('button')
     const endText=document.querySelector('#endgame>p')
     const endDisplay = document.querySelectorAll('.hidden')

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
        cellNum,
        endGame
     }
})()


const welcomePage = (()=>{
    //these buttons are outside the scope of .create() so that 
    //they can be used in other functions
    let playerButton = document.createElement('button')
    playerButton.setAttribute("id","player-button")

    let cpuButton = document.createElement('button')
        cpuButton.setAttribute("id","cpu-button")

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
    }
    //creates welcome page, gives option ov PVP or PVE
    const create = ()=>{
        let body = document.querySelector('body');
        
        page.setAttribute("id","welcome-page")
        body.appendChild(page)

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

    //must be called after create




    
    

return{create, playerInput}



})()

