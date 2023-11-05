import {PieceSymbol} from "chess.js";
import {Field} from "@/features/chess-engine/board/Field";
import {StaticImageData} from "next/image";

export class Piece {
  color: PieceColor;
  logo: StaticImageData | null;
  field: Field;
  name: PieceSymbol;
  id: number;

  constructor(color: PieceColor, field: Field) {
    this.color = color;
    this.field = field;
    this.field.piece = this;
    this.logo = null;
    this.name = 'p';
    this.id = Math.random()
  }

  canMove(target: Field) : boolean {
    if(target.piece?.color === this.color)
      return false;
    if(target.piece?.name === 'k')
      return false;

    return true;
  }

  moveFigure(target: Field) {}
}