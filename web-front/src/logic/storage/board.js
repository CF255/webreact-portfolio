import { WINNER_COMBOS } from "../../constants/TresEnRayaConstants"

export const chekWinner = (boardToChek) =>{
    for (const combo of WINNER_COMBOS){
        const[a,b,c]=combo
        if(
          boardToChek[a] && 
          boardToChek[a] === boardToChek[b] &&
          boardToChek[a] === boardToChek[c]
        ){
        return boardToChek[a]
    }
  }
    return null
  }


  export const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square != null)
  }
