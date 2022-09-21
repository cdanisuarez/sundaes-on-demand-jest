import { render, screen, waitFor } from '../../../utils/tests/testing-library';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';

test('Handles error for scoops and toppings routes', async () => {
  server.resetHandlers([
    rest.get('http://localhost:3030/scoops', (_, res, ctx) => {
      res(ctx.status(500));
    }),
    rest.get('http://localhost:3030/toppings', (_, res, ctx) => {
      res(ctx.status(500));
    }),
  ]);

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

describe('Grand total', () => {
  test('Updates properly if scoop is added first', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('Updates properly if topping is added first', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('Updates properly if item is removed', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '0');

    expect(grandTotal).toHaveTextContent('0.00');
  });
});
