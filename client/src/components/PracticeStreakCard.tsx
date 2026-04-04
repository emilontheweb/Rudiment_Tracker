import { useEffect, useState } from "react"
import { getPracticeStreak } from "../api/statsApi"

interface PracticeStreak {
    currentStreak: number
    longestStreak: number
}

export default function PracticeStreakCard() {
    const [streak, setStreak] = useState<PracticeStreak | null>(null)

    useEffect(() => {
        const fetchStreak = async () => {
            try {
                const data = await getPracticeStreak()
                console.log(data)
                setStreak(data)
            } catch(error) {
                console.error(error)
            }
        }

        fetchStreak()
    }, [])

    if (!streak) return <div>Loading...</div>
    
    return (
        <div>
            <h3>Practice Streak</h3>

            <div className="streak-main">
                {streak.currentStreak} 🔥
            </div>

            <p>Current streak</p>
            
            <div className="streak-secondary">
                Longest: {streak.longestStreak}
            </div>
        </div>
    )
}
