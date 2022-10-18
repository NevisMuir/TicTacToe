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
        if(array[0]== array[1]&& array[1]==array[2]||
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

