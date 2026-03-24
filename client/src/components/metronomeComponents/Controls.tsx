interface ControlsProps {
    isPlaying: boolean
    start: () => void
    stop: () => void
}

export function Controls({ isPlaying, start, stop }: ControlsProps){
    return(
        <div className="controls">
        {!isPlaying ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={stop}>Stop</button>
        )}
      </div>
    )
}