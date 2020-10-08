import { FunctionComponent } from 'react'
import { Coord } from '../state/common.types'
import styles from '../styles/game.module.css'

type Props = {
    positionX: number
    positionY: number
    points: Coord[]
}

export const Asteriod: FunctionComponent<Props> = ({
    positionX,
    positionY,
    points
}) => {
    // randomize size for an asteriod
    return (
        <div
            className={styles.asteroid}
            style={{
                bottom: positionY,
                left: positionX
            }}
        >
            <svg>
                <polygon
                    id="polygon"
                    points={points.map(
                        p => `${p.x},${p.y}`).join(' ')
                    }
                    fill="none"
                    stroke="white"
                    stroke-width="3"
                />
            </svg>
        </div>
        
    )
}

export default Asteriod