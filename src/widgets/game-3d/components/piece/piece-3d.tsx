import {BishopModel} from "@/src/widgets/game-3d/components/pieces/Bishop-3d";
import {HorseModel} from "@/src/widgets/game-3d/components/pieces/Horse-3d";
import {KingModel} from "@/src/widgets/game-3d/components/pieces/King-3d";
import {PawnModel} from "@/src/widgets/game-3d/components/pieces/Pawn-3d";
import {QueenModel} from "@/src/widgets/game-3d/components/pieces/Queen-3d";
import {RookModel} from "@/src/widgets/game-3d/components/pieces/Rook-3d";
import {createElement, FunctionComponent} from "react";

interface Piece3dProps {
  piece: IPiece | null;
}

interface PieceModelProps {
  color: PieceColor;
}

const pieceToModelDict: Record<PieceSymbol, FunctionComponent<PieceModelProps>> = {
  'p': PawnModel,
  'r': RookModel,
  'n': HorseModel,
  'b': BishopModel,
  'q': QueenModel,
  'k': KingModel
}

export const Piece3D = (props: Piece3dProps) => {
  const {piece} = props;

  return piece ? createElement(pieceToModelDict[piece.name], {color: piece.color}) : null;
};