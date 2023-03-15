import { Card,  Stack } from "react-bootstrap";
import { useItem } from "../context/ItemContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { TotalItem } from "./TotalItem"
import storeItems from "../data/items.json"

export function Total() {
    const { getItems } = useItem()
    const Item = getItems()
    const cI = Item.filter(item => item.id != 0)
    cI.sort(function(a, b) { 
        return a.id - b.id;
      });

    return (
        <Card style={{minWidth: "350px"}}>
            <Card.Body>
            <Card.Title>
            {formatCurrency(cI.reduce((total, cartItem) => {
                    const item = storeItems.find(i => i.id === cartItem.id) 
                    return total + (item?.mps || 0 ) * cartItem.quantity * cartItem.multiplier
                    },0))} per Second
            </Card.Title>
            <Stack gap={3}> 
                {cI.map(item => ( 
                <TotalItem key={item.id} {...item} />))}
            </Stack>
            </Card.Body>
        </Card>
    )
}