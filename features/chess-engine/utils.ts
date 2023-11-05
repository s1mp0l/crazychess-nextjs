import {boardLetters} from "@/features/chess-engine/constants";
import {Pawn} from "@/features/chess-engine/pieces/basic/Pawn";
import {Piece} from "@/features/chess-engine/pieces/Piece";
import {PieceSymbol} from "chess.js";
import {Rook} from "@/features/chess-engine/pieces/basic/Rook";
import {King} from "@/features/chess-engine/pieces/basic/King";
import {Knight} from "@/features/chess-engine/pieces/basic/Knight";
import {Bishop} from "@/features/chess-engine/pieces/basic/Bishop";
import {Queen} from "@/features/chess-engine/pieces/basic/Queen";
import {Field} from "@/features/chess-engine/board/Field";

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

export const stringToPiece = (stringPiece: PieceString | null, field: Field): Piece | null => {
  if (!stringPiece) return null;
  const pieceTypeLetter = stringPiece[1].toLowerCase();
  const pieceColor = stringPiece[0];

  const pieceType = stringToPieceMap[pieceTypeLetter as PieceSymbol]
  return new pieceType(pieceColor as PieceColor, field);
}