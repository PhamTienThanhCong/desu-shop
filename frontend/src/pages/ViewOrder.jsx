import axios from "axios";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Order = () => {

  const user = useSelector((state) => state.auth.login.currentUser);
  const id = window.location.pathname.split("/")[2];

  document.title = "My order";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // paging data user

  const getData = async () => {
    setLoading(true);
    const res = await axios.get(`https://nhat-desu-server.onrender.com/v1/order/${id}`);
    setData(res.data.products);
    console.log(res.data.products);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="userListTitleContainer">
        <h1 className="userListTitle">View order details</h1>
      </div>
      <div style={{
        width: "100%",
        textAlign: "left",
        padding: "10px",
      }}>
        <Link to="/my-order">
          Trở lại
        </Link>
        <p>
          <b>Order ID:</b> {id}
        </p>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>productId</TableCell>
              <TableCell align="center">name product</TableCell>
              <TableCell align="center">price</TableCell>
              <TableCell align="center">quantity</TableCell>
              <TableCell align="center">total price</TableCell>
              <TableCell align="center">View product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* loading */}
            {loading ? (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Loading...
                </TableCell>
                <TableCell align="center">Loading...</TableCell>
                <TableCell align="center">Loading...</TableCell>
                <TableCell align="center">Loading...</TableCell>
                <TableCell align="center">Loading...</TableCell>
                <TableCell align="center">Loading...</TableCell>
              </TableRow>
            ) : (
              // data map
              data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.productId}
                  </TableCell>
                  <TableCell 
                    align="center" 
                    style={{display: "flex", alignItems: "center"}}
                  >
                    <img 
                      style={{width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
                      src={item.image} 
                      alt={item.name} />
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.price}$</TableCell>
                  <TableCell align="center">
                    {item.quantity} product
                  </TableCell>
                  <TableCell align="center">
                    {item.price * item.quantity}$
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/product/${item.productId}`} style={{textDecoration: 'none'}}>
                      <Button variant="contained">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Order