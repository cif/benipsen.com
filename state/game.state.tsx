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
    computeNextAsteroidProps,
    computeNextBulletProps,
    generateInitialAsteriods,
    detectShipCollisions,
    detectFiringAndComputeBulletPositions,
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
    opacity: number
    lives: number
    started: number
    elapsed: number
    asteriods: AsteriodProps[]
    bullets: BulletProps[]
    gameIsActive: boolean
}

export interface GameProvider extends GameState  {
    startGame?: () => void
}

const defaultGameState: GameState | GameProvider = {
    rotationalVelocity: 0,
    rotation: 0,
    thrustRotation: 0,
    positionX: 0,
    positionY: 0,
    velocity: 0,
    collided: false,
    firing: false,
    opacity: 0,
    lives: 3,
    elapsed: 0,
    started: 0,
    asteriods: [],
    bullets: [],
    gameIsActive: false,
}

export const GameStateContext = createContext<GameProvider>(defaultGameState);


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
            started: Date.now(),
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
                ...detectFiringAndComputeBulletPositions({ ...gameState, spaceDown }),

                // asteroids + bullets
                asteriods: gameState.asteriods.map(computeNextAsteroidProps),
                
               
                // detect any collisions with the ship
                ...detectShipCollisions(gameState),

                
                
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