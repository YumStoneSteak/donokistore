import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./../App.css";
import { addCart } from "../data/store";

const Detail = (props) => {
  let url = useParams();
  const { id, title, content, price } = props.shoes[url.id];
  const [tap, setTap] = useState(0);
  const [fade, setFade] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
    };
  }, []);

  return (
    <div className={`content start ${fade}`}>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{title}</h4>
          <p>{content}</p>
          <p>₩{price}</p>
          <p>Product id: {id}</p>
          <button
            className="btn btn-outline-warning"
            onClick={() => dispatch(addCart(props.shoes[url.id]))}
          >
            <i class="bi bi-bag-plus"></i> 주문하기
          </button>
        </div>
      </div>
      <Nav
        variant="tabs"
        defaultActiveKey="link0"
        className="justify-content-center"
      >
        <Nav.Item>
          <Nav.Link
            fill
            eventKey="link0"
            onClick={() => setTap(0)}
            className="NavLink"
          >
            Detail
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => setTap(1)}
            className="NavLink"
          >
            Ask
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => setTap(2)}
            className="NavLink"
          >
            Q&A
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TapContent tap={tap} />
    </div>
  );
};

const TapContent = ({ tap }) => {
  const contents = ["Detail", "Ask", "Q&A"];
  const [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
    };
  }, [tap]);
  return <div className={`start ${fade}`}>{contents[tap]}</div>;
};

export default Detail;
