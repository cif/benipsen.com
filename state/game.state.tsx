import next from 'next'
import {
    createContext,
    useState,
    useEffect,
    FunctionComponent,
} from 'react'
import { useKeyPress } from '../hooks/useKeyPress'
import {
    computeNextRotationAndVelocity,
    computeNextPositionAndVelocity,
    generateInitialAsteriods,
    computeAsteriods,
    detectCollisions,
    detectFiringAndComputeBulletPositions,
    detectEndOfGame
} from './game.calc.utils'
import { AsteriodProps, BulletProps } from './common.types'

export type GameState = {
    rotationalVelocity: number
    rotation: number
    thrustRotation: number
    positionX: number
    positionY: number
    velocity: number
    collided: boolean
    firing: boolean
    generated: boolean // true when generating an asteriod
    opacity: number
    lives: number
    started: number
    elapsed: number
    score: number
    asteriods: AsteriodProps[]
    bullets: BulletProps[]
    gameIsActive: boolean
    gameIsOver: boolean
}

const defaultGameState: GameState = {
    rotationalVelocity: 0,
    rotation: 0,
    thrustRotation: 0,
    positionX: 0,
    positionY: 0,
    velocity: 0,
    collided: false,
    firing: false,
    generated: false,
    opacity: 0,
    lives: 3,
    elapsed: 0,
    started: 0,
    score: 0,
    asteriods: [],
    bullets: [],
    gameIsActive: false,
    gameIsOver: false,
}

export interface GameProvider extends GameState  {
    startGame: () => void
}

export const GameStateContext = createContext<GameProvider>({
    ...defaultGameState,
    startGame: () => { } 
});

export const GameStateProvider: FunctionComponent = ({ children }) => {
    const [gameState, setGameState] = useState<GameState>(defaultGameState)
    const rightArrowDown = useKeyPress('ArrowRight')
    const leftArrowDown = useKeyPress('ArrowLeft')
    const upArrowDown = useKeyPress('ArrowUp')
    const spaceDown = useKeyPress(' ')

    // event handlers that affect state
    const startGame = (): void => 
        setGameState({
            ...gameState,
            gameIsActive: true,
            gameIsOver: false,
            started: Date.now(),
            lives: 3,
            score: 0,
            asteriods: generateInitialAsteriods(),
            positionX: (window.innerWidth - 25) / 2,
            positionY: (window.innerHeight - 25) / 2,
        })
    
    
    // state loop
    useEffect(() => {
        
        // if the game is inactive, just return default game state
        if (!gameState.gameIsActive) {
            return setGameState(defaultGameState)
        }

        // otherwise, compute and set next state in the animation loop. 
        const raf = requestAnimationFrame(() => 
            setGameState({...gameState,

                // keep track of time
                elapsed: Date.now() - gameState.started,

                // keep faded in after collision
                opacity: gameState.opacity < 1
                    ? gameState.opacity + 0.02
                    : 1,
                
                // ship rotation
                ...computeNextRotationAndVelocity({
                    ...gameState,
                    rightArrowDown,
                    leftArrowDown
                }),

                // ship position
                ...computeNextPositionAndVelocity({
                    ...gameState,
                    upArrowDown
                }),

                // detect firing and manage bullets
                ...detectFiringAndComputeBulletPositions({
                    ...gameState,
                    spaceDown
                }),

                // asteroids count and positions
                ...computeAsteriods(gameState),
                
                // detect any collisions with the ship
                ...detectCollisions(gameState),

                // end of the game
                ...detectEndOfGame(gameState)
            })
        )
        return () => cancelAnimationFrame(raf)
     }, [gameState]);

    
    return (
        <GameStateContext.Provider value={{
            ...gameState,
            startGame: startGame
        }} >
            {children}
        </GameStateContext.Provider>
    )
}