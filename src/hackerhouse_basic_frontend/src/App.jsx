import { useState } from "react";
import NfidLogin from "./components/NfidLogin";

function App() {

  const [backendActor, setBackendActor] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [username, setUserName2] = useState();

  const [textToAnalyze, setTextToAnalyze] = useState();
  const [sentiment, setSentiment] = useState();

  const [results , setResults] = useState();

  function handleSubmitUserProfile(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    backendActor.setUserProfile(name).then((response) => {
      if (response.ok) {
        setUserId(response.ok.id.toString());
        setUserName(response.ok.name);
      } else if (response.err) {
        setUserId(response.err);
      } else {
        console.error(response);
        setUserId("Unexpected error, check the console");
      }
    });
    return true;
  }
  function handleSubmitGetUserName(event) {
    event.preventDefault();
    backendActor.getUserProfile().then((response) => {
      if (response.ok) {
        setUserName2(response.ok.name);
      } else {
        console.error(response);
      }
    });
  }
  function handleGetResults(event) {
    event.preventDefault();
    backendActor.getUserResults().then((response) => {
      if (response.ok) {
        setResults(response.ok.results);
      } else {
        console.error(response);
      }
    });
  }
  function handle_outcall_ai_model_for_sentiment_analysis(event){
    event.preventDefault();
    const textToAnalyze = event.target.elements.textToAnalyze.value;
    backendActor.outcall_ai_model_for_sentiment_analysis(textToAnalyze).then((response) => {
      if (response.ok) {
        setSentiment(response.ok.result);
        setTextToAnalyze(textToAnalyze);
      } else {
        console.error(response);
      }
    });
    return true;
  }
  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <h1>Welcome to IC AI Hacker House!</h1>
      {!backendActor && (
        <section id="nfid-section">
          <NfidLogin setBackendActor={setBackendActor}></NfidLogin>
        </section>
      )}
      {backendActor && (
        <>
          <form action="#" onSubmit={handleSubmitUserProfile}>
            <label htmlFor="name">Enter your name: &nbsp;</label>
            <input id="name" alt="Name" type="text" />
            <button type="submit">Save</button>
          </form>
          {userId && <section className="response">Username set!</section>}
        </>
      )}
      {backendActor && (
        <>
          <form action="#" onSubmit={handleSubmitGetUserName}>
            <button type="submit">Get User Profile Name</button>
          </form>
          {username && <section className="response">Current username: {username}</section>}
        </>
      )}
      {backendActor && (
        <>
          <form action="#" onSubmit={handle_outcall_ai_model_for_sentiment_analysis}>
            <label htmlFor="name">Text to analize &nbsp;</label>
            <input id="textToAnalyze" alt="Name" type="text" />
            <button type="submit">Get sentiment analisys</button>
          </form>
          {textToAnalyze && <section className="response">
            <p><strong>Text:</strong> {textToAnalyze}</p>
            <p><strong>Score Label:</strong> {sentiment}</p>
            </section>}
        </>
      )}
            {backendActor && (
        <>
          <form action="#" onSubmit={handleGetResults}>
            <button type="submit">Get Saved Results</button>
          </form>
          {results && results.map((result, index) => (
          <section key={index} className="response">
            <p><strong>Text:</strong> {result.text}</p>
            <p><strong>Score Label:</strong> {result.score_label}</p>
          </section>
        ))}
        </>
      )}
    </main>
  );
}

export default App;
