import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header'; 
import About from './components/About';
import Pontos from './components/Pontos';
import Testimonails from './components/Testimonails';
function App() {
  return (
    <div className='w-full overflow-x-hidden'>
      <Navbar />
      <Header />
      <About/>
      <Pontos/>
       <Testimonails/>
    </div>
 
    
  )
}

export default App;
