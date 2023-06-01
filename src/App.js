import React, { Component,useState } from 'react';
import NavBar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App =() =>{
  const pageSize = 12;
  const country = 'us';
  // const [pageSize, setpageSize] = useState(12);
  // const [country, setcountry] = useState("in");
  // const [category, setcategory] = useState("");
 
    return (
      <div>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route
              path='/'
              element={
                <News
                  key='general'
                  pageSize={pageSize}
                  country={country}
                  category='general'
                />
              }
            />
            <Route
              path='/business'
              element={
                <News
                  key='business'
                  pageSize={pageSize}
                  country={country}
                  category='business'
                />
              }
            />
            <Route
              path='/entertainment'
              element={
                <News
                  key='entertainment'
                  pageSize={pageSize}
                  country={country}
                  category='entertainment'
                />
              }
            />
            <Route
              path='/health'
              element={
                <News
                  key='health'
                  pageSize={pageSize}
                  country={country}
                  category='health'
                />
              }
            />
            <Route
              path='/science'
              element={
                <News
                  key='science'
                  pageSize={pageSize}
                  country={country}
                  category='science'
                />
              }
            />
            <Route
              path='/sports'
              element={
                <News
                  key='sports'
                  pageSize={pageSize}
                  country={country}
                  category='sports'
                />
              }
            />
            <Route
              path='/technology'
              element={
                <News
                  key='technology'
                  pageSize={pageSize}
                  country={country}
                  category='technology'
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  
}
export default App;
