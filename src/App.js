import { Button, Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import data from "./data.js";

function App() {
  let [shoes, setShoes] = useState(data);

  return (
    <div className="App">
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Donoki Store</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div className="main-bg"></div>
      <div className="container">
        <div className="row">
          {shoes.map((item, index) => (
            <ShoesList key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ShoesList = ({ item }) => {
  const { id, title, price } = item;
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`}
        width="80%"
      />
      <h4>{title}</h4>
      <p>{price}</p>
    </div>
  );
};

export default App;
