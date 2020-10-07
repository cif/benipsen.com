export type Coord = {
    x: number
    y: number
}

export type AsteriodProps = {
    points?: Coord[]
    positionX: number
    positionY: number
    radius?: number
    vector?: number
    velocity?: number
}