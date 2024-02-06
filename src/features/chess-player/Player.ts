export class Player {
  public color: PieceColor;
  public hasToMove: boolean;
  public name: string;

  constructor(
    color: PieceColor,
    name: string,
  ) {
    this.name = name;
    this.color = color;
    this.hasToMove = color === 'w';
  }
}