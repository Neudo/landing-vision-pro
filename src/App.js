import React, {useEffect, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { editable as e, SheetProvider } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";
import demoProjectState from './state.json'
import visionRightState from './state-vision-right.json'
import {Environment, OrbitControls} from "@react-three/drei";
import {VisionPro} from "./models/VisionPro";
import Header from "./components/Layout/Header";
import { useControls } from 'leva'



studio.initialize();
studio.extend(extension)

const demoSheet = getProject('Demo Project', { state: demoProjectState  }).sheet('Demo Sheet')
const visionProRight = getProject('Vision Pro Right', { state: visionRightState  }).sheet('Vision Pro Right')

document.body.classList.add('no-scroll');
function App() {
    const [alreadyPlayed, setAlreadyPlayed] = useState(false)


    const handleScrollOptions = () => {
        document.body.classList.remove('no-scroll');
        document.querySelector('span').classList.remove('hidden')
    }

    const moveVisionToPostionRight = () => {

        console.log(alreadyPlayed)

            if(window.scrollY === 149){
               visionProRight.project.ready.then(() => visionProRight.sequence.play({ iterationCount: 1, range: [0, 2] }))
                setAlreadyPlayed(true)
            } else if(window.scrollY <= 148 && alreadyPlayed === true) {
                console.log('else')
                visionProRight.project.ready.then(() => visionProRight.sequence.play({ iterationCount: 1, range: [0, 2], direction: 'reverse' }))
            }
    }

    window.addEventListener('scroll', moveVisionToPostionRight)

    useEffect(() => {
        setTimeout(() => {
            handleScrollOptions()
        }, 4000)
        demoSheet.project.ready.then(() => demoSheet.sequence.play({ iterationCount: 1, range: [0, 5] }))
    }, [])

    const { position, rotationY, scale } = useControls({
        position: { value: [0, 0, 0], min: -30, max: 30, step: .1 },
        rotationY: { value: 1.02, min: 0, max: 5, step: 0.01 },
        scale: { value: 20, min: 10, max: 80, step: 0.1 },
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
                </SheetProvider>
                <SheetProvider sheet={visionProRight}>
                    <e.group theatreKey="VisionPro">
                        <VisionPro scale={scale} rotation-y={rotationY} position={ position } />
                    </e.group>
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
