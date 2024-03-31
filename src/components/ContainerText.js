import React, {useEffect, useRef} from 'react';
import {gsap} from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


function ContainerText() {
    const container = useRef();



    useEffect(() => {
        const titles = document.querySelectorAll('h2')
        let ctx = gsap.context(() => {

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".page",
                    start: "top 40%",
                    end: "bottom 57%",
                    pin: true,
                    pinSpacing: false,
                    markers: false,
                    onEnter: () => {
                        setTimeout(() => {
                            document.querySelector('h1').classList.remove('hide-text')
                        }, 400)
                    },
                    onLeaveBack: () => {
                        setTimeout(() => {
                            document.querySelector('h1').classList.add('hide-text')
                        }, 400)
                    },
                    onEnterBack: () => {
                        setTimeout(() => {
                            document.querySelector('h1').classList.remove('hide-text')
                        }, 400)
                    },
                }
            });

            tl.to(".page", {}).pause()

            titles.forEach((title, index) => {

                gsap.to(title, {
                    opacity: 1,
                    scale: 1,
                    duration: .4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 90%",
                        markers: true,
                        once: false,
                    },
                })
            })
        }, container); // <- selector scoping
        return () => ctx.revert();
    }, [])



    return (
        <>
            <div ref={container} className="container">
                <div className="page">
                    <h1 className="mainTitle hide-text" >Welcome to the era of spatial computing.</h1>
                </div>
                <div className="page2">
                    <h2>Apple Vision Pro seamlessly blends digital content with your physical space.</h2>
                    <h2>You navigate simply by using your eyes, hands, and voice.</h2>
                    <h2>So you can do the things you love in ways never before possible.</h2>
                    <h2>You’ve never seen everything like this before.</h2>
                </div>
            </div>

            <div className="finalRoom"></div>
        </>
    );
}

export default ContainerText;
