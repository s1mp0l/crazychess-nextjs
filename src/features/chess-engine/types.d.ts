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
  move: ChessMove;
  turn: PieceColor;
  moveNumber: number;
}

interface ChessMove {
  piece: IPiece;
  from: IField;
  to: IField;
  captured: IPiece | null;
}

interface IField {
  readonly x: number;
  readonly y: number;
  readonly color: PieceColor;
  piece: IPiece | null;
  board: IBoard;
  available: boolean;
  id: number;

  isEmpty(): boolean;
  isEnemy(target: IField): boolean;
  isEmptyVertical(target: IField): boolean;
  isEmptyHorizontal(target: IField): boolean;
  isEmptyDiagonal(target: IField): boolean;
  setPiece(figure: IPiece | null): void;
  addLostFigure(piece: IPiece): void;
  moveFigure(target: IField): void;
}

interface IPiece {
  color: PieceColor;
  field: IField;
  name: PieceSymbol;
  id: number;
  logo: any;

  canMove(target: IField): boolean;
  moveFigure(target: IField): void;
}

interface IBoard {
  id: number;

  blackFigures: IPiece[];
  whiteFigures: IPiece[];

  lostBlackFigures: IPiece[];
  lostWhiteFigures: IPiece[];

  whiteKing: IKing;
  blackKing: IKing;

  turn: PieceColor;
  history: ChessHistoryItem[];

  swapTurn(): void;
  getField(x: number, y: number): IField;
  undoLastMove(): void
  addHistoryMove(piece:IPiece, from: IField, to: IField, captured: IPiece | null): void;
  getTurn(): PieceColor;
  countAvailableMoves(): number;
}

interface IKing extends IPiece {
  isChecked: boolean;
}