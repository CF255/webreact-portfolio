import { PortalLayout } from "../layout/PortalLayout";
 import confetti from 'canvas-confetti'
import { useState } from 'react'
 import '/public/css/tresenraya.css'
import { Square } from '../components/TresEnRaya/Square'
import { TURNS } from '../constants/TresEnRayaConstants'
import { chekWinner, checkEndGame } from '../logic/storage/board'
import { WinnerModal } from '../components/TresEnRaya/WinnerModal'
import { saveGameToStorage, resetGameStorage } from '../logic/storage/saveandresettresenraya'

function App() {
  const [board, setBoard] =  useState (()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  
  })
  const [turn, setTurn] = useState(() => {
    const turnFormStorage = window.localStorage.getItem('turn')
    return turnFormStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)


  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

 

  const updateBoard = (index) =>{
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index]= turn
    setBoard(newBoard)

    const newturn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newturn)

   saveGameToStorage({
    board: newBoard,
    turn: newturn
   })
    const newWinner = chekWinner(newBoard)
    if(newWinner){
       confetti() 
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  

  return (
  
    <PortalLayout>

    <div className="fondoTresEnRaya">

     <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
       {
        board.map((_, index)=>{
          return(
            <Square 
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
             {board[index]}
            </Square>
          )
        })
       }
      </section>

      <section className='turn'>
       <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
       <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

       <WinnerModal resetGame={resetGame} winner={winner}/>
     </main>
     </div>
     </PortalLayout>
   
  )
}

export default App
