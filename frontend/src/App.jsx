
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import {logo} from './assets/index'
import Home from './components/home/Home'
import CreatePost from './components/createPost/CreatePost'
import { home } from './assets/index'

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          className="logo-container"
        >
          <img src={logo} alt="logo" className="logo" />
          <h2>PixelSculpt</h2>
        </Link>
        <div className='nav-container'>
          <Link to="/">
            <img src={home} alt="home" />
          </Link>
          <Link to="/create-post">
            <button className="create-button">Create</button>
          </Link>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App