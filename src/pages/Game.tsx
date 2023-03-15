import { Col, Card, Container, Row, ButtonGroup, Button } from "react-bootstrap"
import { Total } from "../components/Total"
import { StoreItem } from "../components/StoreItem"
import { useItem } from "../context/ItemContext"
import sI from "../data/items.json"
import { useState } from "react"


export function Game() {
    const [purchaseRate, setPurchaseRate] = useState<number>(1);
    const {  getItems } = useItem()
    const Item = getItems()
    console.log(purchaseRate)

    return (
        <Container >
        <Row>
            <div className="col">
            <Row md={1} xs={1} lg={2} className="g-3"> 
                {sI.map(item => (
                    <Col key={item.id}><StoreItem {...item} purchaseRate={purchaseRate}/></Col>
                ))}
            </Row>
            </div>
            <div className="col col-md-auto"> 
                <Card className="g-3">
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>
                            Purchase Rate
                        </Card.Title>
                        <ButtonGroup aria-label="Basic exampled" >
                            <Button variant="secondary" disabled={purchaseRate === 1 ? true : false} onClick={() => setPurchaseRate(1)}>1x</Button>
                            <Button variant="secondary" disabled={purchaseRate === 10 ? true : false} onClick={() => setPurchaseRate(10)}>10x</Button>
                            <Button variant="secondary" disabled={purchaseRate === 100 ? true : false} onClick={() => setPurchaseRate(100)}>100x</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card> 
                <Total/>
            </div>
        </Row>
        </Container>    
    )
}