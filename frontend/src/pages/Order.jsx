import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
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
    // get data user from http://localhost:8000/v1/user
  const user = useSelector((state) => state.auth.login.currentUser);
  document.title = "My order";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // paging data user
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getData = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:8000/v1/order/user/${user._id}`);
    setData(res.data);
    setLoading(false);
    setPage(1);
    if (res.data.length % 10 !== 0) {
      setLimit(Math.ceil(res.data.length / 10));
    }else{
      setLimit(res.data.length / 10);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="userList">
      <div className="userListTitleContainer">
        <h1 className="userListTitle">My list order</h1>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">total products</TableCell>
              <TableCell align="center">total price</TableCell>
              <TableCell align="center">paymentType</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Created at</TableCell>
              <TableCell align="center">View</TableCell>
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
                <TableCell align="center">Loading...</TableCell>
              </TableRow>
            ) : (
              // data
              data.slice((page - 1) * 10, page * 10).map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="center">{item.products.length} products</TableCell>
                  <TableCell align="center">{item.totalPrice}$</TableCell>
                  <TableCell align="center">{item.paymentType}</TableCell>
                  <TableCell align="center">
                    <Button
                      disabled
                      size="small"
                      variant="filledTonal"
                      style={{
                        backgroundColor: item.status === "Pending" ? "gray" : item.status === "Accepted" ? "green" : "red",
                        color: "white",
                      }}
                    >
                      {item.status}
                    </Button>

                  </TableCell>
                  <TableCell align="center">{
                    new Date(item.createdAt).toLocaleDateString()
                  }</TableCell>
                  <TableCell align="center">
                    <Link to={`/my-order/${item.id}`} style={{textDecoration: 'none'}}>
                      <Button variant="contained">order details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {
        data.length == 0 ? (
          <div className="userListNoData">
            <h1>
              No order yet !
            </h1>
          </div>
        ) : (
          <div className="userListPaging">
            <button className="userListPagingBtn" onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
            <span className="userListPagingNumber">{page}</span>
            <button className="userListPagingBtn" onClick={() => setPage(page + 1)} disabled={page === limit}>Next</button>
          </div>
        )
      }
    </div>
  );
}

export default Order