import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import SelectCashier from './components/SelectCashier';
import SalesDashboard from './components/SalesDashboard';
import {StateDisplay} from './components/StateDisplay';
import AddSale from './components/AddSale';
import {SalesProvider, useSales} from './context/SalesContext';
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
                <StateDisplay></StateDisplay>
            </ThemeProvider>
        </SalesProvider>
    )
};

export default App;
