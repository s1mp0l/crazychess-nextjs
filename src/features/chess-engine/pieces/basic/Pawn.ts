import {Piece} from "@/src/features/chess-engine/pieces/Piece";
import {Field} from "@/src/features/chess-engine/board/Field";

import whiteLogo from '@/public/assets/pieces-2d/wp.png';
import blackLogo from '@/public/assets/pieces-2d/bp.png';


export class Pawn extends Piece {

  private isFirstStep: boolean = true;

  constructor(color: PieceColor, field: Field) {
    super(color, field);
    this.logo = color === 'b' ? blackLogo : whiteLogo;
    this.name = 'p';
  }

  canMove(target: Field): boolean {
    if(!super.canMove(target))
      return false;
    const direction = this.field.piece?.color === 'b' ? 1 : -1
    const firstStepDirection = this.field.piece?.color === 'b' ? 2 : -2

    if ((target.y === this.field.y + direction || this.isFirstStep
        && (target.y === this.field.y + firstStepDirection))
      && target.x === this.field.x
      && this.field.board.getField(target.x, target.y).isEmpty()) {
      return true;
    }

    if (target.y === this.field.y + direction
      && (target.x === this.field.x + 1 || target.x === this.field.x - 1)
      && this.field.isEnemy(target)) {
      return true;
    }

    return false;
  }

  moveFigure(target: Field) {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}