import { FunctionComponent, useState, useEffect } from 'react'
import styles from '../styles/dots.module.css'

type Coord = {
    x: number,
    y: number
}

type Props = {
    dir: number,
    size: number,
    speedX: number,
    speedY: number
}

export const Dot: FunctionComponent<Props> = ({ dir = -1, size = 50, speedX = 15, speedY = 5 }) => {
    const [{ x, y }, setPosition] = useState<Coord>({ x: 0, y: 0 })
    
    useEffect(() => {
        requestAnimationFrame(() => {
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
            
            setPosition({ 
                x: nextX,
                y: nextY
            })
        })
    });
    return <div
        style={{ top: y, left: x, width: size, height: size }}
        className={styles.dot}
    />
}
    
