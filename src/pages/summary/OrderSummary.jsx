import { useOrderDetails } from '../../context/OrderDetails';
import SummaryForm from './SummaryForm';

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([scoopName, scoopCount]) => (
    <li key={scoopName}>
      {scoopName} x {scoopCount}
    </li>
  ));

  const toppingArray = Array.from(orderDetails.toppings.entries());
  const toppingList = toppingArray.map(([toppingName, toppingCount]) => (
    <li key={toppingName}>
      {toppingName} x {toppingCount}
    </li>
  ));

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>{toppingList}</ul>
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
