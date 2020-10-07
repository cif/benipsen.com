export type Coord = {
    x: number
    y: number
}

export type BulletProps = {
    positionX: number
    positionY: number
    vector?: number
    offscreen: boolean
}

export type AsteriodProps = {
    points?: Coord[]
    positionX: number
    positionY: number
    radius?: number
    vector?: number
    velocity?: number
}