import { render, fireEvent, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

describe('<SummaryForm />', () => {
  test('Initial condition', () => {
    render(<SummaryForm />);

    const button = screen.getByRole('button', { name: /confirm order/i });
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('Check/uncheck terms and button is enabled/disabled', () => {
    render(<SummaryForm />);

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
});
