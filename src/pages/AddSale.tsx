import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSales } from '../context/SalesContext';
import products from '../data/products_sample.json';
import HeaderBar from '../components/HeaderBar';

import {Product} from '../interfaces/Product';
import {Sale} from '../interfaces/Sale'

const initialQuantities = products.reduce((acc: { [key: number]: number }, product: Product) => {
    acc[product.sku] = 0;
    return acc;
}, {});

const AddSale: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useSales();
    const [quantities, setQuantities] = useState<{ [key: number]: number }>(initialQuantities);
    const [totalItems, setTotalItems] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const totalItems = Object.values(quantities).reduce((acc, quantity) => acc + quantity, 0);
        const totalCost = products.reduce((acc, product) => acc + (quantities[product.sku] * product.price), 0);
        setTotalItems(totalItems);
        setTotalCost(totalCost);
    }, [quantities]);

    const handleQuantityChange = (sku: number, value: string) => {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue >= 0) {
            setQuantities(prevQuantities => ({ ...prevQuantities, [sku]: parsedValue }));
        } else {
            setQuantities(prevQuantities => ({ ...prevQuantities, [sku]: 0 }));
        }
    };

    const handleSubmit = () => {
        const saleAmount = totalCost;
        const cashierId = state.selectedCashier?.id;
        if (cashierId && saleAmount > 0) {
            const sale: Sale = { cashierId, saleAmount };
            dispatch({ type: 'ADD_SALE', payload: sale });
            navigate('/dashboard');
        }
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <HeaderBar showBackButton={true} title="Add Sale" showCashierName={true} />
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Products
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="products table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.sku}>
                                    <TableCell component="th" scope="row">
                                        {product.name}
                                    </TableCell>
                                    <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            type="number"
                                            label="Quantity"
                                            value={quantities[product.sku]}
                                            // onChange={(e) => handleQuantityChange(product.sku, parseInt(e.target.value, 10))}
                                            onChange={(e) => handleQuantityChange(product.sku, e.target.value)}
                                            sx={{ width: 80 }}
                                            inputProps={{ pattern: '[0-9]+' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">${(quantities[product.sku] * product.price).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total Items: {totalItems}</Typography>
                    <Typography variant="h6">Total Cost: ${totalCost.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit Sale
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddSale;

