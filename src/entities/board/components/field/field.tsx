import './field.css'
import {PieceComponent} from "@/src/entities/piece/piece";
import {Field} from "@/src/features/chess-engine/board/Field";
import {useDrop} from "react-dnd";
import {ItemTypes} from "@/src/entities/board/lib/constants";

interface FieldProps {
  field: Field
  click: (field: Field) => void;
  selected?: boolean;
  dragPiece: (field: Field) => void;
  dropPiece: (field: Field) => void;
}

const getFieldColor = (fieldColor: string) => {
  return fieldColor === 'b' ? '#7D945D' : '#EEEED5'
}

export const FieldComponent = ({field, click, selected, dragPiece, dropPiece}: FieldProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PIECE,
    drop: () => {
      dropPiece(field)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }), [field, dropPiece])

  const position = `${field.y}${field.x}`;
  return (
    <div className={[
      'field',
      selected ? 'selected' : '',
      field.available && field.piece ? 'availableEnemy' : ''
    ].join(' ')}
         style={{background: isOver ? 'yellow' : getFieldColor(field.color)}}
         data-id={position}
         onClick={() => click(field)}
         ref={drop}
         // onMouseDown={startPieceDragHandler}
         // onMouseMove={dragPieceHandler}
         // onMouseUp={dropPieceHandler}
    >
      {field.available && !field.piece && <div className={'availableEmpty'}/>}
      {field.piece && <PieceComponent piece={field.piece} dragPiece={dragPiece}/>}
    </div>
  );
};