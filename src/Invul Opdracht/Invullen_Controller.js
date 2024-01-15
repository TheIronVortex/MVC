
import React, { useState } from 'react';
import Invullen_View from './Invullen_View';
import { vragen, checkAntwoorden } from './Invullen_Model';

function Invullen() {
  const [vragenState, setVragenState] = useState(vragen);
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const answers = {};
    for (let [name, value] of formData) {
      answers[name] = value;
    }

    const validatedAnswers = checkAntwoorden(answers);
    setCorrectAnswers(validatedAnswers);
    setSubmitted(true);
  };

  return (
    <>
      <Invullen_View
        vragen={vragenState}
        handleSubmit={handleSubmit}
        submitted={submitted}
        correctAnswers={correctAnswers}
      />
    </>
  );
}

export default Invullen;