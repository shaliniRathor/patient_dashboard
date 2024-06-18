import Add_Patient from './Add_Patient';
import All_Patient from './All_Patient';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Edit_Patient from './Edit_Patient';
import LogIn_patient from './LogIn'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (

    <div className="App">
  <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
// transition: {Bounce}
/>
     <BrowserRouter>
     <Routes>
      <Route path='/'element={<All_Patient/>} />
      <Route path='/add/patient'element={<Add_Patient/>} />
      <Route path='/edit/patient/:id'element={<Edit_Patient/>} />
      <Route path='/Log/patient/'element={<LogIn_patient/>} />
      
     </Routes>
     </BrowserRouter>  
    </div>
  );
}

export default App;
