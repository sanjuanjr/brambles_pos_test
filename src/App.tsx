import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import SelectCashier from './pages/SelectCashier';
import SalesDashboard from './pages/SalesDashboard';
import AddSale from './pages/AddSale';
import {SalesProvider} from './context/SalesContext';
import {ThemeProvider, createTheme, styled} from '@mui/material/styles';
import {Container, Paper} from '@mui/material';


const App = () => {

    const defaultTheme = createTheme();

    const RootContainer = styled(Container)(({ theme }) => ({
        marginTop: theme.spacing(4),
    }));

    const StyledPaper = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(2),
    }));

    return (
        <SalesProvider>
            <ThemeProvider theme={defaultTheme}>
                <RootContainer>
                    <StyledPaper elevation={3}>
                        <CssBaseline/>
                        <Router>
                            <Routes>
                                <Route path="/" element={<SelectCashier/>}/>
                                <Route path="/dashboard" element={<SalesDashboard/>}/>
                                <Route path="/add-sale" element={<AddSale/>}/>
                            </Routes>
                        </Router>
                    </StyledPaper>
                </RootContainer>
            </ThemeProvider>
        </SalesProvider>
    )
};

export default App;
