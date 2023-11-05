import {Field} from "@/features/chess-engine/board/Field";
import {Piece} from "@/features/chess-engine/pieces/Piece";
import {stringToPiece} from "@/features/chess-engine/utils";
import {defaultBoardSize, defaultPosition} from "@/features/chess-engine/constants";

export class Board {
  private size: number = 8;
  private fields: Field[][] = [];

  public lostBlackFigures: Piece[] = [];
  public lostWhiteFigures: Piece[] = [];

  constructor(position: BoardPosition = defaultPosition, boardSize: number = defaultBoardSize) {
    if (!boardSize) return;
    if (!position) return;

    this.size = boardSize;
    this.initCells(boardSize)

    position.map((row, rowIndex) => (
      row.map((cell, cellIndex) => {
        const field = this.getField(cellIndex, rowIndex);
        field.piece = stringToPiece(cell, field);
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
    newBoard.size = this.size;
    newBoard.fields = this.fields;
    newBoard.lostWhiteFigures = this.lostWhiteFigures
    newBoard.lostBlackFigures = this.lostBlackFigures
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

  public getField(x: number, y: number) {
    return this.fields[y][x]
  }

  public getFields() {
    return this.fields;
  }
}