import { Container, Nav, Navbar as NavbarBs} from "react-bootstrap"
import { useWallet } from "../context/WalletContext"
import { formatCurrency } from "../utilities/formatCurrency"

export function Navbar() {
    const { getMoney } = useWallet()
    const money = getMoney()

    return <NavbarBs sticky="top" className="bg-white shadow-sm mb-3"> 
        <Container> 
            <Nav className="me-auto"> 
            <svg transform="translate(-1,7)" width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16H13C13.6667 16 15 15.6 15 14C15 12.4 13.6667 12 13 12H11C10.3333 12 9 11.6 9 10C9 8.4 10.3333 8 11 8H12M12 16H9M12 16V18M15 8H12M12 8V6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span className="navbar-text fs-4"> { formatCurrency(money) } </span>
            </Nav>
            <Nav className="me-auto">
                
            </Nav>
        </Container>
    </NavbarBs>
}