import React, {useEffect} from 'react';
import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { editable as e, SheetProvider } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";
import demoProjectState from './state.json'
import {OrbitControls} from "@react-three/drei";

studio.initialize();
studio.extend(extension)

const demoSheet = getProject('Demo Project', { state: demoProjectState  }).sheet('Demo Sheet')


function App() {

    useEffect(() => {
        demoSheet.project.ready.then(() => demoSheet.sequence.play({ iterationCount: 1, range: [0, 10] }))
    }, [])


    return (
        <Canvas
            style={{ height: '100vh', width: '100%' }}
        >
            <SheetProvider sheet={demoSheet}>
                <PerspectiveCamera theatreKey="Camera" makeDefault position={ [5,5,-5] } fov={75} />
                <OrbitControls />
                <ambientLight />
                <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
                <e.mesh theatreKey="Cube">
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="hotpink" />
                </e.mesh>
            </SheetProvider>
        </Canvas>
    );
}

export default App;
