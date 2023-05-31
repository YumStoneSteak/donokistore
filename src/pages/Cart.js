import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount, minCount } from "../data/store";

const Cart = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quatity</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {state.cart.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>₩{item.price}</td>
            <td>{item.count}</td>
            <td>
              <button
                className="btn btn-success m-1"
                onClick={() => dispatch(addCount(item.id))}
              >
                +
              </button>
              <button
                className="btn btn-success m-1"
                onClick={() => dispatch(minCount(item.id))}
              >
                -
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Cart;
