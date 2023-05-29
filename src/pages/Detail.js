import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./../App.css";

const Detail = (props) => {
  let url = useParams();
  const { id, title, content, price } = props.shoes[url.id];
  const [tap, setTap] = useState(0);
  const [fade, setFade] = useState("");

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
          <p>{price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => setTap(0)}>
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => setTap(1)}>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => setTap(2)}>
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TapContent tap={tap} />
    </div>
  );
};

const TapContent = ({ tap }) => {
  const contents = ["내용0", "내용1", "내용2"];
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
