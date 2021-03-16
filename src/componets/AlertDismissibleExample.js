import React, { useState } from 'react';

import { Alert, Button } from 'react-bootstrap';

export default function AlertDismissibleExample({ text }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{text}</p>
      </Alert>
    );
  }
  return (
    <Button variant="outline-danger" onClick={() => setShow(true)}>
      Show Alert
    </Button>
  );
}
