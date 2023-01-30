
import './App.css';
// import Admin from './admin/Admin';
import SignIn from './signin-signup/signin/login';
import { Routes, Route } from 'react-router-dom';
import SignUp from './signin-signup/signup/signUp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme';
import { Container, CssBaseline } from '@mui/material';
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import About from './pages/About';
import Contact from './pages/Contact';
import Success from './pages/Success';
import Footer from './components/Footer';
import Announcement from './components/Announcement';
import Navbar from './components/Navbar';
import ChatWindown from './components/ChatWindown';
import Order from './pages/Order';
function App() {

  return (
    <Container className="App" maxWidth="xl" >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Announcement />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:cat' element={<ProductList />} />
          <Route path='/products/' element={<ProductList />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          {/* <Route path = "/admin" element={<Admin />}/> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/success' element={<Success />} />
        </Routes>
        <ChatWindown />
        <Footer />
      </ThemeProvider>
      <div className="pine-tree">
        <img className="pine-tree-left" src={'./asset/img/pine-tree.png'} />
        <img className="pine-tree-right" src={'./asset/img/pine-tree.png'} />
        <img className="santa-left" src={'./asset/img/santa-left.png'} />
        <img className="santa-right" src={'./asset/img/santa-right.png'} />
      </div>
    </Container>
  );
}

export default App;
