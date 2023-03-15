import { useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import { useItem } from "../context/ItemContext"
import { useWallet } from "../context/WalletContext"
import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemProps = {
    id: number
    name: string
    price: number 
    imgUrl: string
    mps: number
    purchaseRate: number 
}

export function StoreItem({ id, name, price, imgUrl, mps, purchaseRate} :StoreItemProps) {
    const { getItemQuantity, increaseQuantity, getMultiplier, increaseMultiplier } = useItem()
    const { getMoney, decreaseMoney, increaseMoney } = useWallet()

    const quantity = getItemQuantity(id)
    const multiplier = getMultiplier(id)
    const p = price * (1.15**quantity);
    const m = (price * 100) * (1.15**multiplier);

    let finalPrice = p
    if (purchaseRate === 10){
        finalPrice = p * 20.303718238
    } else if (purchaseRate === 100){
        finalPrice = p * 7828749.671335256
    }

    let finalMultiPrice = m
    if (purchaseRate === 10){
        finalMultiPrice = m * 20.303718238
    } else if (purchaseRate === 100){
        finalMultiPrice = m * 7828749.671335256
    }

    useEffect(()=> {   
        if (quantity === 0 && id === 0 ){
        increaseQuantity(0, 1)
    }},[])

    return (
    <Card className="h-100"> 
        {id ===0 ? 
        <Card.Img variant="top" src={imgUrl} height="200px" style={{objectFit: "cover", cursor: "pointer"}}
        onClick={id===0 ? ()=> increaseMoney(quantity*mps*multiplier) : () => undefined}>
        </Card.Img> 
        : 
        <Card.Img variant="top" src={imgUrl} height="200px" style={{objectFit: "cover"}}/> 
        }

        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
                <div> 
                    <span className="fs-4"> {name}</span>
                    <span className="ms-1 text-muted">{quantity}x{multiplier}</span>
                </div> 
                <span className="ms-2 text-muted">{formatCurrency(quantity*mps*multiplier)}{id===0 ? " per click" : "/S"}</span>
            </Card.Title>
            <span className="ms-1 text-muted">Increase Quantity</span>
            <Button disabled={getMoney() < (finalPrice)} className="w-100 btn-dark" onClick={() => {increaseQuantity(id, purchaseRate); decreaseMoney(finalPrice)}}>{(formatCurrency(finalPrice))}</Button>
            <span className="ms-1 text-muted">Increase Multiplier</span>
            <Button disabled={getMoney() < (finalMultiPrice) || quantity === 0} className="w-100 btn-dark" onClick={() => {increaseMultiplier(id, purchaseRate); decreaseMoney(finalMultiPrice)}}>{formatCurrency(finalMultiPrice)}</Button>
        </Card.Body>
    </Card>
    )
}