import PublishIcon from '@mui/icons-material/Publish';
import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function Product() {
    const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});

  const product = useSelector((state) =>
    state.product.products.find((product) => product.id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("product/" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs };
    updateProduct(productId, product, dispatch);
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.image} alt="" className="productInfoImg" />
            <span className="productName">{product.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product.id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">description:</span>
              <span className="productInfoValue">{product.description}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input name="name" onChange={handleChange} type="text" placeholder={product.name} />
            <label>Product Description</label>
            <input name='description' onChange={handleChange} type="text" placeholder={product.description} />
            <label>Price</label>
            <input name="price" onChange={handleChange} type="text" placeholder={product.price} />
            <label>Price</label>
            <input name="quantity" onChange={handleChange} type="text" placeholder={product.quantity} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.image} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <PublishIcon />
              </label>
              <input type="text" name="image" id="file" placeholder="image" />
            </div>
            <button onClick={handleClick} className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
