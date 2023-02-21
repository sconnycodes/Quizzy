export default function Start(props){
    return(
        <>
            <h1>Quizzy</h1>
            <p>Test your knowledge with some fun trivia questions.</p>
          <button onClick={props.startQuiz}>Start Quiz!</button>
      </>
    )
}