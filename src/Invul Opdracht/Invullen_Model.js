const vragen = [
  { id: 1, vraag: 'De ... valt niet ver van de boom.', antwoord: 'Appel' },
  { id: 2, vraag: '10 + 8 = ....', antwoord: '18' },
  { id: 3, vraag: 'Een vierkant heeft ... hoeken.', antwoord: 'Vier' },
  { id: 4, vraag: 'Tijdens de Corona pandemie zaten we in een ... , waarbij we allemaal binnen moesten blijven.', antwoord: 'Lockdown' },
  { id: 5, vraag: '... is mijn favoriete kleur.', antwoord: 'Paars' }
];

function VervangPuntenMetHTML(inputString, id) {
  const regex = /\.\.\./g;
  const vervangString = inputString.replace(
    regex,
    `<input class='bg-gray rounded border-0 ps-2' type='text' placeholder='...' name='answer_${id}' />`
  );
  return vervangString;
}

function checkAntwoorden(submittedAnswers) {
  const correctAnswers = {};
  vragen.forEach((item) => {
    const answerKey = `answer_${item.id}`;
    const submittedAnswer = submittedAnswers[answerKey] ? submittedAnswers[answerKey].toLowerCase() : '';
    const correctAnswer = item.antwoord.toLowerCase();
    correctAnswers[answerKey] = (submittedAnswer === correctAnswer) ? 'Correct' : 'Incorrect';
  });
  return correctAnswers;
}


export { vragen, VervangPuntenMetHTML, checkAntwoorden };
