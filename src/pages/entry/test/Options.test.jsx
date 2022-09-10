import { render, screen } from '../../../utils/tests/testing-library';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('Displays image for each scoop from server', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Displays image for each tooping from server', async () => {
  render(<Options optionType="toppings" />);

  const scoopImages = await screen.findAllByRole('img', { name: /topping$/i });
  expect(scoopImages).toHaveLength(3);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

test('Update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('Update toppings subtotal when topping is checked/unchecked', async () => {
  render(<Options optionType="toppings" />);

  const toppingSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent('0.00');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });

  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });

  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent('1.50');

  userEvent.click(hotFudgeCheckbox);
  expect(toppingSubtotal).toHaveTextContent('3.00');

  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent('1.50');
});
