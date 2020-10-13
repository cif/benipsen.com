
import { FunctionComponent, useContext } from 'react'
import { GameStateContext, GameProvider } from '../state/game.state'
import Asteriod from './asteriod'
import Bullet from './bullet'
import Ship from './ship'
import styles from '../styles/game.module.css'

export const Game: FunctionComponent<any> = () => {
    const {
        startGame,
        rotation,
        positionX,
        positionY,
        asteriods,
        bullets,
        gameIsActive,
        gameIsOver,
        opacity,
        lives,
        score,
    } = useContext<GameProvider>(GameStateContext)
    
    return (
        <div className={styles.game}>
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
            <div className={styles.scoreboard}>
                <h2>SCORE: {score.toLocaleString()}</h2>
                <div className={styles.lives}>
                    {lives > 0 && new Array(lives).fill(0).map((_, i) =>
                        <Ship
                            key={`life${i}`}
                            rotation={0}
                            positionX={i * 45}
                            positionY={0}
                            opacity={1}
                        />
                    )}
                </div>
            </div>

            {!gameIsActive &&
                <div className={styles.intro}>
                    <h1>Asteriods!</h1>
                    <p>How to play:</p>
                    <p><b>Rotate:</b> Left and Right Arrow</p>
                    <p><b>Move:</b> Up Arrow</p>
                    <p><b>Fire:</b> Space Bar</p>
                    <button
                        onClick={() => startGame()}
                        className={styles.startButton}
                    >
                    Start Game
                    </button>
                </div>
            }

            {gameIsOver &&
                <div className={styles.backdrop}>
                    <div className={styles.intro}>
                        <h1>Game Over!</h1>
                        <p>Final Score: {score.toLocaleString()}</p>
                        <button
                            onClick={() => startGame()}
                            className={styles.startButton}
                        >
                        Play Again
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
    
export default Game