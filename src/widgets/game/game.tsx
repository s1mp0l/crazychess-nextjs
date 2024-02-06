'use client'

import {BoardComponent} from "@/src/entities/board/board";
import {useCallback, useState} from "react";
import {Board} from "@/src/features/chess-engine/board/Board";
import {Player} from "@/src/features/chess-player/Player";
import {PlayerRowComponent} from "@/src/features/chess-player/player-row";
import {GameOverModal} from "@/src/widgets/game/components/game-over-modal";

export const Game = () => {
  const [board, setBoard] = useState(new Board());
  const [loser, setLoser] = useState<PieceColor | null>(null);

  const updateBoard = useCallback(() => {
    if (!board) return;
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
    const availableMoves = newBoard.countAvailableMoves();
    if (availableMoves <= 0) setLoser(newBoard.turn);
  }, [board])

  const initialTime = 10 * 60;

  const blackPlayer = new Player( 'b', 'Player1');
  const whitePlayer = new Player('w', 'Player2');

  return (
    <div style={{
      width: '85vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px'
    }}>
      {loser && <GameOverModal loser={loser}/>}
      <PlayerRowComponent
        initialTime={initialTime}
        player={blackPlayer}
        turn={board.turn}
        loser={loser}
        setLoser={setLoser}
      />
      <BoardComponent
        board={board}
        updateBoard={updateBoard}
      />
      <PlayerRowComponent
        initialTime={initialTime}
        player={whitePlayer}
        turn={board.turn}
        loser={loser}
        setLoser={setLoser}
      />
    </div>
  )
}