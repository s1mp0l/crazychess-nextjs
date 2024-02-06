import {Field} from "@/src/features/chess-engine/board/Field";
import {Field3d} from "@/src/widgets/game-3d/components/field/field-3d";

interface Fields3dProps {
  fields: Field[][];
}

export const Fields3D = (props: Fields3dProps) => {
  const {fields} = props;

  console.log(fields)

  let x = 43.75 + 12.5; //
  let z = 43.75 + 12.5 //

  const fieldsComponents = fields.map(row => {
    z -= 12.5;
    x = 43.75 + 12.5;
    return row.map(f => {
        x -= 12.5;
        return <Field3d
          args={[12.5, 10, 12.5]}
          color={f.color === 'w'}
          position={[x, 1, z]}
          key={f.x + f.y}
          field={f}
        />
      }
    )
  });
  return (
    <>
      {fieldsComponents}
    </>
  );
};