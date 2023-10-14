import {Field} from "../field/field";
import './fields.css'

interface FieldsProps {
  pieces?: IPiece[]
}

export const Fields = ({pieces} : FieldsProps) => {
  const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
  const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

  const fields = horizontalAxis.reverse().map(
    (horizontal, horIndex) => verticalAxis.map(
      (vertical, verIndex) => {
        let pieceIndex = pieces?.find(el => el.position === (horizontal + vertical));
        return <Field
          key={horizontal + vertical}
          piece={pieces && pieceIndex}
          position={horizontal + vertical}
          fieldColor={((horIndex + verIndex) % 2) === 1 ? 'b' : 'w'}/>
      }
    )
  )
  return (
    <div className='fields'>
      {fields}
    </div>
  );
};
