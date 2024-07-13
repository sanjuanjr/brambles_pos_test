import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarChart } from '@mui/x-charts/BarChart';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {  Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSales } from '../context/SalesContext';
import HeaderBar from '../components/HeaderBar';
import getCashierById from '../helpers/getCashierById';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesDashboard: React.FC = () => {
    const { state, resetCashier } = useSales();
    const navigate = useNavigate();

    const handleSwitchCashier = () => {
        resetCashier();
        navigate('/');
    }

    // Prepare data for the chart
    const cashierSales = state.sales.reduce<Record<number, number>>((acc, sale) => {
        acc[sale.cashierId] = (acc[sale.cashierId] || 0) + sale.saleAmount;
        return acc;
    }, {});

    const labels = Object.keys(cashierSales).map(key => getCashierById(parseInt(key, 10))?.name);
    const salesData = Object.values(cashierSales);

    return (
        <Container sx={{ marginTop: 4 }}>
            <HeaderBar showBackButton={false} title="Sales Dashboard" showCashierName={true} />
            <BarChart
                series={[{
                    data: salesData,
                }]}
                height={400}
                xAxis={[{ data: labels, scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
            <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Button variant="contained" color="secondary" onClick={handleSwitchCashier}>
                    Switch Cashier
                </Button>
                <Button variant="contained" color="primary" onClick={() => navigate('/add-sale')}>
                    Add Sale
                </Button>
            </Box>
        </Container>
    );
};

export default SalesDashboard;
