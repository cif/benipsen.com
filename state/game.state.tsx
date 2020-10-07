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
    generateInitialAsteriods
} from './game.calc.utils'
import { AsteriodProps } from './common.types'

// note: have to chnage this in CSS to actualy change presentation
const SHIP_SIZE = 50  

export type GameState = {
    rotationalVelocity: number
    rotation: number
    thrustRotation: number
    positionX: number
    positionY: number
    velocity: number
    asteriods: AsteriodProps[]
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
    asteriods: [],
    gameIsActive: false,
}

export const GameStateContext = createContext<GameProvider>(defaultGameState);


export const GameStateProvider: FunctionComponent = ({ children }) => {
    const [gameState, setGameState] = useState<GameState>(defaultGameState)
    const rightArrowDown = useKeyPress('ArrowRight')
    const leftArrowDown = useKeyPress('ArrowLeft')
    const upArrowDown = useKeyPress('ArrowUp')

    // event handlers that affect state
    const startGame = (): void => 
        setGameState({
            ...gameState,
            gameIsActive: true,
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
        const raf = requestAnimationFrame(() => {
            setGameState({
                ...gameState,
                // rotation
                ...computeNextRotationAndVelocity({
                    ...gameState,
                    rightArrowDown,
                    leftArrowDown
                }),
                // position
                ...computeNextPositionAndVelocity({
                    ...gameState,
                    upArrowDown
                }),
                // asteroids
                asteriods: gameState.asteriods.map(computeNextAsteroidProps)

            })


        })
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