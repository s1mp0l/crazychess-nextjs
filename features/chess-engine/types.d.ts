type PieceColor = 'w' | 'b';

type PieceSymbol = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

type PieceString = 'wP' | 'wN' | 'wB' | 'wR' | 'wQ' | 'wK' |
  'bP' | 'bN' | 'bB' | 'bR' | 'bQ' | 'bK';

type BoardPosition = (PieceString | null)[][];

interface PiecePosition {
  index: number;
  letter: string;
}

interface ChessHistoryItem {
  move: InternalMove;
  kings: Record<PieceColor, number>;
  turn: PieceColor;
  castling: Record<PieceColor, number>;
  moveNumber: number;
}