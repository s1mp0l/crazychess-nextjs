import './piece.css'
import {Piece} from "@/features/chess-engine/pieces/Piece";
import {ItemTypes} from "@/entities/board/lib/constants";
import {useDrag} from "react-dnd";
import {Field} from "@/features/chess-engine/board/Field";
import {useEffect} from "react";

interface PieceProps {
  piece: IPiece;
  dragPiece: (field: Field) => void;
}

export const PieceComponent = ({piece, dragPiece}: PieceProps) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.PIECE,
    collect: monitor => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  }))

  useEffect(() => {
    if (isDragging) dragPiece(piece.field);
  }, [isDragging, dragPiece, piece.field]);

  return (
    <div className="piece"
         style={{backgroundImage: `url(${piece.logo?.src})`, backgroundColor: 'transparent'}}
         ref={drag}
    />
  );
};