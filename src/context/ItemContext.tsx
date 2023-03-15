import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ItemProviderProps = {
    children: ReactNode
}

type Item = {
    id: number 
    quantity: number
    multiplier : number 
}

type ItemContext = {
    getItemQuantity: (id: number) => number
    getMultiplier: (id: number) => number
    increaseQuantity: (id: number, amount: number) => void
    increaseMultiplier: (id: number, amount: number ) => void
    removeItem: (id: number) => void
    Quantity: number
    getItems: () => Item[]
}

const ItemContext = createContext({} as ItemContext)

export function useItem() {
    return useContext(ItemContext)
}

export function ItemProvider( { children }: ItemProviderProps) {
    const [Items, setItems] = useLocalStorage<Item[]>("item", [])

    function getItems() {
        return Items
    }

    const Quantity = Items.reduce((quantity, item) => item.quantity + quantity, 0)

    function getItemQuantity(id: number) {
        return Items.find(item=> item.id === id)?.quantity || 0
    }

    function getMultiplier(id: number) {
        return Items.find(item=> item.id === id)?.multiplier || 1
    }

    function increaseQuantity(id: number, amount: number) {
        setItems(currItems => {
            if(currItems.find(item => item.id === id ) == null){
                return [...currItems, {id, quantity: amount, multiplier: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id){
                        return {...item, quantity: item.quantity + amount}
                    } else { 
                        return item
                    }
                })
            }
        })
    }

    function increaseMultiplier(id: number, amount: number){
        setItems(currItems => {
                return currItems.map(item => {
                    if (item.id === id){
                        return {...item, multiplier: item.multiplier + amount}
                    } else { 
                        return item
                    }
                })
        })
    }


    function removeItem(id: number) {
        setItems(currItems => {
            return currItems.filter(item=> item.id !== id)
        })
    }

    return (
    <ItemContext.Provider value={{ getItemQuantity, getMultiplier, increaseQuantity, increaseMultiplier, removeItem, Quantity, getItems}}>
        {children}
    </ItemContext.Provider>
    ) 
}