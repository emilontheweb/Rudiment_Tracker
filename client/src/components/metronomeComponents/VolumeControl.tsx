interface VolumeControlProps {
    volume: number
    setVolume: (volume: number) => void
    BASE_GAIN: number
}

export function VolumeControl({ volume, setVolume, BASE_GAIN}: VolumeControlProps) {
    const DISPLAY_BASE = BASE_GAIN * 2;
    const displayPercent = Math.max(0, Math.round((volume / DISPLAY_BASE) * 100));

    return(
        <div className="volume-control">
            <div className="volume-info">
            <label>Volume</label>
            <p className="volume-value">{displayPercent}%</p>
            </div>
        <input
            className="volume-slider"
            type="range"
            min="0"
            max={BASE_GAIN * 2}    // allow boosting up to 400% (adjust if you want more)
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Metronome volume"
          />
        </div>
    )
}