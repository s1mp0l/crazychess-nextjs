import {Board} from "@/src/features/chess-engine/board/Board";

export class Field implements IField {
  readonly x: number;
  readonly y: number;
  readonly color: PieceColor;
  piece: IPiece | null;
  board: IBoard;
  available: boolean;
  id: number;

  constructor(board: Board, x: number, y: number, color: PieceColor, piece: IPiece | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.piece = piece;
    this.board = board;
    this.available = false;
    this.id = Math.random()
  }

  isEmpty(): boolean {
    return this.piece === null;
  }

  isEnemy(target: IField): boolean {
    if (target.piece) {
      return this.piece?.color !== target.piece.color;
    }
    return false;
  }

  isEmptyVertical(target: IField): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if(!this.board.getField(this.x, y).isEmpty()) {
        return false
      }
    }
    return true;
  }

  isEmptyHorizontal(target: IField): boolean {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if(!this.board.getField(x, this.y).isEmpty()) {
        return false
      }
    }
    return true;
  }

  isEmptyDiagonal(target: IField): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if(absY !== absX)
      return false;

    const dy = this.y < target.y ? 1 : -1
    const dx = this.x < target.x ? 1 : -1

    for (let i = 1; i < absY; i++) {
      if(!this.board.getField(this.x + dx*i, this.y + dy   * i).isEmpty())
        return false;
    }
    return true;
  }

  setPiece(figure: IPiece | null): void {
    if (!figure) this.piece = null;
    else {
      this.piece = figure;
      this.piece.field = this;
    }
  }

  addLostFigure(piece: IPiece): void {
    if (piece.color === 'b') {
      this.board.blackFigures.filter(p => p !== piece);
      this.board.lostBlackFigures.push(piece);
    } else {
      this.board.whiteFigures.filter(p => p !== piece)
      this.board.lostWhiteFigures.push(piece);
    }
  }

  moveFigure(target: IField): void {
    if(this.piece && this.piece?.canMove(target)) {
      // добавление в историю ходов
      this.board.addHistoryMove(this.piece, this, target, target.piece);

      this.piece.moveFigure(target)
      if (target.piece) {
        this.addLostFigure(target.piece);
      }
      target.setPiece(this.piece);

      // проверка на шах после хода
      if (this.piece.color === 'w') {
        if (this.piece?.canMove(this.board.blackKing.field)) {
          this.board.blackKing.isChecked = true;
        }
      } else {
        if (this.piece?.canMove(this.board.whiteKing.field)) {
          this.board.whiteKing.isChecked = true;
        }
      }

      this.piece = null;
      this.board.swapTurn();
    }
  }
}