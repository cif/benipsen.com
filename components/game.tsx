
import { FunctionComponent, useContext } from 'react'
import { GameStateContext, GameProvider } from '../state/game.state';
import Asteriod from './asteriod';
import Ship from './ship';
import styles from '../styles/game.module.css'

export const Game: FunctionComponent<any> = () => {
    const {
        startGame,
        rotationalVelocity,
        rotation,
        positionX,
        positionY,
        asteriods,
        gameIsActive,
    } = useContext<GameProvider>(GameStateContext);
    console.log(asteriods)
    return (
        <div className={styles.game}>
            Hello! The velocity is: {rotationalVelocity} {rotation}
            {!gameIsActive && <button onClick={() => startGame()}>Start game</button>}
            <Ship 
                rotation={rotation}
                positionX={positionX}
                positionY={positionY}
            />
            {asteriods.map((asteriod, i) =>
                <Asteriod
                    key={`asteriod${i}`}
                    points={asteriod.points}
                    positionX={asteriod.positionX}
                    positionY={asteriod.positionY}
                />
            )}
        </div>
        
    )
}
    
export default Game