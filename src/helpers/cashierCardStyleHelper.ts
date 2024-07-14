import { Theme } from '@mui/material/styles';

export const getBoxColor = (theme: Theme, selectedCashierId: number, id: number) => {
    const isLightMode = theme.palette.mode === 'light';
    const isSelected = selectedCashierId === id;
    return isLightMode
        ? isSelected
            ? 'primary.main'
            : 'grey.300'
        : isSelected
            ? 'primary.main'
            : 'grey.700';
};

export const getCardStyles = (theme: Theme, selectedCashierId: number, id: number) => ({
    p: 3,
    height: 'fit-content',
    width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
    background: 'none',
    backgroundColor: selectedCashierId === id ? theme.palette.action.selected : theme.palette.background.paper,
    borderColor: theme.palette.mode === 'light'
        ? selectedCashierId === id
            ? theme.palette.primary.light
            : theme.palette.grey[200]
        : selectedCashierId === id
            ? theme.palette.primary.dark
            : theme.palette.grey[800],
    transition: 'background-color 0.3s, border-color 0.3s',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
});
