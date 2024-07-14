import React, { useMemo } from 'react';
import { Card, Button, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import { Cashier } from '../interfaces/Cashier';
import { useSales } from '../context/SalesContext';
import { getCardStyles, getBoxColor } from '../helpers/cashierCardStyleHelper'; // adjust the import path as necessary

interface CashierCardProps {
    cashier: Cashier;
    handleItemClick: (cashier: Cashier) => void;
}

const CashierCard: React.FC<CashierCardProps> = ({ cashier, handleItemClick }) => {
    const theme = useTheme();
    const { getSelectedCashierId } = useSales();
    const selectedCashierId = getSelectedCashierId();

    const cardStyles = useMemo(() => getCardStyles(theme, selectedCashierId, cashier.id), [theme, selectedCashierId, cashier.id]);
    const boxColor = useMemo(() => getBoxColor(theme, selectedCashierId, cashier.id), [theme, selectedCashierId, cashier.id]);

    return (
        <Card
            key={cashier.id}
            data-testid={`cashier-${cashier.id}-card`}
            variant="outlined"
            component={Button}
            onClick={() => handleItemClick(cashier)}
            sx={cardStyles}
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
                <Box sx={{ color: boxColor }}>
                    <PersonIcon />
                </Box>
                <Box sx={{ textTransform: 'none' }}>
                    <Typography color="text.primary" variant="body2" fontWeight="bold">
                        {cashier.name}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                        Click here to select {cashier.name}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default CashierCard;
