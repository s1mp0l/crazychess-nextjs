export const BoxEnemy = (props) => {
    return(
        <mesh position={props.position} onClick={() => {}}>
            <boxGeometry args={[12.7, 2.2, 12.7]} />
            <meshStandardMaterial color='#b31616' />
        </mesh>
    );
}