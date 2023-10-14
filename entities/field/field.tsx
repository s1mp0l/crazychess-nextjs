import './field.css'
import {Piece} from "../pieces/piece/piece";

interface FieldProps {
  position: string
  fieldColor: pieceColor
  piece?: IPiece
}

const getFieldColor = (fieldColor: string) => {
  return fieldColor === 'b' ? '#7D945D' : '#EEEED5'
}

export const Field = ({position, fieldColor, piece}: FieldProps) => {
  return (
    <div className='field' style={{background: getFieldColor(fieldColor)}} data-id={position}>
      {piece && <Piece piece={piece} />}
    </div>
  );
};