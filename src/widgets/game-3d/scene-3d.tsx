'use client'

import React, { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import {Board3D} from "./components/board/board-3d";
import Image from "next/image";
import './scene-3d.css';

export const Scene3d = () => {
    const containerRef = useRef(null);
    const btnLeave = useRef(null);

    return(
        <div className='container-scene'>
            <Canvas camera={{position: [40, 40, 95], zoom: 0.6}} style={{position: 'absolute'}}>
                <color attach='background' args={['#222226']}/>
                <ambientLight intensity={0.1}/>
                <pointLight position={[60, 10, 60]} intensity={10} decay={0.3} castShadow={true}/>
                <pointLight position={[-60, 10, 60]} intensity={10} decay={0.3} castShadow={true}/>
                <pointLight position={[60, 10, -60]} intensity={10} decay={0.3} castShadow={true}/>
                <pointLight position={[-60, 10, -60]} intensity={10} decay={0.3} castShadow={true}/>
                <Suspense fallback={'Loading...'}>
                    <Board3D />
                </Suspense>
                <OrbitControls />
            </Canvas> 
            <div className='interface'>
                <div className="data-left" ref={containerRef}>
                    <div className='info-user'>
                        <div className='container-user'>
                            <div className='img-user'>
                                <Image src='/assets/pieces-2d/bp.png'
                                       width={60}
                                       height={60}
                                       alt='pawn'
                                       className="icon-user"
                                       draggable={false}
                                />
                            </div>
                            <span className='user-name'>{'enemy'}</span>
                        </div>
                    </div>
                    <div className='info-user'>
                        <div className='container-user'>
                            <div className='img-user'>
                                <Image src='/assets/pieces-2d/wp.png'
                                       width={60}
                                       height={60}
                                       alt='pawn'
                                       className="icon-user"
                                       draggable={false}
                                />
                            </div>
                            <span className='user-name'>{'UserName'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn-leave" ref={btnLeave} onClick={() => {}}>
                Leave
            </button>
        </div>
    );
}