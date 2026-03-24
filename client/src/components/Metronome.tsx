import { useRef, useState, useEffect } from "react"
import { BeatIndicator } from "./metronomeComponents/Indicator"
import { VolumeControl } from "./metronomeComponents/VolumeControl"
import { Controls } from "./metronomeComponents/Controls"
import { TimeSignatureSelector } from "./metronomeComponents/TimeSignatureSelector"
import highTone from "../assets/audio/Perc_MetronomeQuartz_hi.wav"
import lowTone from "../assets/audio/Perc_MetronomeQuartz_lo.wav"

export default function Metronome() {
  
  //Clicks
  const accentClick = useRef<HTMLAudioElement>(new Audio(highTone))
  const click = useRef<HTMLAudioElement>(new Audio(lowTone))

  //Audio
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const intervalRef = useRef<number | null>(null)

  //Toggle and bpm
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState<number>(100)

  //Volume settings
  const BASE_GAIN = 4
  const [volume, setVolume] = useState(BASE_GAIN)

  //Beat
  const beatRef = useRef(0)
  const [currentBeat, setCurrentBeat] = useState(0)

  const [timeSignature, setTimeSignature] = useState("4/4")
  const [beatsPerBar, setBeatsPerBar] = useState(4)

  //Time signatures
  type TimeSignature = {
    id: string
    label: string
    beatsPerBar: number
  }

  const TIME_SIGNATURES: TimeSignature[] = [
    {id: "4/4", label: "4/4", beatsPerBar: 4},
    {id: "1/4", label: "1/4", beatsPerBar: 1},
    {id: "2/4", label: "2/4", beatsPerBar: 2},
    {id: "3/4", label: "3/4", beatsPerBar: 3},
  ]
  
  
  useEffect(() => {
    // update gain if WebAudio graph exists, otherwise set element volume (clamped to 1)
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime)
    } else {
      const v = Math.min(volume, 1)
      if (accentClick.current) accentClick.current.volume = v
      if (click.current) click.current.volume = v
    }
  }, [volume]);

  const setupAudioGraph = () => {
    if (audioCtxRef.current !== null) return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    const ctx = new AudioCtx()

    // create media sources and a single shared gain node
    const accentSrc = ctx.createMediaElementSource(accentClick.current)
    const clickSrc = ctx.createMediaElementSource(click.current)
    const gain = ctx.createGain()
    gain.gain.value = volume

    accentSrc.connect(gain)
    clickSrc.connect(gain)
    gain.connect(ctx.destination)

    audioCtxRef.current = ctx
    gainRef.current = gain
  };

  const playTick = () => {
    const beat = beatRef.current % beatsPerBar

    if (beat === 0) {
      accentClick.current.currentTime = 0
      accentClick.current.play().catch(() => {})
    } else {
      click.current.currentTime = 0
      click.current.play().catch(() => {})
    }

    setCurrentBeat(beat)
    beatRef.current = beat + 1
  };

  const start = () => {
    // create audio graph from user gesture and resume if suspended
    setupAudioGraph()
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume()
    }

    setIsPlaying(true);
    const bpmNumber = bpm || 100
    beatRef.current = 0
    setCurrentBeat(0)
    playTick()
    intervalRef.current = window.setInterval(
        playTick,
        (60 / bpmNumber) * 1000
    )
  };

  const stop = () => {
    setIsPlaying(false)
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
    }
    beatRef.current = 0
    setCurrentBeat(0)

    accentClick.current.pause()
    accentClick.current.currentTime = 0
    click.current.pause()
    click.current.currentTime = 0
  };

  const handleTimeSignatureChange = (id: string) => {
    const sig = TIME_SIGNATURES.find((s) => s.id === id)
    if (!sig) return

    setTimeSignature(id)
    setBeatsPerBar(sig.beatsPerBar)
    beatRef.current = 0
    setCurrentBeat(0)
  }

  return (
    <div className="card">
      <h2>Metronome</h2>

    <div className="metronome">
      <BeatIndicator
        beatsPerBar={beatsPerBar}
        currentBeat={currentBeat}
      />

      <div className="bpm-module">
        <label id="bpm-label">BPM: </label>
        <input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
        />
      </div>

      <TimeSignatureSelector
        value={timeSignature}
        onChange={handleTimeSignatureChange}
        options={TIME_SIGNATURES}
      />

      <VolumeControl 
        volume={volume}
        setVolume={setVolume}
        BASE_GAIN={BASE_GAIN}
      />

      <Controls 
        isPlaying={isPlaying}
        start={start}
        stop={stop}
      />
      </div>
    </div>
  );
}