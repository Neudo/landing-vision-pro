import React, {useEffect, useRef, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { editable as e, SheetProvider } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";
import demoProjectState from './state.json'
import visionRightState from './state-vision-right.json'
import {Environment} from "@react-three/drei";
import {VisionPro} from "./models/VisionPro";
import Header from "./components/Layout/Header";
import { useControls } from 'leva'

studio.initialize();
studio.extend(extension)

const demoSheet = getProject('Demo Project', { state: demoProjectState  }).sheet('Demo Sheet')
const visionProRight = getProject('Vision Pro Right', { state: visionRightState  }).sheet('Vision Pro Right')
document.body.classList.add('no-scroll');

function App() {
    const handleScrollOptions = () => {
        document.body.classList.remove('no-scroll');
        document.querySelector('span').classList.remove('hidden')
    }
    const visionProRef = useRef()
    const [visionProIsRotatable, setVisionProIsRotatable] = useState(false)
    const visionProIsRotatableRef = useRef(visionProIsRotatable);

    useEffect(() => {
        visionProIsRotatableRef.current = visionProIsRotatable;
    }, [visionProIsRotatable]);


    const rotateOnScroll = () => {
        var scrollableElement = document.body;
        scrollableElement.addEventListener('wheel', checkScrollDirection)

        function checkScrollDirection(event) {
            if(visionProIsRotatableRef.current){
                setTimeout(() => {
                    document.body.classList.remove('no-scroll');
                }, 2000)
                if (checkScrollDirectionIsUp(event)) {
                    visionProRef.current.rotation.y -= 0.002;
                } else {
                    visionProRef.current.rotation.y += 0.002;
                }
            } else {
                console.log('remove listener')
                document.body.removeEventListener('wheel', checkScrollDirection)
            }
        }

        function checkScrollDirectionIsUp(event) {
            if (event.wheelDelta) {
                return event.wheelDelta > 0;
            }
            return event.deltaY < 0;
        }
    }


    const moveVisionToPositionRight = () => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const intersecting = entry.isIntersecting
                if(intersecting ){
                    document.querySelector('.mainTitle').classList.remove('hide-text')
                    setVisionProIsRotatable(true)
                    document.body.classList.add('no-scroll');
                    visionProRight.project.ready.then(() => visionProRight.sequence.play({ iterationCount: 1, range: [0, 2] }).then(rotateOnScroll))
                } else if(!intersecting) {
                    document.querySelector('.mainTitle').classList.add('hide-text')
                    setVisionProIsRotatable(false)
                    visionProRight.project.ready.then(() => visionProRight.sequence.play({ iterationCount: 1, direction: 'reverse', rate: 1.5, range: [0, 1.8] }))
                }
            })
        })
        observer.observe(document.querySelector('.container'))


        const observerSecondaryTitle = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const intersecting = entry.isIntersecting
                if(intersecting ){
                    document.querySelector('.mainTitle').classList.remove('hide-text')
                } else if(!intersecting) {
                    document.querySelector('.mainTitle').classList.add('hide-text')
                }
            })
        })
        observerSecondaryTitle.observe(document.querySelector('.secondaryTitle'))
    }

    useEffect(() => {
        setTimeout(() => {
            handleScrollOptions()
        }, 4000)
        demoSheet.project.ready.then(() => demoSheet.sequence.play({ iterationCount: 1, range: [0, 5] }))
        moveVisionToPositionRight()
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
                style={{height: '100vh', width: '100%', position: "fixed"}}
            >
                <Environment
                    preset="apartment"/>
                <SheetProvider sheet={demoSheet}>
                    <PerspectiveCamera theatreKey="Camera" makeDefault position={[-8, -.8, 6.8]} fov={75}/>
                    <ambientLight/>
                    <e.pointLight theatreKey="Light" position={[10, 10, 10]}/>
                </SheetProvider>
                <SheetProvider sheet={visionProRight}>
                    <e.group ref={visionProRef} theatreKey="VisionPro">
                        <VisionPro scale={scale} rotation-y={rotationY} position={position}/>
                    </e.group>
                </SheetProvider>

            </Canvas>

            <h2 className="mainTitle hide-text">Welcome to the era of spatial computing.</h2>


            <div className="container">
                <h2 className="secondaryTitle">Apple Vision Pro seamlessly blends digital content with your physical space.</h2>
                <h2>You navigate simply by using your eyes, hands, and voice.</h2>
            </div>

        </>

    );
}

export default App;
