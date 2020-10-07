import { FunctionComponent } from 'react'
import styles from '../styles/game.module.css'

type Props = {
    rotation: number
    positionX: number
    positionY: number
}

export const Ship: FunctionComponent<Props> = ({
    rotation,
    positionX,
    positionY
}) => (
    <div
                className={styles.ship}
                style={{
                    transform: `rotateZ(${rotation}deg)`,
                    bottom: positionY,
                    left: positionX
                }}
            >
                <svg>
                    <polygon
                        id="polygon"
                        points="0,50 25,0 50,50 25,0"
                        fill="none"
                        stroke="white"
                        stroke-width="2"
                    />
                </svg>
            </div>
)

export default Ship