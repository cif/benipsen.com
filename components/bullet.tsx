import { FunctionComponent } from 'react'
import styles from '../styles/game.module.css'

type Props = {
    positionX: number
    positionY: number

}

export const Bullet: FunctionComponent<Props> = ({
    positionX,
    positionY
}) => {
    // randomize size for an asteriod
    return (
        <div
            className={styles.bullet}
            style={{
                bottom: positionY,
                left: positionX
            }}
        >
           <svg>
                <polygon
                    id="polygon"
                    points="0,0 2,0 2,2 0,2 0,0"
                    fill="none"
                    stroke="white"
                    stroke-width="3"
                />
            </svg>
        </div>
        
    )
}

export default Bullet