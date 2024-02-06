import {boardLetters} from "@/src/features/chess-engine/constants";
import {Pawn} from "@/src/features/chess-engine/pieces/basic/Pawn";
import {Rook} from "@/src/features/chess-engine/pieces/basic/Rook";
import {King} from "@/src/features/chess-engine/pieces/basic/King";
import {Knight} from "@/src/features/chess-engine/pieces/basic/Knight";
import {Bishop} from "@/src/features/chess-engine/pieces/basic/Bishop";
import {Queen} from "@/src/features/chess-engine/pieces/basic/Queen";
import {Piece} from "@/src/features/chess-engine/pieces/Piece";

export const cellIndexToLetter = (index: number): string => boardLetters[index];

export const letterToCellIndex = (letter: string): number => boardLetters.indexOf(letter);

export const stringToPieceMap: Record<PieceSymbol, typeof Piece> = {
  'p': Pawn,
  'r': Rook,
  'n': Knight,
  'b': Bishop,
  'q': Queen,
  'k': King
}

export const stringToPiece = (stringPiece: PieceString | null, field: IField): Piece | null => {
  if (!stringPiece) return null;
  const pieceTypeLetter = stringPiece[1].toLowerCase();
  const pieceColor = stringPiece[0];

  const pieceType = stringToPieceMap[pieceTypeLetter as PieceSymbol]
  return new pieceType(pieceColor as PieceColor, field);
}