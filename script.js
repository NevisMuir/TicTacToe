const gameBoard = (() =>{
    let array=[0,1,2,3,4,5,6,7,8]
    //gameBoard.reset resets game array
    const reset = () =>{
        displayBoard.reset()
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
            ){
                console.log("winner!")
                reset()
                return
            }
        //tie case, array is full of strings and contains no numbers
        //but there is no winner     
        if(array.every(isNaN)){
            console.log('tie!')
            reset()
            return
        }
    }

    return{
        reset,
        write,
        checkWin
    }
})()

const gameFlow = (() =>{
    let currentPlayer = 'X'

    const symbol = () => currentPlayer

    const turn = () =>{
        gameBoard.write(displayBoard.cellNum())
        changePlayer()
        gameBoard.checkWin()
    }

    const changePlayer =() =>{
        if (currentPlayer == 'X'){
            currentPlayer = 'O'
            console.log(currentPlayer)
        }else{
            currentPlayer='X'
            console.log(currentPlayer)
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
     //the above might make more sense in gameFlow? Since it's the action the player takes...
     //idk, makes sense here to me
     
     //displayBoard.reset erases board
     const reset = () =>{
        document.querySelectorAll('.boardCell').forEach((cell)=>cell.textContent="")
        document.querySelectorAll('.filled').forEach((cell)=>{
            cell.classList.remove('filled')
            cell.classList.add('unfilled')
        })
     }
     return{
        reset,
        cellNum
     }

   

})()

