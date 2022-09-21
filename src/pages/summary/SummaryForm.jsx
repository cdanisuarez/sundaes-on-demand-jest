import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const SummaryForm = ({ setOrderPhase }) => {
  const [isChecked, setIsChecked] = useState(false);

  const popover = () => (
    <Popover id="terms-and-conditions-popover">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setOrderPhase('completed');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          label={
            <span>
              I agree to
              <OverlayTrigger placement="right" overlay={popover}>
                <span style={{ color: 'blue' }}>Terms and conditions</span>
              </OverlayTrigger>
            </span>
          }
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
