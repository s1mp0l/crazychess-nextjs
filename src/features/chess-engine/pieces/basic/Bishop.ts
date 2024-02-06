import {Piece} from "@/src/features/chess-engine/pieces/Piece";
import {Field} from "@/src/features/chess-engine/board/Field";

import whiteLogo from '@/public/assets/pieces-2d/wb.png';
import blackLogo from '@/public/assets/pieces-2d/bb.png';


export class Bishop extends Piece {

  constructor(color: PieceColor, field: Field) {
    super(color, field);
    this.logo = color === 'b' ? blackLogo : whiteLogo;
    this.name = 'b';
  }

  canMove(target: Field): boolean {
    if (!super.canMove(target))
      return false;
    if (this.field.isEmptyDiagonal(target))
      return true;

    return false;
  }
}