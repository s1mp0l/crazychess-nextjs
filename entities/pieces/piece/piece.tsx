import './piece.css'

const getPieceURL = ( {color, rank} : IPiece) => {
  return `assets/pieces/${color}${rank}.png`
}

interface PieceProps {
  piece: IPiece
}

export const Piece = ({piece} : PieceProps) => {
  return (
      <div className="piece" style={{backgroundImage: `url(${getPieceURL(piece)})`}}></div>
  );
};