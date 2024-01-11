import {Field} from "@/features/chess-engine/board/Field";
import {stringToPiece} from "@/features/chess-engine/utils";
import {defaultBoardSize, defaultPosition} from "@/features/chess-engine/constants";
import {King} from "@/features/chess-engine/pieces/basic/King";

export class Board implements IBoard {
  public id: number = 0;

  private size: number = 8;
  private fields: IField[][] = [];

  public blackFigures: IPiece[] = [];
  public whiteFigures: IPiece[] = [];

  public lostBlackFigures: IPiece[] = [];
  public lostWhiteFigures: IPiece[] = [];

  public whiteKing: King = {} as King;
  public blackKing: King = {} as King;

  public turn: PieceColor = 'w';
  public history: ChessHistoryItem[] = [];

  constructor(position: BoardPosition = defaultPosition, boardSize: number = defaultBoardSize) {
    if (!boardSize) return;
    if (!position) return;

    this.size = boardSize;
    this.initCells(boardSize);

    position.forEach((row, rowIndex) => (
      row.forEach((cell, cellIndex) => {
        const field = this.getField(cellIndex, rowIndex);
        const piece = stringToPiece(cell, field);
        if (piece) {
          field.piece = piece;
          if (piece.color === 'w') {
            this.whiteFigures.push(piece)
            if (piece?.name === 'k')
              this.whiteKing = piece as King;
          } else {
            this.blackFigures.push(piece);
            if (piece?.name === 'k')
              this.blackKing = piece as King;
          }
        }
      })
    ));
  }

  public initCells(boardSize: number) {
    for (let i = 0; i < boardSize; i++) {
      const row: Field[] = [];
      for (let j = 0; j < boardSize; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Field(this, j, i, 'b', null)) // Черные ячейки
        } else {
          row.push(new Field(this, j, i, 'w', null)) // белые
        }
      }
      this.fields.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    this.fields.forEach(row => row.forEach(f => f.board = newBoard))
    newBoard.id = this.id;
    newBoard.size = this.size;
    newBoard.fields = this.fields;
    newBoard.whiteKing = this.whiteKing;
    newBoard.blackKing = this.blackKing;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.whiteFigures = this.whiteFigures;
    newBoard.blackFigures = this.blackFigures;
    newBoard.history = this.history;
    newBoard.turn = this.turn;
    return newBoard;
  }

  public highlightCells(selectedCell: Field | null) {
    for (let i = 0; i < this.fields.length; i++) {
      const row = this.fields[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.piece?.canMove(target)
      }
    }
  }

  public countAvailableMoves(): number {
    const figures = this.turn === 'w' ? this.whiteFigures : this.blackFigures;
    let counter = 0;
    figures.forEach(f => {
      for (let i = 0; i < this.fields.length; i++) {
        const row = this.fields[i];
        for (let j = 0; j < row.length; j++) {
          const target = row[j];
          if (f.canMove(target)) counter++;
        }
      }
    })
    return counter;
  }

  public undoLastMove(): void {
    if (!this.history.length) return;
    const lastMove = this.history.pop() as ChessHistoryItem;

    lastMove.move.from.setPiece(lastMove.move.piece);
    if (lastMove.move.captured) {
      lastMove.move.to.setPiece(lastMove.move.captured);
      if (lastMove.move.captured.color === 'w') {
        this.whiteFigures.push(lastMove.move.captured);
        this.lostWhiteFigures.filter(p => p !== lastMove.move.captured);
      } else {
        this.blackFigures.push(lastMove.move.captured);
        this.lostBlackFigures.filter(p => p !== lastMove.move.captured);
      }
    } else {
      lastMove.move.to.setPiece(null);
    }

    this.turn = lastMove.turn;
  }

  public addHistoryMove(piece:IPiece, from: IField, to: IField, captured: IPiece | null): void {
    const moveNumber = this.history.length + 1;
    const turn = piece.color;
    this.history.push({
      moveNumber,
      turn,
      move: {
        from,
        to,
        piece,
        captured
      }
    })
  }

  public getField(x: number, y: number) {
    return this.fields[y][x]
  }

  public getFields() {
    return this.fields;
  }

  public swapTurn(): void {
    this.turn = this.turn === 'w' ? 'b' : 'w';
  }

  public getTurn(): PieceColor {
    return this.turn;
  }
}