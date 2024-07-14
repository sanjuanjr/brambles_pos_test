import cashiers from '../data/cashier_sample.json';
import {Cashier} from '../interfaces/Cashier'

// Function to find a cashier by ID
export default function getCashierById(id: number): Cashier | undefined {
    return cashiers.find((cashier: Cashier) => cashier.id === id);
}
