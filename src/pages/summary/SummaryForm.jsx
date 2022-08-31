import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SummaryForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          label={
            <span>
              I agree to
              <span style={{ color: 'blue' }}>Terms and conditions</span>
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
