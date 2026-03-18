import Metronome from "../components/Metronome"
import BpmProgressionChart from "../components/BpmProgressionChart"
import PracticeStreakCard from "../components/PracticeStreakCard"
import RudimentList from "../components/RudimentList"
import SessionForm from "../components/SessionForm"
import WeeklyPracticeChart from "../components/WeeklyPracticeChart"

function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Practice Dashboard</h1>
      <section className="description">
      <p>Practice your drum rudiments or just jam along to the click of the metronome with the help of this tool.</p>
      <p>Klick on the cards to the right or your profile to access your training data.</p>
      <p>Interactive trainig tool made by Emil Englesson</p>
      </section>

      <section className="streak">
        <PracticeStreakCard />
        <WeeklyPracticeChart />
      </section>

      <section className="bento">
        <section className="left-grid">
          <Metronome />
        </section>

        <section className="right-grid">
          <BpmProgressionChart />
          <SessionForm />
          <RudimentList />
        </section>
      </section>

    </div>
  )
}

export default DashboardPage