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


