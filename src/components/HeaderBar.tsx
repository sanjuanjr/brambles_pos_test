import React from 'react';
import { Box, Button, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSales } from '../context/SalesContext';

interface HeaderBarProps {
    showBackButton: boolean;
    title: string;
    showCashierName: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ showBackButton, title, showCashierName }) => {
    const navigate = useNavigate();
    const { state } = useSales();

    return (
        <Box display="flex" justifyContent="center" alignItems="center" position="relative">
            {showBackButton && (
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ position: 'absolute', left: 0 }}
                >
                    Back
                </Button>
            )}
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            {showCashierName && state.selectedCashier && (
                <Box position="absolute" right={0} display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.main', marginRight: 1 }}>
                        <PersonIcon />
                    </Avatar>
                    <Typography variant="h6">
                        {state.selectedCashier.name}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default HeaderBar;
