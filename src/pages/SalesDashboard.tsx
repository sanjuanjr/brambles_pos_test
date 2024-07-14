import React, { useMemo } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSales } from '../context/SalesContext';
import HeaderBar from '../components/HeaderBar';
import getCashierById from '../helpers/getCashierById';

// Helper function to prepare data for the chart
const prepareChartData = (sales: Array<{ cashierId: number; saleAmount: number }>) => {
    const cashierSales = sales.reduce<Record<number, number>>((acc, sale) => {
        acc[sale.cashierId] = (acc[sale.cashierId] || 0) + sale.saleAmount;
        return acc;
    }, {});

    const labels = Object.keys(cashierSales).map(key => {
        const cashier = getCashierById(parseInt(key, 10));
        return cashier ? cashier.name : 'Unknown Cashier';
    });

    const salesData = Object.values(cashierSales);

    return { labels, salesData };
};

const SalesDashboard: React.FC = () => {
    const { state: { sales }, resetCashier } = useSales();
    const navigate = useNavigate();

    const { labels, salesData } = useMemo(() => prepareChartData(sales), [sales]);

    const handleSwitchCashier = () => {
        resetCashier();
        navigate('/');
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <HeaderBar showBackButton={false} title="Sales Dashboard" showCashierName={true} />
            <BarChart
                series={[{ data: salesData }]}
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
