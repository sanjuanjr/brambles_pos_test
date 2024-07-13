import React from 'react';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Box, Stack, Typography } from '@mui/material';
import cashiers from '../data/cashier_sample.json';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import { useSales } from '../context/SalesContext';
import { Cashier } from '../interfaces/Cashier';
import HeaderBar from '../components/HeaderBar';

const SelectCashier = () => {
    const navigate = useNavigate();
    const { setCashier, getSelectedCashierId } = useSales();

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
                    {cashiers.map((cashier, index) => {
                        const { id, name } = cashier;
                        return (
                            <Card
                                key={index}
                                data-testid={`cashier-${index}-card`}
                                variant="outlined"
                                component={Button}
                                onClick={() => handleItemClick(cashier)}
                                sx={{
                                    p: 3,
                                    height: 'fit-content',
                                    width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
                                    background: 'none',
                                    backgroundColor: getSelectedCashierId() === id ? 'action.selected' : 'background.paper',
                                    borderColor: (theme) => {
                                        if (theme.palette.mode === 'light') {
                                            return getSelectedCashierId() === id ? 'primary.light' : 'grey.200';
                                        }
                                        return getSelectedCashierId() === id ? 'primary.dark' : 'grey.800';
                                    },
                                    transition: 'background-color 0.3s, border-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: (theme) =>
                                            theme.palette.action.hover,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        textAlign: 'left',
                                        flexDirection: { xs: 'column', md: 'row' },
                                        alignItems: { md: 'center' },
                                        gap: 2.5,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: (theme) => {
                                                if (theme.palette.mode === 'light') {
                                                    return getSelectedCashierId() === id ? 'primary.main' : 'grey.300';
                                                }
                                                return getSelectedCashierId() === id ? 'primary.main' : 'grey.700';
                                            },
                                        }}
                                    >
                                        <PersonIcon />
                                    </Box>
                                    <Box sx={{ textTransform: 'none' }}>
                                        <Typography
                                            color="text.primary"
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            {name}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                            sx={{ my: 0.5 }}
                                        >
                                            Click here to select {name}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        );
                    })}
                </Stack>
            </FormControl>
        </Container>
    );
};

export default SelectCashier;
