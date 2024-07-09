import {useSales} from '../context/SalesContext';
export const StateDisplay = () => {
    const { state } = useSales();
    return <span>{JSON.stringify(state)}</span>;
};
