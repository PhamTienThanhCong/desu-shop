import { Link } from "react-router-dom";
import { clearProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Success = () => {
  const dispatch = useDispatch();

  dispatch(clearProduct())
  
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {
         `Order has been created successfully.`
        }
        <Link to="/">
          <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </Link>
    </div>
  );
};

export default Success;   
