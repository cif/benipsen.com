import { FunctionComponent, useState, useEffect } from 'react'
import { Dot } from './dot';

type Props = {
    partyLevel: number
}

type DotState = {
    dir: number,
    size: number,
    speedX: number,
    speedY: number,
    x: number
    y: number,
    opacity: number
}

const generateDots = (partyLevel: number) =>
    new Array(partyLevel).fill(0).map(() => ({
        dir: Math.random() < 0.5 ? 1 : -1,
        size: Math.random() * 100,
        speedX: Math.random() * 20,
        speedY: Math.random() * 20,
        x: 0,
        y: 0,
        opacity: Math.random()
    })
)

const computeNextDotProps = ({ dir, size, speedX, speedY, x, y, opacity }): DotState => { 
    const reachedXbound = dir > 0
        ? x - size > window.innerWidth
        : x < size * -1
    
    const resetX = dir > 0
        ? 0
        : window.innerWidth + size;
    
    const reachedYbound = dir > 0
        ? y - size > window.innerHeight
        : y < size * -1
    
    const resetY = dir > 0
        ? 0
        : window.innerHeight + size;
    
    const nextX = reachedXbound
        ? resetX
        : x + speedX * dir;
    
    const nextY = reachedYbound 
        ? resetY
        : y + speedY * dir;
    
    return { 
        x: nextX,
        y: nextY,
        size,
        dir,
        speedX,
        speedY,
        opacity
    }
}


export const Dots: FunctionComponent<Props> = ({ partyLevel = 0 }) => {
    const [dots, setDots] = useState([]) 
     // animate the dots all the time
     useEffect(() => {
        const raf = requestAnimationFrame(() => {
            setDots(dots.map(computeNextDotProps))
        })
        return () => cancelAnimationFrame(raf)
     }, [dots]);
    
    // only generate dots when party level changes
    useEffect(() => {
        const newDots = generateDots(partyLevel);
        setDots(newDots)
    }, [partyLevel])

   
    return <>{dots.map((props, i) => {
        const { x, y, opacity, size } = props;
        return <Dot
            key={`ball${i}`}
            x={x}
            y={y}
            size={size}
            opacity={opacity}
        />
    })}</>
}
    
