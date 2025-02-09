import React from 'react';
import './App.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <h1>Message App</h1>
      <Form>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>
            Message
          </Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <ButtonGroup className="mb-3">
        <Button variant="success">Send message</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup className="mb-3">
          <Button variant="info">Get message</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default App;
