import React, {useRef, useState} from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import {Board} from "@/src/features/chess-engine/board/Board";
import {Fields3D} from "../fields/fields-3d";

export const Board3D = () => {

    const baseColorUrl = './../../assets/textures/white/Plastic_002_basecolor.jpg';
    const ambientOclussionUrl = './../../assets/textures/white/Plastic_002_ambientOcclusion.jpg';
    const heightUrl = './../../assets/textures/white/Plastic_002_height.png';
    const normalUrl = './../../assets/textures/white/Plastic_002_normal.jpg';
    const roughnessUrl = './../../assets/textures/white/Plastic_002_roughness.jpg';

    const [baseColor, ambientOclussion, height, normal, roughness] = useLoader(TextureLoader, [
        baseColorUrl,
        ambientOclussionUrl,
        heightUrl,
        normalUrl,
        roughnessUrl
    ]);
    const meshRef = useRef(null);

    const [board, setBoard] = useState(new Board());

    return(
        <mesh ref={meshRef}>
            <boxGeometry args={ [115, 10, 115] }/>
            <meshStandardMaterial map={baseColor}
             aoMap={ambientOclussion}
             displacementMap={height}
             normalMap={normal}
             roughnessMap={roughness}
             displacementScale={0.01}
            />
            <mesh>
                <boxGeometry args={ [100, 10, 100] }/>
                <meshStandardMaterial visible={ false }/>
                <Fields3D fields={board.fields} />
            </mesh>
        </mesh>
    );
}