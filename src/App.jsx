import { useLocalStorage } from './hooks/useLocalStorage';
import Login from './components/Login';
import Home from './components/Home';
function App() {
  const { getItem } = useLocalStorage('user');
  if (!getItem()) {
    return <Login />;
  } else {
    return <Home />;
  }
}

export default App;
