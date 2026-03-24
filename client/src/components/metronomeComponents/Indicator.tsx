interface BeatIndicatorProps {
        beatsPerBar: number
        currentBeat: number
    }

export function BeatIndicator({beatsPerBar, currentBeat}: BeatIndicatorProps) {
    return(
        <div className="beat-indicator">
        {Array.from({ length: beatsPerBar }).map((_, i) => (
          <div
            key={i}
            className={`beat-circle ${i === 0 ? "accent" : ""} ${currentBeat === i ? "active" : ""}`}
          />
        ))}
      </div>
    );
}