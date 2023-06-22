import {
  Navbar,
  Container,
  Nav,
  ButtonGroup,
  Button,
  Card,
} from "react-bootstrap";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import data from "./data/data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [shoes, setShoes] = useState(data);
  const [alert, setAlert] = useState(true);
  const [textBox, setTextBox] = useState(" ");
  const [showMsg, setShowMsg] = useState(false);
  const [clickCount, setClickCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const sale2Second = () => {
    return alert === true ? (
      <div className="alert alert-warning mb-0 salemsg">
        ⭐4초 이내 구매시 할인⭐
      </div>
    ) : null;
  };

  useEffect(() => {
    setTextBox(
      isNaN(textBox) === true ? "글자를 입력해주세요" : "숫자는 빼주세요"
    );
  }, [textBox]);

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

  let userdata = useQuery(["userdata"], () => {
    return axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((response) => response.data);
  });

  console.log(userdata.data);
  console.log(userdata.isLoading);
  console.log(userdata.error);

  return (
    <div className="App">
      <div>
        <Navbar bg="dark" variant="dark" fixed="top" className="navbar">
          <Container>
            <Navbar.Brand href="/DonokiStore.github.io">
              Donoki Store
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/about/member")}>
                About
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/event/one")}>Event</Nav.Link>
              <Nav.Link onClick={() => navigate("/cart")}>Cart</Nav.Link>

              {/* <Nav.Link onClick={() => navigate(-1)}>Go BackPage</Nav.Link> */}
            </Nav>
            <Nav className="ms-auto" style={{ color: "white" }}>
              <div>
                {userdata.isLoading && "로딩중"}
                {userdata.error && "에러남"}
                {userdata.data && userdata.data.name}
              </div>
            </Nav>
          </Container>
        </Navbar>
      </div>

      <div className="main-bg"></div>
      {sale2Second()}
      <div className="main-contents">
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
                <ButtonGroup className="mb-2">
                  <Button variant="light" onClick={() => moreBtn()}>
                    <i className="bi bi-three-dots"></i> More
                  </Button>
                  <Button variant="light" onClick={() => navigate("/cart")}>
                    <i className="bi bi-bag-check"></i> Cart
                  </Button>
                </ButtonGroup>
              </div>
            }
          ></Route>
          <Route path="/detail/:id" element={<Detail shoes={shoes} />}></Route>
          <Route path="/event" element={<Event />}>
            <Route
              path="one"
              element={<h3>첫 주문시 실타래와 양배추즙 서비스</h3>}
            />
            <Route path="two" element={<h3>생일기념 쿠폰받기</h3>} />
          </Route>
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>이동혁 대표</div>} />
            <Route
              path="location"
              element={<div>서울 마포구 양화로12길 8-6</div>}
            />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h1>404 page</h1>}></Route>
        </Routes>
        {/* <div className="input">
          <div>{textBox}</div>
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div> */}
      </div>
    </div>
  );
}

const ShoesList = (props) => {
  const { id, title, price } = props.item;

  return (
    <div className="col-md-4 mb-3">
      <Link to={`/detail/${id}`}>
        <Card className="card">
          <Card.Img
            variant="top"
            src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`}
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>₩{price}</Card.Text>
          </Card.Body>
        </Card>
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
