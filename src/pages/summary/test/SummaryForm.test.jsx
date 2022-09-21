import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

describe('<SummaryForm />', () => {
  test('Initial condition', () => {
    render(<SummaryForm setOrderPhase={jest.fn()} />);

    const button = screen.getByRole('button', { name: /confirm order/i });
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('Check/uncheck terms and button is enabled/disabled', () => {
    render(<SummaryForm setOrderPhase={jest.fn()} />);

    const button = screen.getByRole('button', { name: /confirm order/i });
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('Popover responds to hover', async () => {
    render(<SummaryForm setOrderPhase={jest.fn()} />);

    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
