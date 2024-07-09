import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { SalesProvider } from './context/SalesContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('react-chartjs-2', () => ({
  Bar: () => <div>Bar</div>,
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const defaultTheme = createTheme();

  return render(
      <SalesProvider>
        <ThemeProvider theme={defaultTheme}>
          {ui}
        </ThemeProvider>
      </SalesProvider>
  );
};

test('renders Select Cashier page by default', () => {
  renderWithProviders(<App />);
  const headerElement = screen.getByRole('heading', { name: /Select Cashier/i });
  expect(headerElement).toBeInTheDocument();
});
test('navigates to Sales Dashboard page', async () => {
  renderWithProviders(<App />);
  // Simulate navigation to the Sales Dashboard page
  await userEvent.click(screen.getByTestId('cashier-1-card'));
  const dashboardHeader = await screen.findByRole('heading', { name: /Sales Dashboard/i });
  expect(dashboardHeader).toBeInTheDocument();
});
test('navigates to Add Sale page', async () => {
  renderWithProviders(<App />);
  // Simulate navigation to the Add Sale page
  await userEvent.click(screen.getByRole('button', { name: /Add Sale/i }));
  const addSaleHeader = await screen.findByRole('heading', { name: /Add Sale/i });
  expect(addSaleHeader).toBeInTheDocument();
});
