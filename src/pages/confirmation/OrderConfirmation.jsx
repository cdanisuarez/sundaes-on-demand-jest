import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../context/OrderDetails';

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        //TODO: add error handling
      });
  }, []);

  function handleClick() {
    resetOrder();
    setOrderPhase('inProgress');
  }

  return orderNumber ? (
    <div>
      <h1>Thank You!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  ) : (
    <div>Loading</div>
  );
}
