import {DoubleSide} from "three";

export const BoxSelect = (props) => {
    return(
        <mesh position={props.position} rotation={[-1.5709, 0, 0]}>
            {/*<boxGeometry args={[12.7, 2.2, 12.7]}/>*/}
            <ringGeometry args={[4.5, 5.5, 30]}/>
            <meshStandardMaterial color='#ad980e' side={DoubleSide}/>
        </mesh>
    );
}