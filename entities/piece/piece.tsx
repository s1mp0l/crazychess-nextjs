import './piece.css'
import {Piece} from "@/features/chess-engine/pieces/Piece";

interface PieceProps {
  piece: Piece
}

export const PieceComponent = ({piece} : PieceProps) => {
  return (
      <div className="piece" style={{backgroundImage: `url(${piece.logo?.src})`}} />
  );
};