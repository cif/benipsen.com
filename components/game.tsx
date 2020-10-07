
import { FunctionComponent, useContext } from 'react'
import { GameStateContext, GameProvider } from '../state/game.state';
import Asteriod from './asteriod';
import Ship from './ship';
import styles from '../styles/game.module.css'
import Bullet from './bullet';

export const Game: FunctionComponent<any> = () => {
    const {
        startGame,
        rotation,
        positionX,
        positionY,
        asteriods,
        bullets,
        gameIsActive,
        opacity,
        lives,
        elapsed
    } = useContext<GameProvider>(GameStateContext);
    
    return (
        <div className={styles.game}>
            <div className={styles.scoreboard}>
                Lives {lives} elapsed? {Math.floor(elapsed / 1000)}
            </div>
            {!gameIsActive && <button onClick={() => startGame()}>Start game</button>}
            <Ship 
                rotation={rotation}
                positionX={positionX}
                positionY={positionY}
                opacity={opacity}
            />
            {asteriods.map((asteriod, i) =>
                <Asteriod
                    key={`asteriod${i}`}
                    points={asteriod.points}
                    positionX={asteriod.positionX}
                    positionY={asteriod.positionY}
                />
            )}
            {bullets.map((bull, i) =>
                <Bullet
                    key={`asteriod${i}`}
                    positionX={bull.positionX}
                    positionY={bull.positionY}
                />
            )}
        </div>
        
    )
}
    
export default Game