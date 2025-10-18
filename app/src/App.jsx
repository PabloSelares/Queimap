import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header'; 
import About from './components/About';
import Pontos from './components/Pontos';
import Testimonails from './components/Testimonails';
import Contato from './components/Contato';
  import { ToastContainer} from 'react-toastify';
function App() {
  return (
    <div className='w-full overflow-x-hidden'>
      <ToastContainer/>
      <Navbar />
      <Header />
      <About/>
      <Pontos/>
       <Testimonails/>
       <Contato/>
    </div>
 
    
  )
}

export default App;
