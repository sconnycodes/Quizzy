import './App.css';
import React from "react"

export default function App() {
  const [quizStarted, setQuizStarted] = React.useState(false)

  function startQuiz(){
    setQuizStarted(status => !status)
  }

  return (
    <div id="mainContent">

      <h1>Quizzy</h1>
      <p>Test your knowledge with some fun trivia questions.</p>
      <button onClick={startQuiz}>Start Quiz!</button>
      {quizStarted && <h2>StartingQuizBby!</h2>}
    </div>
    
  )
}


