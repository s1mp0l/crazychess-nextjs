type pieceColor = 'b' | 'w'
type pieceRank = 'p' | 'k' | 'q' | 'r' | 'kn' | 'b'

declare interface IPiece {
  position: string
  color: pieceColor,
  rank: pieceRank
}