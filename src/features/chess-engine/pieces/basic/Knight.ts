import {Piece} from "@/src/features/chess-engine/pieces/Piece";
import {Field} from "@/src/features/chess-engine/board/Field";

import whiteLogo from '@/public/assets/pieces-2d/wn.png';
import blackLogo from '@/public/assets/pieces-2d/bn.png';


export class Knight extends Piece {

  constructor(color: PieceColor, field: Field) {
    super(color, field);
    this.logo = color === 'b' ? blackLogo : whiteLogo;
    this.name = 'n';
  }

  canMove(target: Field): boolean {
    if(!super.canMove(target))
      return false;
    const dx = Math.abs(this.field.x - target.x);
    const dy = Math.abs(this.field.y - target.y);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
  }
}