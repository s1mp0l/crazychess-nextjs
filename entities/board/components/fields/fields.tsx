"use client"

import './fields.css'
import {FieldComponent} from "@/entities/board/components/field/field";
import {Field} from "@/features/chess-engine/board/Field";

interface FieldsProps {
  fields?: Field[][];
  selectedField?: Field | null;
  click: (field: Field) => void;
}

export const FieldsComponent = ({fields, click, selectedField}: FieldsProps) => {
  console.log('fields')
  const fieldsComponents = fields ? fields.map((row) => (
    row.map(f => <FieldComponent
        click={click}
        key={f.x + f.y}
        field={f}
        selected={selectedField ? (selectedField.x === f.x && selectedField.y === f.y) : false}
      />
    )
  )) : <></>;
  return (
    <div className='fields'>
      {fieldsComponents}
    </div>
  );
};
