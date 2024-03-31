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
import ContainerText from "./components/ContainerText";

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
        let scrollableElement = document.body;
        scrollableElement.addEventListener('wheel', checkScrollDirection)

        function checkScrollDirection(event) {
            if(visionProIsRotatableRef.current){
                if (checkScrollDirectionIsUp(event)) {
                    visionProRef.current.rotation.y -= 0.002;
                } else {
                    visionProRef.current.rotation.y += 0.002;
                }
            } else {
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
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const intersecting = entry.isIntersecting
                if(intersecting ){
                    setVisionProIsRotatable(true)
                    document.body.classList.add('no-scroll');
                    if(document.body.classList.contains('no-scroll')){
                        setTimeout(() => {
                            document.body.classList.remove('no-scroll');
                        }, 2000)
                    }
                    visionProRight.project.ready.then(() => visionProRight.sequence.play({ iterationCount: 1, range: [0, 2] }).then(rotateOnScroll))
                } else if(!intersecting){
                    setVisionProIsRotatable(false)
                    visionProRight.project.ready.then(() => visionProRight.sequence.play({ iterationCount: 1, direction: 'reverse', rate: 1.5, range: [0, 1.8] }))
                }
            })
        })
        observer.observe(document.querySelector('.page2'))
    }

    useEffect(() => {
        setTimeout(() => {
            handleScrollOptions()
        }, 4000)
        demoSheet.project.ready.then(() => demoSheet.sequence.play({ iterationCount: 1, range: [0, 5] }))
        moveVisionToPositionRight()
    }, [])


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
                        <VisionPro scale={20} rotation-y={1.02} position={[0, 0, 0]}/>
                    </e.group>
                </SheetProvider>

            </Canvas>
            <ContainerText/>



        </>

    );
}

export default App;
