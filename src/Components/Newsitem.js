import React from "react";

const Newsitem = (props) => {
  let { Title, Description, imgurl, NewsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div>
        <img
          src={
            !imgurl
              ? "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE="
              : imgurl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{Title}</h5>
          <p className="card-text m-0">{Description}</p>
          <p className="card-text mt-3">
            <small className="text-muted">
              By {!author ? "Unknown" : author} On{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={NewsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
