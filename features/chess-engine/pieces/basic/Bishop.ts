import {Piece} from "@/features/chess-engine/pieces/Piece";
import {Field} from "@/features/chess-engine/board/Field";

import whiteLogo from './../../../../public/assets/pieces/wb.png';
import blackLogo from './../../../../public/assets/pieces/bb.png';


export class Bishop extends Piece {

  constructor(color: PieceColor, field: Field) {
    super(color, field);
    this.logo = color === 'b' ? blackLogo : whiteLogo;
    this.name = 'b';
  }

  canMove(target: Field): boolean {
    if(!super.canMove(target))
      return false;
    if(this.field.isEmptyDiagonal(target))
      return true
    return false
  }
}