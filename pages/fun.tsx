
import { FunctionComponent } from 'react'
import Head from 'next/head'
import Game from '../components/game'
import { GameStateProvider } from '../state/game.state'

export const Fun: FunctionComponent<any> = () => {
    return (
        <GameStateProvider>
            <style>{`
                html, body {
                    overflow: hidden;
                }
                `}
            </style>
            <Head>
                <title>Ben Ipsen: Reacterioids</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            </Head>
            <Game />
        </GameStateProvider>
    )
}
    
export default Fun