import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import data from "./data/data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";

function App() {
  const [shoes, setShoes] = useState(data);
  const [alert, setAlert] = useState(true);
  const [text, setText] = useState("a");
  const [textBox, setTextBox] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [clickCount, setClickCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  const sale2Second = () => {
    return alert === true ? (
      <div className="alert alert-warning mb-0">⭐2초 이내 구매시 할인⭐</div>
    ) : null;
  };

  useEffect(() => {
    setTextBox(
      isNaN(text) === true ? "글자를 입력해주세요" : "숫자는 빼주세요"
    );
  }, [text]);

  const loadingMsg = (showMsg) => {
    return showMsg === true ? <div>loading...</div> : null;
  };

  const loadShoes = () => {
    if (clickCount < 3) {
      axios
        .get(`https://codingapple1.github.io/shop/data${clickCount + 1}.json`)
        .then((resault) => {
          const newShoes = shoes.concat(resault.data);
          // const newShoes = [...shoes, ...resault.data];
          setShoes(newShoes);
        })
        .catch(() => {
          console.log("실패");
        });
    }
  };

  const moreBtn = () => {
    setShowMsg(true);
    setClickCount(clickCount + 1);
    loadShoes(clickCount);
    setShowMsg(false);
  };

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
              <Nav.Link onClick={() => navigate("/cart")}>Cart</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      {sale2Second()}
      <div className="main-bg" />
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
                {loadingMsg(showMsg)}
                <button
                  className="btn btn-success m-2"
                  onClick={() => moreBtn()}
                >
                  see more
                </button>
                <button
                  className="btn btn-success m-2"
                  onClick={() => navigate("/cart")}
                >
                  Cart
                </button>
              </div>
            }
          />
          <Route path="/detail/:id" element={<Detail shoes={shoes} />}></Route>
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<h3>첫 주문시 양배추즙 서비스</h3>} />
            <Route path="two" element={<h3>생일기념 쿠폰받기</h3>} />
          </Route>
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버들</div>} />
            <Route path="location" element={<div>회사위치</div>} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h1>404 page</h1>}></Route>
        </Routes>
        <div className="input">
          <div>{textBox}</div>
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
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
