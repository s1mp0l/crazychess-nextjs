import { useGLTF } from '@react-three/drei';

export function BishopModel(props) {
  const { nodes, materials } = useGLTF('/assets/pieces-3d/models/bishop.gltf');

  return (
    <group {...props} dispose={null} onClick={() => () => {}}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.02, 5, 0]} scale={280}>
            <mesh geometry={nodes.Object_6.geometry} material={props.color === 'w' ? materials.White_Square : materials.Black_Square} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/pieces-3d/models/bishop.gltf')
