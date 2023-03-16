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
        <Container fluid="true">
        <Row>
            <Col xs={12} md={12} lg={4}>
                <Card style={{marginBottom: "15px"}}>
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>
                            Purchase Rate
                        </Card.Title>
                        <ButtonGroup aria-label="Basic exampled" >
                            <Button variant="dark" disabled={purchaseRate === 1 ? true : false} onClick={() => setPurchaseRate(1)}>1x</Button>
                            <Button variant="dark" disabled={purchaseRate === 10 ? true : false} onClick={() => setPurchaseRate(10)}>10x</Button>
                            <Button variant="dark" disabled={purchaseRate === 100 ? true : false} onClick={() => setPurchaseRate(100)}>100x</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card> 
                <Total/>
            </Col>
            <Col xs={12} md={12} lg={8}>
                <Row md={2} xs={1} lg={2} className="g-3"> 
                    {sI.map(item => (
                        <Col key={item.id}><StoreItem {...item} purchaseRate={purchaseRate}/></Col>
                    ))}
                </Row>
            </Col>
        </Row>
        </Container>    
    )
}