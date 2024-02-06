import React from "react";
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from "three";
import {Field} from "@/src/features/chess-engine/board/Field";
import {Piece3D} from "@/src/widgets/game-3d/components/piece/piece-3d";

interface Field3dProps {
    args: any;
    color: any;
    position: any;
    field?: Field;
}

export const Field3d = (props: Field3dProps) => {
    const { args, color, position, field } = props;

    const baseColorUrl1 = '/assets/textures/white/Plastic_002_basecolor.jpg';
    const ambientOclussionUrl1 = '/assets/textures/white/Plastic_002_ambientOcclusion.jpg';
    const heightUrl1 = '/assets/textures/white/Plastic_002_height.png';
    const normalUrl1 = '/assets/textures/white/Plastic_002_normal.jpg';
    const roughnessUrl1 = '/assets/textures/white/Plastic_002_roughness.jpg';
    const baseColorUrl2 = '/assets/textures/black/Terrazzo_002_basecolor.jpg';
    const ambientOclussionUrl2 = '/assets/textures/black/Terrazzo_002_ambientOcclusion.jpg';
    const heightUrl2 = '/assets/textures/black/Terrazzo_002_height.png';
    const normalUrl2 = '/assets/textures/black/Terrazzo_002_normal.jpg';
    const roughnessUrl2 = '/assets/textures/black/Terrazzo_002_roughness.jpg';

    // @ts-ignore
    const [baseColor1, ambientOclussion1, height1, normal1, roughness1] = useLoader(TextureLoader, [
        baseColorUrl1,
        ambientOclussionUrl1,
        heightUrl1,
        normalUrl1,
        roughnessUrl1
    ]);

    // @ts-ignore
    const [baseColor2, ambientOclussion2, height2, normal2, roughness2] = useLoader(TextureLoader, [
        baseColorUrl2,
        ambientOclussionUrl2,
        heightUrl2,
        normalUrl2,
        roughnessUrl2
    ]);

    return(
        <mesh position={position}>
            <boxGeometry args={args}/>
            <meshStandardMaterial displacementScale={0.001} 
             alphaTest={0.5}
             side={THREE.DoubleSide}
             map={color ? baseColor1 : baseColor2}
             aoMap={color ? ambientOclussion1 : ambientOclussion2}
             normalMap={color ? normal1 : normal2}
             roughnessMap={color ? roughness1 : roughness2}
             displacementMap={color ? height1 : height2}
            />
            {field?.piece && <Piece3D piece={field.piece} />}
        </mesh>
    );
};