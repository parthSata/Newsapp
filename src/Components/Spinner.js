import React, { Component } from 'react'
import loading from './loading.gif'

const Spinner= () => {
 
    return (
      <div className=' d-flex justify-content-center'>
        <img  src={loading} alt='' />
      </div>
    );
  
}

export default Spinner
