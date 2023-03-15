import {Routes, Route} from "react-router-dom"
import { Container } from "react-bootstrap"
import { Game } from "./pages/Game"
import { Navbar } from "./components/Navbar"
import { ItemProvider } from "./context/ItemContext"
import { WalletProvider } from "./context/WalletContext"

function App() {
  return (
    <WalletProvider>
    <ItemProvider>
      <Navbar />
      <Container className="mb-4"> 
        <Game />
      </Container>
    </ItemProvider>
    </WalletProvider>
  )
}

export default App
