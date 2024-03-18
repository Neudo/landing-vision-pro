import React, {useEffect} from 'react';
import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { editable as e, SheetProvider } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";
import demoProjectState from './state.json'
import {OrbitControls} from "@react-three/drei";
import {VisionPro} from "./models/VisionPro";
import Header from "./components/Layout/Header";


studio.initialize();
studio.extend(extension)

const demoSheet = getProject('Demo Project', { state: demoProjectState  }).sheet('Demo Sheet')


function App() {

    useEffect(() => {
        demoSheet.project.ready.then(() => demoSheet.sequence.play({ iterationCount: 1, range: [0, 10] }))
    }, [])


    return (

        // Scene
        <>
            <Header/>
        <Canvas
            style={{ height: '100vh', width: '100%' }}
        >
            {/*<OrbitControls />*/}
            <SheetProvider sheet={demoSheet}>
                <PerspectiveCamera theatreKey="Camera" makeDefault position={ [-3.5,-2.1,6.8] } fov={75} />
                <ambientLight />
                <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
                <VisionPro scale={20} rotation-y={.5} position={ [-3, 0,0] } />
            </SheetProvider>
        </Canvas>

            <div className="container">
                <h2>Welcome to the era of spatial computing.</h2>
            </div>


            {/*// Html*/}

        </>

    );
}

export default App;
