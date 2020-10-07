import { AsteriodProps } from './common.types'

const MAX_ROTATIONAL_VELOCITY = 8
const INCREMENTAL_ROTATION_VELOCITY = 1
const MAX_VELOCITY = 20
const INCREMENTAL_VELOCITY = 0.5 // accel
const INCREMENTAL_VELOCITY_DECREASE = 0.3 // decel

export const computeNextRotationAndVelocity = ({
    rotation,
    rotationalVelocity,
    rightArrowDown,
    leftArrowDown
}) => {
    let nextRotationalVelocity = rotationalVelocity
    const activelyRotating = rightArrowDown || leftArrowDown
    if (rightArrowDown) {
        nextRotationalVelocity += Math.abs(rotationalVelocity) < MAX_ROTATIONAL_VELOCITY
            ? INCREMENTAL_ROTATION_VELOCITY
            : 0
    }
    if (leftArrowDown) {
        nextRotationalVelocity -= Math.abs(rotationalVelocity) < MAX_ROTATIONAL_VELOCITY
        ? INCREMENTAL_ROTATION_VELOCITY
        : 0
    }
    if (!activelyRotating) {
        if (nextRotationalVelocity > 0) {
            nextRotationalVelocity--
        }
        if (nextRotationalVelocity < 0) {
            nextRotationalVelocity++
        }
    }

    return {
        rotationalVelocity: nextRotationalVelocity,
        rotation: rotation + nextRotationalVelocity,
    }
}

export const computeNextPositionAndVelocity = ({
    rotation,
    positionX,
    positionY,
    velocity,
    thrustRotation,
    upArrowDown
}) => {
    let nextVelocity = velocity
    
    if (upArrowDown) {
        // set thrust rotation on keydown
        thrustRotation = rotation
        nextVelocity += nextVelocity < MAX_VELOCITY
            ? INCREMENTAL_VELOCITY
            : 0
    }

    if (!upArrowDown) {
        nextVelocity -= nextVelocity > 0
            ? INCREMENTAL_VELOCITY_DECREASE
            : 0
    }

    // remove float
    if (nextVelocity < INCREMENTAL_VELOCITY_DECREASE) {
        nextVelocity = 0
    }

    // calculate x and y travel based on rotation/velocity
    const rad = thrustRotation * (Math.PI / 180)
    let nextX = nextVelocity * Math.sin(rad) + positionX
    let nextY = nextVelocity * Math.cos(rad) + positionY
    
    // keep on screen
    if (nextX > window.innerWidth) {
        nextX = 0
    }
    if (nextX < 0) {
        nextX = window.innerWidth
    }
    if (nextY > window.innerHeight) {
        nextY = 0
    }
    if (nextY < 0) {
        nextY = window.innerHeight
    }

    return {
        positionX: nextX,
        positionY: nextY,
        velocity: nextVelocity,
        thrustRotation
    }
}

export const generateAsteroidProps = (
    startX?: number,
    startY?: number,
    initRadius?: number,
): AsteriodProps => { 
    // generate a random polygon 
    const radius = initRadius ? initRadius : Math.floor(Math.random() * 100) + 100
    const degreRandomization = 20;
    const sides = Math.floor(Math.random() * 9) + 5
    const angles = new Array(sides).fill(0)
        // at even angles
        .map((_, i) => Math.floor(360 / sides) * i)
        // randomize within degress
        .map((ang) => {
            const min = ang - degreRandomization
            const max = ang + degreRandomization
            // return ang
            return ang > 0 ? Math.floor(Math.random() * (max - min)) + min : 0
        })
        // de-overlap
        .sort((a, b) => a > b ? 1 : -1)

    const points = angles.map((ang) => ({
        x: Math.floor(Math.cos(ang * (Math.PI / 180)) * radius),
        y: Math.floor(Math.sin(ang * (Math.PI / 180)) * radius),
    }))

    // travel vecotor - should some be slower than others
    const velocity = Math.floor(Math.random() * 5) + 5
    const vector = Math.floor(Math.random() * 360)
    
    // generate random psoition
    const positionX = Math.random() > 0.5
        ? window.innerWidth + radius
        : radius * -1
    const positionY = Math.random() > 0.5
        ? window.innerHeight + radius
        : radius * -1

    return {    
        points,
        positionX: startX
            ? startX
            : positionX,
        positionY: startY
            ? startY
            : positionY,
        vector,
        velocity,
    };
}

export const generateInitialAsteriods = (): AsteriodProps[] => new Array(3)
    .fill(0)
    .map(() => generateAsteroidProps())

export const computeNextAsteroidProps = (props) => {
    const {
        velocity,
        vector,
        positionX,
        positionY
    } = props
    const rad = vector * (Math.PI / 180)
    let nextX = velocity * Math.sin(rad) + positionX
    let nextY = velocity * Math.cos(rad) + positionY
    
    // keep on screen
    if (nextX > window.innerWidth) {
        nextX = 0
    }
    if (nextX < 0) {
        nextX = window.innerWidth
    }
    if (nextY > window.innerHeight) {
        nextY = 0
    }
    if (nextY < 0) {
        nextY = window.innerHeight
    }

    return {
        ...props,
        positionX: nextX,
        positionY: nextY
    }
}    

const detectShipCollisions = ({ asteriods, positionX, positionY }) => {
    
}