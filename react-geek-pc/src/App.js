import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import { history } from './utils/history';
import Layout from './pages/Layout';
import Login from './pages/Login';
import { AuthComponent } from '@/components/AuthComponent'
import Publish from './pages/Publish';
import Article from './pages/Article';
import Home from './pages/Home';

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <AuthComponent>
              <Layout />
            </AuthComponent>
          }>
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </HistoryRouter> 
  );
}

export default App;
