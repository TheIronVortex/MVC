import React from 'react';
import Container from 'react-bootstrap/Container';
import WoordzoekerRow from './WoordzoekerKaart';
import Row from 'react-bootstrap/Row';
import './Woordzoeker.css';

function Woordzoeker() {  
  return (
    <>
      <Container>
        <Row className='p-4'></Row>
        <div className='border pt-2'>
          <WoordzoekerRow colAmount={8}/>
          <WoordzoekerRow colAmount={8}/>
          <WoordzoekerRow colAmount={8}/>
          <WoordzoekerRow colAmount={8}/>
          <WoordzoekerRow colAmount={8}/>
          <WoordzoekerRow colAmount={8}/>
          <WoordzoekerRow colAmount={8}/>
          <WoordzoekerRow colAmount={8}/>
        </div>
      </Container>
    </>
  );
}

export default Woordzoeker;