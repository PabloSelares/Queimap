import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header'; 
import About from './components/About';
function App() {
  return (
    <div className='w-full overflow-x-hidden'>
      <Navbar />
      <Header />
      <About/>
    </div>
 
    
  )
}

export default App;
