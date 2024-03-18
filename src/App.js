import React, {useEffect} from 'react';
import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { editable as e, SheetProvider } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";
import demoProjectState from './state.json'
import {Environment, OrbitControls} from "@react-three/drei";
import {VisionPro} from "./models/VisionPro";
import Header from "./components/Layout/Header";
import { useControls } from 'leva'



studio.initialize();
studio.extend(extension)

const demoSheet = getProject('Demo Project', { state: demoProjectState  }).sheet('Demo Sheet')

document.body.classList.add('no-scroll');
function App() {

    const handleScroll = () => {
        document.body.classList.remove('no-scroll');
        document.querySelector('span').classList.remove('hidden')
    }

    useEffect(() => {
        setTimeout(() => {
        handleScroll()
        }, 4000)
        demoSheet.project.ready.then(() => demoSheet.sequence.play({ iterationCount: 1, range: [0, 10] }))
    }, [])

    const { position, rotationY,rotationX } = useControls({
        position: { value: [0, 0, 0], min: -10, max: 10, step: .1 },
        rotationY: { value: 1.02, min: 0, max: 5, step: 0.01 },
        rotationX: { value: 0, min: 0, max: 5, step: 0.01 },

    })

    return (

        // Scene
        <>
            <Header/>
        <Canvas
            style={{ height: '100vh', width: '100%', position: "fixed" }}
        >
            {/*<OrbitControls />*/}
            <Environment
                preset="apartment" />
            <SheetProvider sheet={demoSheet}>
                <PerspectiveCamera theatreKey="Camera" makeDefault position={ [-8,-.8,6.8] } fov={75} />
                <ambientLight />
                <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
                <VisionPro scale={20} rotation-y={rotationY} rotation-x={rotationX} position={ position } />
            </SheetProvider>
        </Canvas>

            <div className="container">
                <h2>Welcome to the era of spatial computing.</h2>
                <h2>Apple Vision Pro seamlessly blends digital content with your physical space.</h2>
                <h2>You navigate simply by using your eyes, hands, and voice.</h2>
            </div>

        </>

    );
}

export default App;
