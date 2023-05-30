import React, { Component } from 'react';
// import News from './News';

export class Newsitem extends Component {
  render() {
    let { Title, Description, imgurl,NewsUrl } = this.props;
    return (
      <div className='conatainer my-3'>
        <div className='card' style={{ width: '18rem' }}>
          <img
            src={imgurl}
            className='card-img-top'
            alt='...'
          />
          <div className='card-body'>
            <h5 className='card-title'>{Title}</h5>
            <p className='card-text'>{Description}</p>
            <a
              href={NewsUrl}
              target='_blank'
              className='btn btn-sm btn-primary'
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
