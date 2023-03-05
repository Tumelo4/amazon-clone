import { ProductProps } from '@/pages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from './store'

export interface itemProps {
    item: ProductProps,
    qty: number
}

interface itemsProps {
    items: itemProps[],
    total: number
}

interface CartState {
    itemsProps: itemsProps
}

const initialState: CartState = {
    itemsProps: {
        items: [],
        total: 0,
    }
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<itemProps>) => {
            const checkItem = state.itemsProps.items.find((item) => item.item.id === action.payload.item.id);
            state.itemsProps.total = state.itemsProps.total + 1;
            if (checkItem) {
                state.itemsProps.items = state.itemsProps.items.map((item) => (
                    item.item.id === action.payload.item.id ? { ...item, qty: item.qty + 1 } : item
                ))
            }
            else {
                state.itemsProps.items = [...state.itemsProps.items, { ...action.payload }]
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            const checkItem = state.itemsProps.items.find((item) => item.item.id === action.payload);
            if (checkItem) {
                state.itemsProps.total = state.itemsProps.total - checkItem.qty;
                state.itemsProps.items = state.itemsProps.items.filter((item) => item.item.id !== action.payload)
            }
        },

        increment: (state, action: PayloadAction<number>) => {
            state.itemsProps.total = state.itemsProps.total + 1;
            state.itemsProps.items = state.itemsProps.items.map((item) => (
                item.item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
            ))
        },

        decrement: (state, action: PayloadAction<number>) => {
            state.itemsProps.total = state.itemsProps.total - 1;
            const checkItem = state.itemsProps.items.find((item) => item.item.id === action.payload);
            if (checkItem) { 
                if (checkItem.qty === 1) {
                    state.itemsProps.items = state.itemsProps.items.filter((item) => item.item.id !== action.payload)
                }
                else {
                    state.itemsProps.items = state.itemsProps.items.map((item) => (
                        item.item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
                    ))
                }
            }
        }
    }
})

export const { addToCart, removeFromCart, increment, decrement } = cartSlice.actions;

export const selectorItems = (state: RootState): itemsProps => state.cart.itemsProps;

export const selectorSubtotal = (state: RootState): number => state.cart.itemsProps.items.reduce((total: number, currentValue: itemProps) => {
    return total + currentValue.qty * currentValue.item.price
}, 0)

export default cartSlice.reducer