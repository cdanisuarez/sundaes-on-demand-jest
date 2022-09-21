import { useState } from 'react';
import { Container } from 'react-bootstrap';

import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

import { OrderDetailsProvider } from './context/OrderDetails';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
      throw new Error(`Unrecognized phase: ${orderPhase}`);
  }


  return (
    <Container>
      <OrderDetailsProvider>
        {<Component setOrderPhase={setOrderPhase} />}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
