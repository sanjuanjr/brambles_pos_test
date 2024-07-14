import React from 'react';
import { FormControl, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSales } from '../context/SalesContext';
import { Cashier } from '../interfaces/Cashier';
import cashiers from '../data/cashier_sample.json';
import HeaderBar from '../components/HeaderBar';
import CashierCard from '../components/CashierCard';

const SelectCashier: React.FC = () => {
    const navigate = useNavigate();
    const { setCashier } = useSales();

    const handleItemClick = (cashier: Cashier) => {
        setCashier(cashier);
        navigate('/dashboard');
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <HeaderBar showBackButton={false} title="Select Cashier" showCashierName={false} />
            <FormControl sx={{ width: '100%' }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    sx={{ width: '100%', display: 'flex' }}
                >
                    {cashiers.map((cashier) => (
                        <CashierCard key={cashier.id} cashier={cashier} handleItemClick={handleItemClick} />
                    ))}
                </Stack>
            </FormControl>
        </Container>
    );
};

export default SelectCashier;
