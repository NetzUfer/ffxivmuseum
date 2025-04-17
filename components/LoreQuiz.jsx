import React, { useState } from "react";
const questions = [
  {
    q: "Who was the founder of the Allagan Empire?",
    a: ["Xande", "Solus zos Galvus", "Louisoix", "Minfilia"],
    correct: 0,
  },
  {
    q: "What is the name of the primal worshipped by the Amalj'aa?",
    a: ["Ifrit", "Shiva", "Ramuh", "Leviathan"],
    correct: 0,
  },
  {
    q: "Which city-state is known for its pirates?",
    a: ["Limsa Lominsa", "Ul'dah", "Gridania", "Ishgard"],
    correct: 0,
  },
];
const LoreQuiz = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [badge, setBadge] = useState(null);
  const handleAnswer = (i) => {
    if (i === questions[step].correct) setScore((s) => s + 1);
    if (step + 1 === questions.length) {
      setDone(true);
      if (score + (i === questions[step].correct ? 1 : 0) === questions.length)
        setBadge("Crystal Scholar");
      else if (score >= 1) setBadge("Lore Adept");
      else setBadge("Sprout");
    } else setStep((s) => s + 1);
  };
  return (
    <div className="glass-card p-6 max-w-lg mx-auto text-center">
      {!done ? (
        <>
          <h3 className="text-xl font-cinzel text-eorzea-gold mb-4">Q{step + 1}: {questions[step].q}</h3>
          <div className="flex flex-col gap-3">
            {questions[step].a.map((ans, i) => (
              <button
                key={i}
                className="btn btn-secondary"
                onClick={() => handleAnswer(i)}
              >
                {ans}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-cinzel text-eorzea-gold mb-4">Your Score: {score}/{questions.length}</h3>
          <div className="my-4">
            {badge && (
              <span className="inline-block px-4 py-2 bg-eorzea-gold/20 text-eorzea-gold font-cinzel rounded-lg shadow-glow">
                🏅 {badge}
              </span>
            )}
          </div>
          <button className="btn btn-primary" onClick={() => { setStep(0); setScore(0); setDone(false); setBadge(null); }}>
            Try Again
          </button>
        </>
      )}
    </div>
  );
};
export default LoreQuiz;
