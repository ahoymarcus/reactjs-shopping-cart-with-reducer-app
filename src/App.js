// https://www.youtube.com/watch?v=ly3m6mv5qvg
// 6 hr 42' 10 ''
import React from 'react';

import { useGlobalContext } from './context';

// components
import Navbar from './Navbar';
import CartContainer from './CartContainer';
// items



function App() {

  // if (loading) {
  //   return (
  //     <div className='loading'>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // }



  
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}



export default App


