const gameBoard = (() =>{
    let array=[0,1,2,3,4,5,6,7,8]
    const erase = () =>{
        for(let i=0;i<=8;i++){
            array.splice(i,1,i)
        }
    }
    const write = (symbol,position)=>{
        array.splice(position, 1, symbol)
    }
    const log = () =>{console.log(array)
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
                return
            }
        //tie case, array is full of strings and contains no numbers
        //but there is no winner     
        if(array.every(isNaN)){
            console.log('tie!')
        }
    }

    return{
        erase,
        write,
        log,
        checkWin
    }
})()

const gameFlow = (() =>{
    let currentPlayer = 'X'

    const symbol = () => currentPlayer

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
        changePlayer,
        symbol
    }  
})()

const displayBoard = (()=>{
    //not sure if this really requires being inside this module...
     const emptyCells=document.querySelectorAll('.unfilled')
     emptyCells.forEach((cell)=>{
        cell.addEventListener('click',()=>{
            cell.textContent=gameFlow.symbol()
            gameFlow.changePlayer()
            cell.classList.remove('unfilled')
            cell.classList.add()
        })
     })
   

})()

