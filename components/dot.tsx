import { FunctionComponent } from 'react'
import styles from '../styles/dots.module.css'

export type DotProps = {
    x: number,
    y: number
    size: number,
    opacity: number
}

export const Dot: FunctionComponent<DotProps> = ({ x, y, size, opacity }) => {
    // const [{ x, y }, setPosition] = useState<Coord>({ x: 0, y: 0 })
    
    // useEffect(() => {
    //     requestAnimationFrame(() => setPosition(computeNextPosition({ dir, size, speedX, speedY, x, y })))
    // });
    return <div
        style={{
            top: y,
            left: x,
            width: size,
            height: size,
            opacity
        }}
        className={styles.dot}
    />
}
    
