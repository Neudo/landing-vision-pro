import React, {useEffect, useRef} from 'react';
import gsap from "gsap";
import { useGSAP,  } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);


function ContainerText() {
    const container = useRef();

    useEffect(() => {
        gsap.to(".container", {
            opacity: 1,
            scrollTrigger: {
                trigger: ".container",
                start: "top 50%",
                end: "10% 30%",
                markers: true,
                once: false,
            }
        })
    }, [])

    return (

        <>
            <h1 className="mainTitle hide-text">Welcome to the era of spatial computing.</h1>
            <div ref={container} className="container">

                <h2 className="secondaryTitle">Apple Vision Pro seamlessly blends digital content with your physical
                    space.</h2>
                <h2>You navigate simply by using your eyes, hands, and voice.</h2>
            </div>
        </>

    );
}

export default ContainerText;
