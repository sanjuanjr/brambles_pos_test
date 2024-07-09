import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {  Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSales } from '../context/SalesContext';
import HeaderBar from './HeaderBar';
import getCashierById from '../helpers/getCashierById';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesBarChart: React.FC = () => {
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

    const data = {
        labels: Object.keys(cashierSales).map(key => getCashierById(parseInt(key, 10))?.name),
        datasets: [
            {
                label: 'Total Sales',
                data: Object.values(cashierSales),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Sales by Cashier',
            },
        },
    };

    return (
        <Container sx={{ marginTop: 4 }}>
                <HeaderBar showBackButton={false} title="Sales Dashboard" showCashierName={true} />
                <Bar data={data} options={options} />
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

export default SalesBarChart;
