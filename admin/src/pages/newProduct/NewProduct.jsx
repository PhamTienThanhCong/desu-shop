import { useState, useEffect } from "react";
import "./newProduct.css";
import { addProduct, getCategories } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // const handleCat = (e) => {
  //   setCat(e.target.value.split(","));
  // };

  const handleClick = (e) => {
    e.preventDefault();

    const product = { ...inputs };
    addProduct(product, dispatch);
  };

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="text"
            id="file"
            name="image"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="description"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <select style={{ 'padding': '10px' }} name="category" onChange={handleChange} >
            <option value="" hidden> PLEASE CHOOSE CATEGORY</option>
            {categories.map(cat =>
              <option key={cat.id} value={cat.id} defaultChecked>{cat.name}</option>
            )};
          </select>
        </div>

        <div className="addProductItem">
          <label>Quantity</label>
          <input name="quantity" type="text" placeholder="jeans,skirts" onChange={handleChange} />
        </div>
        <div>
          <button onClick={handleClick} className="productAddButton">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
