
import { Link } from "react-router-dom";

const Success = () => {
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)


//   useEffect(() => {
    
//  const timer = setTimeout(() => {
//       window.location.replace("/");
//     }, 5000);
//     return () => clearTimeout(timer);
//   });

  
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
