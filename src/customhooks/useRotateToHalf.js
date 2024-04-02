import {useState} from "react";
import {useFrame} from "@react-three/fiber";

export function useRotateToHalf(currentRotation) {
    // if (currentRotation !== null){
        useFrame((state, delta) => {
            const angle = state.clock.elapsedTime
            console.log(angle)
        })
    // }
}
