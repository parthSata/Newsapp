import React, { useState } from 'react';
import NavBar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 12;
  const country = 'us'; // Using 'us' for more reliable results from the API
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <LoadingBar height={3} color='#f11946' progress={progress} />
        <Routes>
          {/* The apiKey prop has been removed from all routes */}
          <Route path='/' element={ <News setProgress={setProgress} key='general' pageSize={pageSize} country={country} category='general' /> } />
          <Route path='/general' element={ <News setProgress={setProgress} key='general' pageSize={pageSize} country={country} category='general' /> } />
          <Route path='/business' element={ <News setProgress={setProgress} key='business' pageSize={pageSize} country={country} category='business' /> } />
          <Route path='/entertainment' element={ <News setProgress={setProgress} key='entertainment' pageSize={pageSize} country={country} category='entertainment' /> } />
          <Route path='/health' element={ <News setProgress={setProgress} key='health' pageSize={pageSize} country={country} category='health' /> } />
          <Route path='/science' element={ <News setProgress={setProgress} key='science' pageSize={pageSize} country={country} category='science' /> } />
          <Route path='/sports' element={ <News setProgress={setProgress} key='sports' pageSize={pageSize} country={country} category='sports' /> } />
          <Route path='/technology' element={ <News setProgress={setProgress} key='technology' pageSize={pageSize} country={country} category='technology' /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

