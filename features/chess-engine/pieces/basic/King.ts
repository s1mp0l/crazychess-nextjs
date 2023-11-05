import {Piece} from "@/features/chess-engine/pieces/Piece";
import {Field} from "@/features/chess-engine/board/Field";

import whiteLogo from './../../../../public/assets/pieces/wk.png';
import blackLogo from './../../../../public/assets/pieces/bk.png';


export class King extends Piece {

  constructor(color: PieceColor, field: Field) {
    super(color, field);
    this.logo = color === 'b' ? blackLogo : whiteLogo;
    this.name = 'k';
  }

  canMove(target: Field): boolean {
    if(!super.canMove(target))
      return false;
    const dx = Math.abs(this.field.x - target.x);
    const dy = Math.abs(this.field.y - target.y);

    return (dx === 1 && dy === 1) || (dx === 0 && dy === 1) ||
      (dx === 1 && dy === 0);
  }
}