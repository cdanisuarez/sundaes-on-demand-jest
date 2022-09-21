import Options from './Options';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../context/OrderDetails';

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <h1>Desing your sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase('review')}>Order Sundae!</Button>
    </div>
  );
}
