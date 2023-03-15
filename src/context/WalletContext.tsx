import { createContext, useState, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type WalletProviderProps = {
    children: ReactNode
}

type Currency = {
    id: number 
    quantity: number
}

type WalletContext = {
    getMoney: () => number
    increaseMoney: (amount: number) => void 
    decreaseMoney: (amount: number) => void 
}

const WalletContext = createContext({} as WalletContext)

export function useWallet() {
    return useContext(WalletContext)
}

export function WalletProvider({ children }: WalletProviderProps){
    const [currencys, setCurrencys] = useLocalStorage<number>("wallet", 0)

    function getMoney() {
        return currencys
    }

    function increaseMoney(amount: number) {
        setCurrencys(currencys => currencys + amount)
    }

    function decreaseMoney(amount: number) {
        setCurrencys(currencys => currencys - amount)
    }
    return(
        <WalletContext.Provider value={{ getMoney, increaseMoney, decreaseMoney}}>
        {children}
        </WalletContext.Provider>
    )
}