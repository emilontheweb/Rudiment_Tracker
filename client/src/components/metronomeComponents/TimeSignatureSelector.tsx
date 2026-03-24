interface TimeSignatureOption {
    id: string
    label: string
    beatsPerBar: number
}

interface TimeSignatureSelectorProps {
    value: string
    onChange: (id: string) => void
    options: TimeSignatureOption[]
}

export function TimeSignatureSelector({ value, onChange, options}: TimeSignatureSelectorProps) {
    return (
        <div className="time-signature">
            <label>Time signature: </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((opt) => (
                    <option 
                        key={opt.id} 
                        value={opt.id}>
                            {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}