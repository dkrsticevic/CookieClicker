import { useEffect } from "react"
import { Stack } from "react-bootstrap"
import { useWallet } from "../context/WalletContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type TotalItemProps = {
    id: number 
    quantity: number
    multiplier: number
}

export function TotalItem({id, quantity, multiplier}: TotalItemProps) {
    const {increaseMoney} = useWallet()

    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    const mps = item.mps * quantity * multiplier

    useEffect(() => {
        const interval = setInterval(() => {
            increaseMoney(mps)
          }, 1000);

         return () => clearInterval(interval); 
    }, [mps])

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items=center">
            <img src={item.imgUrl} style={{width: "80px", height: "40px", objectFit: "cover"}}/>
            <div className="me-auto"> 
                <div>
                    {item.name} {quantity > 1 && <span className="text-muted" style={{ fontSize: ".65rem"}}>x{quantity}</span>}
                </div>
            </div>
            <div> {formatCurrency(item.mps * quantity * multiplier)}/S </div>
        </Stack>
    )
}