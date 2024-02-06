import './player-row.css'
import {ChessTimerComponent} from "@/src/features/chess-timer/chess-timer";
import {Player} from "@/src/features/chess-player/Player";

interface PlayerRowComponentProps {
  player: Player;
  initialTime: number;
  turn: PieceColor;
  loser: PieceColor | null;
  setLoser: (value: PieceColor) => void;
}

export const PlayerRowComponent = ({player, initialTime, turn, loser, setLoser}: PlayerRowComponentProps) => {
  return (
    <div className='playerRowContainer'>
      <p>{player.name}</p>
      <ChessTimerComponent
        initialTime={initialTime}
        turn={turn}
        color={player.color}
        loser={loser}
        setLoser={setLoser}
      />
    </div>
  );
};