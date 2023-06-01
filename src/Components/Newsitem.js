import React from 'react';
// import News from './News';
const Newsitem = (props) => {
 
    let { Title, Description, imgurl,NewsUrl ,author,date } = props;
    return (
      <div className='container my-6'>
        <div
          className='card '
          style={{
            marginBottom: '10px',
          }}
        >
          <img src={imgurl} className='card-img-top' style={
            {
              maxHeight: "170px"
            }
          }
          />
          <div className='card-body' >
            <h5 className='card-title'>{Title}</h5>
            <p className='card-text m-0'>{Description}</p>
            <p className='card-text mt-3'>
              <small className='text-danger'>
                By {!author ? 'Unknown' : author} On{' '}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={NewsUrl}
              target='_blank'
              rel='noreferrer'
              className='btn btn-sm btn-primary'
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
