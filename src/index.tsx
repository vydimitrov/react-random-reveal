import React from 'react'

type FlipFlopProps = {
    isPlaying: boolean
}

const FlipFlop = (props: FlipFlopProps) => {
    const {
        isPlaying
    } = props;

    return (
        <div>
            Hello World
        </div>
    );
}

export {
    FlipFlop
}