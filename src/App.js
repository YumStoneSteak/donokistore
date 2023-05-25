import { Button, Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/Detail";

function App() {
  let [shoes, setShoes] = useState(data);
  const navigate = useNavigate();

  return (
    <div className="App">
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Donoki Store</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
              <Nav.Link onClick={() => navigate(-1)}>Go back</Nav.Link>
              <Nav.Link onClick={() => navigate("/event/one")}>
                Event 1
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/event/two")}>
                Event 2
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div className="main-bg"></div>
      <div className="main-contents mt-3">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <div className="row">
                  {shoes.map((item, index) => (
                    <ShoesList key={index} item={item} />
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/detail/:id" element={<Detail shoes={shoes} />}></Route>;
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<h3>첫 주문시 양배추즙 서비스</h3>} />
            <Route path="two" element={<h3>생일기념 쿠폰받기</h3>} />
          </Route>
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버들</div>} />
            <Route path="location" element={<div>회사위치</div>} />
          </Route>
          <Route path="*" element={<h1>404 page</h1>}></Route>
        </Routes>
      </div>
    </div>
  );
}

const ShoesList = (props) => {
  const { id, title, price } = props.item;

  return (
    <div className="col-md-4">
      <Link to={`/detail/${id}`}>
        <img
          src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`}
          width="80%"
        />
        <h4>{title}</h4>
        <p>{price}</p>
      </Link>
    </div>
  );
};

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>About page</div>
      <button
        className="btn btn-success m-2"
        onClick={() => navigate("/about/member")}
      >
        member
      </button>
      <button
        className="btn btn-success m-2"
        onClick={() => navigate("/about/location")}
      >
        location
      </button>
      <Outlet></Outlet>
    </>
  );
};

const Event = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="btn btn-success m-3"
        onClick={() => navigate("/event/one")}
      >
        event/one
      </button>
      <button
        className="btn btn-success m-3"
        onClick={() => navigate("/event/two")}
      >
        event/two
      </button>
      <h1>오늘의 이벤트</h1>
      <Outlet></Outlet>
    </>
  );
};
export default App;
