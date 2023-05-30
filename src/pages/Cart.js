import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setCountPlus } from "../data/store";

const Cart = () => {
  const state = useSelector((state) => state);
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {state.cart.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.count}</td>
            <td>
              <button onClick={setCountPlus}>+</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Cart;
