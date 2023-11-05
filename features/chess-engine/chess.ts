import {Board} from "@/features/chess-engine/board/Board";

export class Chess {
  private readonly _boardSize: number;
  private board: Board;
  private turn: PieceColor;
  private kings: Record<PieceColor, PiecePosition>;
  private moveNumber;
  private history: ChessHistoryItem[];
  private castling: Record<PieceColor, boolean>;

  constructor(position: BoardPosition | null, boardSize: number) {
    this._boardSize = boardSize;
    this.kings = {
      w: {letter: 'e', index: 1}, b: {letter: 'e', index: 8}
    };
    this.turn = 'w';
    this.castling = { w: false, b: false };
    this.moveNumber = 0;
    this.history = [];

    if (!position ||
      position.length !== boardSize ||
      position.some(r => r.length !== boardSize)
    ) this.board = new Board();
    else this.board = new Board(position, boardSize);
    console.log(this.board);
  }

  public getBoard(): Board {
    return this.board;
  }

  public setBoard(board: Board): void {
    this.board = board;
  }

  public clear() {
    this.board = new Board();
  }
}