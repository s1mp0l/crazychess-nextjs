import {Field} from "@/src/features/chess-engine/board/Field";
import {StaticImageData} from "next/image";

export class Piece implements IPiece {
  color: PieceColor;
  logo: StaticImageData | null;
  field: IField;
  name: PieceSymbol;
  id: number;

  constructor(color: PieceColor, field: IField) {
    this.color = color;
    this.field = field;
    this.field.piece = this;
    this.logo = null;
    this.name = 'p';
    this.id = Math.random()
  }

  savesKingFromAttack(target: IField): boolean {
    const board = this.field.board;
    const figures = this.color === 'w' ? board.blackFigures : board.whiteFigures;
    const kingField = this.color === 'w' ? board.whiteKing.field : board.blackKing.field;

    const tempTargetPiece = target.piece;
    const tempThisField = this.field;

    target.setPiece(this);

    const result = figures
      .filter(p => p !== tempTargetPiece)
      .every(p => !p.canMove(this.name === 'k' ? target : kingField));

    target.setPiece(tempTargetPiece);
    this.field = tempThisField;

    return result;
  }

  canMove(target: Field): boolean {
    if(target.piece?.color === this.color)
      return false;
    if (
      (this.field.board.whiteKing.isChecked && this.color === 'w' && !this.savesKingFromAttack(target)) ||
      (this.field.board.blackKing.isChecked && this.color === 'b' && !this.savesKingFromAttack(target))
    ) return false;

    return true;
  }

  moveFigure(target: Field): void {}
}