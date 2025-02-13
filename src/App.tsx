import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./App.css";
import { Spinner } from "react-bootstrap";

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [sendMessageStatus, setSendMessageStatus] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [getMessageLoading, setGetMessageLoading] = useState(false);

  const clientSideErrorMessage =
    messageToSend.length === 0 ? "Message cannot be empty" : undefined;

  const [hasSubmittedAtLeastOnce, setHasSubmittedAtLeastOnce] = useState(false);

  async function getMessage() {
    try {
      setGetMessageLoading(true);
      const response = await axios.get("http://localhost:8080/get_messages");
      setMessages(response.data?.split(",") ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setGetMessageLoading(false);
    }
  }

  async function sendMessage() {
    setHasSubmittedAtLeastOnce(true);
    if (clientSideErrorMessage !== undefined) {
      return;
    }

    setSendMessageStatus("");
    try {
      setSendMessageLoading(true);
      const response = await axios.post("http://localhost:8080/send_message", {
        message: messageToSend,
      });

      setSendMessageStatus(response.data);
    } catch (error) {
      setSendMessageStatus(error.message);
    } finally {
      setSendMessageLoading(false);
    }
  }

  return (
    <Container>
      <h1>Message App</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Group className="row mb-3" controlId="message">
          <Form.Label className="col-3 col-offset-9" s>
            Message
          </Form.Label>
          <Form.Control
            isInvalid={
              clientSideErrorMessage !== undefined && hasSubmittedAtLeastOnce
            }
            className="col-12"
            type="text"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
          />
          {clientSideErrorMessage && hasSubmittedAtLeastOnce && (
            <Form.Control.Feedback type="invalid">
              {clientSideErrorMessage}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="row mb-3">
          <Button
            className="col-3"
            variant="success"
            onClick={() => sendMessage()}
          >
            Send message
          </Button>
          {sendMessageLoading ? (
            <div className="col-9">
              <Spinner />
            </div>
          ) : (
            <div className="col-9">{sendMessageStatus}</div>
          )}
        </div>

        <div className="row gy-3">
          <Button
            className="col-3 col-offset-9"
            variant="info"
            onClick={() => getMessage()}
          >
            Get message
          </Button>
          <p className="col-12">
            {getMessageLoading ? (
              <Spinner />
            ) : (
              <ul>
                {messages.map((msg) => (
                  <li>{msg}</li>
                ))}
              </ul>
            )}
          </p>
        </div>
      </Form>
    </Container>
  );
}
