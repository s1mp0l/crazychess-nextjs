"use client"

import './field.css'
import {PieceComponent} from "@/entities/piece/piece";
import {Field} from "@/features/chess-engine/board/Field";

interface FieldProps {
  field: Field
  click: (field: Field) => void;
  selected?: boolean
}

const getFieldColor = (fieldColor: string) => {
  return fieldColor === 'b' ? '#7D945D' : '#EEEED5'
}

export const FieldComponent = ({field, click, selected}: FieldProps) => {
  const position = `${field.y}${field.x}`;
  return (
    <div className={[
      'field',
      selected ? 'selected' : '',
      field.available && field.piece ? 'availableEnemy' : ''
    ].join(' ')}
         style={{background: getFieldColor(field.color)}}
         data-id={position}
         onClick={() => click(field)}
    >
      {field.available && !field.piece && <div className={'availableEmpty'}/>}
      {field.piece && <PieceComponent piece={field.piece} />}
    </div>
  );
};