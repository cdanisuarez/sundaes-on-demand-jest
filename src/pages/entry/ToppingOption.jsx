import { Col, Row, Form } from 'react-bootstrap';

export default function ToopingOption({ name, imagePath, updateItemCount }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />

      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Check
            type="checkbox"
            label={name}
            onChange={(e) => {
              updateItemCount(name, e.target.checked ? 1 : 0);
            }}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
