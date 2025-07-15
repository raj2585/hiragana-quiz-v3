import React, { useState, useEffect, useRef } from 'react';

const hiraganaSet = [
  { char: "あ", answer: "a", options: ["a", "i", "u", "e"] },
  { char: "い", answer: "i", options: ["a", "i", "u", "o"] },
  { char: "う", answer: "u", options: ["e", "o", "u", "i"] },
  { char: "え", answer: "e", options: ["e", "a", "u", "o"] },
  { char: "お", answer: "o", options: ["i", "o", "e", "a"] },
  { char: "か", answer: "ka", options: ["ka", "ki", "ku", "ko"] },
  { char: "き", answer: "ki", options: ["ke", "ko", "ka", "ki"] },
  { char: "く", answer: "ku", options: ["ka", "ke", "ku", "ko"] },
  { char: "け", answer: "ke", options: ["ki", "ku", "ke", "ka"] },
  { char: "こ", answer: "ko", options: ["ko", "ka", "ke", "ku"] },
  { char: "さ", answer: "sa", options: ["sa", "shi", "su", "so"] },
  { char: "し", answer: "shi", options: ["sa", "shi", "se", "so"] },
  { char: "す", answer: "su", options: ["shi", "su", "sa", "se"] },
  { char: "せ", answer: "se", options: ["su", "sa", "se", "shi"] },
  { char: "そ", answer: "so", options: ["se", "so", "su", "sa"] },
  { char: "た", answer: "ta", options: ["ta", "chi", "tsu", "to"] },
  { char: "ち", answer: "chi", options: ["ta", "chi", "te", "to"] },
  { char: "つ", answer: "tsu", options: ["ta", "tsu", "te", "chi"] },
  { char: "て", answer: "te", options: ["tsu", "ta", "te", "to"] },
  { char: "と", answer: "to", options: ["ta", "te", "to", "tsu"] },
  { char: "な", answer: "na", options: ["na", "ni", "nu", "no"] },
  { char: "に", answer: "ni", options: ["na", "ni", "ne", "no"] },
  { char: "ぬ", answer: "nu", options: ["na", "nu", "ni", "ne"] },
  { char: "ね", answer: "ne", options: ["nu", "na", "ne", "ni"] },
  { char: "の", answer: "no", options: ["ne", "no", "nu", "na"] },
  { char: "は", answer: "ha", options: ["ha", "hi", "fu", "ho"] },
  { char: "ひ", answer: "hi", options: ["ha", "hi", "he", "ho"] },
  { char: "ふ", answer: "fu", options: ["ha", "fu", "he", "hi"] },
  { char: "へ", answer: "he", options: ["fu", "ha", "he", "ho"] },
  { char: "ほ", answer: "ho", options: ["he", "ho", "fu", "ha"] },
  { char: "ま", answer: "ma", options: ["ma", "mi", "mu", "mo"] },
  { char: "み", answer: "mi", options: ["ma", "mi", "me", "mo"] },
  { char: "む", answer: "mu", options: ["ma", "mu", "mi", "me"] },
  { char: "め", answer: "me", options: ["mu", "ma", "me", "mi"] },
  { char: "も", answer: "mo", options: ["me", "mo", "mu", "ma"] },
  { char: "や", answer: "ya", options: ["ya", "yu", "yo", "ma"] },
  { char: "ゆ", answer: "yu", options: ["ya", "yu", "yo", "mu"] },
  { char: "よ", answer: "yo", options: ["ya", "yu", "yo", "mo"] },
  { char: "ら", answer: "ra", options: ["ra", "ri", "ru", "ro"] },
  { char: "り", answer: "ri", options: ["ra", "ri", "re", "ro"] },
  { char: "る", answer: "ru", options: ["ra", "ru", "ri", "re"] },
  { char: "れ", answer: "re", options: ["ru", "ra", "re", "ri"] },
  { char: "ろ", answer: "ro", options: ["re", "ro", "ru", "ra"] },
  { char: "わ", answer: "wa", options: ["wa", "wo", "n", "ra"] },
  { char: "を", answer: "wo", options: ["wa", "wo", "n", "ro"] },
  { char: "ん", answer: "n", options: ["wa", "wo", "n", "ya"] },
  { char: "が", answer: "ga", options: ["ga", "gi", "gu", "go"] },
  { char: "ぎ", answer: "gi", options: ["ga", "gi", "ge", "go"] },
  { char: "ぐ", answer: "gu", options: ["ga", "gu", "gi", "ge"] },
  { char: "げ", answer: "ge", options: ["gu", "ga", "ge", "gi"] },
  { char: "ご", answer: "go", options: ["ge", "go", "gu", "ga"] },
  { char: "ざ", answer: "za", options: ["za", "ji", "zu", "zo"] },
  { char: "じ", answer: "ji", options: ["za", "ji", "ze", "zo"] },
  { char: "ず", answer: "zu", options: ["za", "zu", "ji", "ze"] },
  { char: "ぜ", answer: "ze", options: ["zu", "za", "ze", "ji"] },
  { char: "ぞ", answer: "zo", options: ["ze", "zo", "zu", "za"] },
  { char: "だ", answer: "da", options: ["da", "ji", "dzu", "do"] },
  { char: "ぢ", answer: "ji", options: ["da", "ji", "de", "do"] },
  { char: "づ", answer: "dzu", options: ["da", "dzu", "ji", "de"] },
  { char: "で", answer: "de", options: ["dzu", "da", "de", "ji"] },
  { char: "ど", answer: "do", options: ["de", "do", "dzu", "da"] },
  { char: "ば", answer: "ba", options: ["ba", "bi", "bu", "bo"] },
  { char: "び", answer: "bi", options: ["ba", "bi", "be", "bo"] },
  { char: "ぶ", answer: "bu", options: ["ba", "bu", "bi", "be"] },
  { char: "べ", answer: "be", options: ["bu", "ba", "be", "bi"] },
  { char: "ぼ", answer: "bo", options: ["be", "bo", "bu", "ba"] },
  { char: "ぱ", answer: "pa", options: ["pa", "pi", "pu", "po"] },
  { char: "ぴ", answer: "pi", options: ["pa", "pi", "pe", "po"] },
  { char: "ぷ", answer: "pu", options: ["pa", "pu", "pi", "pe"] },
  { char: "ぺ", answer: "pe", options: ["pu", "pa", "pe", "pi"] },
  { char: "ぽ", answer: "po", options: ["pe", "po", "pu", "pa"] }
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function StartScreen({ onStart }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  return (
    <section className="intro-section" aria-label="Quiz Introduction">
      <div className="intro-card">
        <div className="intro-emoji" aria-hidden="true">🎌</div>
        <h1 className="intro-title">Welcome to Hiragana Quiz!</h1>
        <p className="intro-desc">Sharpen your Japanese skills by matching Hiragana characters to their correct romaji. Enter your name to get started!</p>
        <form className="intro-form" onSubmit={e => { e.preventDefault(); onStart(name, setError); }} autoComplete="off">
          <input
            type="text"
            className="intro-input"
            placeholder="Your name..."
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
            aria-label="Player Name"
          />
          <button type="submit" className="intro-btn" aria-label="Start Quiz">Start Quiz</button>
        </form>
        <div className="error-message" aria-live="polite">{error}</div>
      </div>
    </section>
  );
}

function ProgressBar({ current, total }) {
  const percent = Math.round(((current + 1) / total) * 100);
  return (
    <div className="progress-bar-container">
      <span className="progress-label">Question {current + 1} / {total}</span>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-percent">{percent} %</span>
    </div>
  );
}

function Quiz({ questions, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [timer, setTimer] = useState(0);
  const [fade, setFade] = useState(true);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    setFade(true);
  }, [current]);

  const q = questions[current];

  const handleOption = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === q.answer) {
      setScore(s => s + 1);
      setFeedback("Correct!");
      setFeedbackType("correct");
    } else {
      setFeedback(`Wrong! Correct answer: ${q.answer}`);
      setFeedbackType("wrong");
    }
    setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setSelected(null);
        setFeedback("");
        setFeedbackType("");
        if (current === questions.length - 1) {
          clearInterval(timerRef.current);
          onFinish(score + (opt === q.answer ? 1 : 0), timer + 1);
        } else {
          setCurrent(c => c + 1);
        }
      }, 250); // fade out
    }, 1100);
  };

  return (
    <section className="quiz-section" aria-label={`Question ${current + 1} of ${questions.length}`}> 
      <ProgressBar current={current} total={questions.length} />
      <div className={`quiz-card fade-${fade ? 'in' : 'out'}`}> 
        <div className="question-text" aria-label="Question">
          <strong>What is the romaji for:</strong>
          <span className="hiragana-display" aria-label="Hiragana Character" tabIndex={0}>{q.char}</span>
        </div>
        <form className="options-card-grid" role="group" aria-label="Answer Options" onSubmit={e => e.preventDefault()}>
          {q.options.map(opt => (
            <label key={opt} className={`option-card${selected === opt ? (opt === q.answer ? ' correct' : ' wrong') : ''}`}> 
              <input
                type="radio"
                name="option"
                value={opt}
                checked={selected === opt}
                onChange={() => handleOption(opt)}
                disabled={selected !== null}
                aria-checked={selected === opt}
                aria-label={`Option ${opt}`}
              />
              <span className="option-label">{opt}</span>
            </label>
          ))}
        </form>
        {feedback && (
          <div className={`feedback-banner ${feedbackType}`}>{feedback}</div>
        )}
      </div>
      <div className="timer" aria-live="polite">
        <span role="img" aria-label="clock" style={{marginRight: '6px'}}>⏰</span>{formatTime(timer)}
      </div>
    </section>
  );
}

function ResultScreen({ name, score, time, onRestart }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [highlightIdx, setHighlightIdx] = useState(null);
  useEffect(() => {
    const entry = { name, score, time };
    let lb = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    // Remove any previous entry for this user
    lb = lb.filter(e => e.name !== name);
    // Add the new entry
    lb.push(entry);
    // For all users, keep only the best score (if tie, best time)
    const bestByUser = {};
    for (const e of lb) {
      if (!bestByUser[e.name] ||
          e.score > bestByUser[e.name].score ||
          (e.score === bestByUser[e.name].score && e.time < bestByUser[e.name].time)) {
        bestByUser[e.name] = e;
      }
    }
    lb = Object.values(bestByUser);
    lb.sort((a, b) => b.score !== a.score ? b.score - a.score : a.time - b.time);
    lb = lb.slice(0, 10);
    localStorage.setItem("leaderboard", JSON.stringify(lb));
    setLeaderboard(lb);
    setHighlightIdx(lb.findIndex(e => e.name === name && e.score === score && e.time === time));
  }, [name, score, time]);
  return (
    <section className="quiz-section" aria-label="Quiz Results">
      <h2 className="result-title">Quiz Complete!</h2>
      <div id="final-score" className="result-text">Score: {score} out of 10</div>
      <div id="completion-time" className="result-text">Time taken: {formatTime(time)}</div>
      <h3 className="leaderboard-title">Leaderboard</h3>
      <div className="leaderboard-card">
        <Leaderboard leaderboard={leaderboard} highlightIdx={highlightIdx} />
      </div>
      <button onClick={onRestart} aria-label="Restart Quiz">Try Again</button>
    </section>
  );
}

function Leaderboard({ leaderboard = [], highlightIdx }) {
  return (
    <table id="leaderboard" aria-label="Leaderboard">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.slice(0, 10).map((entry, idx) => {
          const timeString = (entry.time !== undefined) ? `${Math.floor(entry.time/60).toString().padStart(2,'0')}:${(entry.time%60).toString().padStart(2,'0')}` : '';
          return (
            <tr key={idx} className={highlightIdx === idx ? 'highlight-row' : ''}>
              <td>{idx + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
              <td>{timeString}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function App() {
  const [step, setStep] = useState('start');
  const [playerName, setPlayerName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  const handleStart = (name, setError) => {
    if (!name.trim()) {
      setError('Please enter your name to start the quiz');
      return;
    }
    setError('');
    setPlayerName(name.trim());
    // Pick 10 random questions, shuffle options for each
    const picked = shuffle(hiraganaSet).slice(0, 10).map(q => ({
      ...q,
      options: shuffle(q.options)
    }));
    setQuestions(picked);
    setStep('quiz');
  };

  const handleFinish = (finalScore, finalTime) => {
    setScore(finalScore);
    setTime(finalTime);
    setStep('result');
  };

  const handleRestart = () => {
    setPlayerName('');
    setQuestions([]);
    setScore(0);
    setTime(0);
    setStep('start');
  };

  return (
    <main className="container">
      {step === 'start' && <StartScreen onStart={handleStart} />}
      {step === 'quiz' && <Quiz questions={questions} onFinish={handleFinish} />}
      {step === 'result' && <ResultScreen name={playerName} score={score} time={time} onRestart={handleRestart} />}
    </main>
  );
}

export default App;
