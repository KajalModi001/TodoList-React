import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header';
import Todo from './Pages/Todo';
import Update from './Pages/Update';


function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
        <Routes>
          <Route path='todo' element={<Todo/>}></Route>
          <Route path='update/:id' element={<Update/>}></Route>
        </Routes>
    </BrowserRouter>
  
    </>
  );
}

export default App;
