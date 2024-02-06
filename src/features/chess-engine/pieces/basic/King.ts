import {Field} from "@/src/features/chess-engine/board/Field";
import whiteLogo from '@/public/assets/pieces-2d/wk.png';
import blackLogo from '@/public/assets/pieces-2d/bk.png';
import {Piece} from "@/src/features/chess-engine/pieces/Piece";


export class King extends Piece implements IKing {
  public isChecked = false;

  constructor(color: PieceColor, field: IField) {
    super(color, field);
    this.logo = color === 'b' ? blackLogo : whiteLogo;
    this.name = 'k';
  }

  canMove(target: IField): boolean {
    if(!super.canMove(target))
      return false;
    const dx = Math.abs(this.field.x - target.x);
    const dy = Math.abs(this.field.y - target.y);

    return (dx === 1 && dy === 1) || (dx === 0 && dy === 1) ||
      (dx === 1 && dy === 0);
  }

  moveFigure(target: Field) {
    super.moveFigure(target);
    this.isChecked = false;
  }
}