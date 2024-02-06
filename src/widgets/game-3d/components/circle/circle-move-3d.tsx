export const CircleMove = (props) => {
    return(
        <mesh position={props.position} onClick={() => {}}>
            <cylinderGeometry args={[2.5, 2.5, 0.4, 64]}/>
            <meshStandardMaterial color='#D8D8D8'/>
        </mesh>
    );
}