import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function RandomLetter() {
  const letters = [];
  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i));
  }
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
}

function WoordzoekerRow(props) {
  const woordzoekerColumns = [];
  var colNr = 0;
  while (colNr < props.colAmount) {
    woordzoekerColumns.push(
      //Functionalitieten voor letters klikken hier
      <Col key={colNr} className='grid'><RandomLetter /></Col>
    );
    colNr++;
  }
  return (
    <Row className='justify-content-center'>{woordzoekerColumns}</Row>
  );
}


export default WoordzoekerRow;
