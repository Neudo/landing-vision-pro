import React, {useEffect, useRef} from 'react';
import {gsap} from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


function ContainerText() {
    const container = useRef();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(".page", {
                scrollTrigger: {
                    trigger: ".page",
                    start: "top top",
                    end: "bottom 30%",
                    pin: true,
                    pinSpacing: false,
                    markers: true
                }
            });
        }, container); // <- selector scoping
        return () => ctx.revert();
    }, [])

    return (
        <div ref={container} className="App">

            <div className="separator"></div>
            <div className="page">
                <h1>Welcome to the era of spatial computing.</h1>
            </div>

            <div className="page2">
                <h2>Apple Vision Pro seamlessly blends digital content with your physical space.</h2>
            </div>

            <div className="page3">
                <h2>You navigate simply by using your eyes, hands, and voice.</h2>
            </div>
        </div>
    );
}

export default ContainerText;
