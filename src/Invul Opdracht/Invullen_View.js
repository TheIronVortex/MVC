import React from 'react';
import { VervangPuntenMetHTML } from './Invullen_Model';

function Invullen_View({ vragen, handleSubmit, submitted, correctAnswers }) {
  const displayAnswers = submitted ? (
    // Display antwoorden na submit
    <div className="row bg-purple-dark m-5 p-3 rounded">
      <div className="col bg-purple-light align-self-center rounded p-3">
        <h3>Antwoorden:</h3>
        {vragen.map((item) => (
          <div className="row mb-3" key={item.id}>
            <div className="col">
              <p>
                Vraag {item.id}:&nbsp;
                {correctAnswers[`answer_${item.id}`] === 'Correct' ? (
                  'Goed'
                ) : (
                  <>
                    Fout - Jouw Antwoord: {correctAnswers[`answer_${item.id}`]}
                    <br />
                    Correct Antwoord: {item.antwoord}
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="container">
      <div className="row bg-purple-dark m-5 p-3 rounded">
        <div className="col bg-purple-light align-self-center rounded p-3">
          <form onSubmit={handleSubmit}>
            {vragen.map((item) => (
              <p className="px-1" key={item.id}>
                {item.id + '. '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: VervangPuntenMetHTML(item.vraag, item.id),
                  }}
                />
              </p>
            ))}
            <input className="btn-gray rounded border-0 p-1 px-5" type='submit' value='Submit Answers' />
          </form>
        </div>
      </div>
      {displayAnswers}
    </div>
  );
}

export default Invullen_View;
