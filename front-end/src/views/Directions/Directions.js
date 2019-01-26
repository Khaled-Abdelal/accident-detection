import React from "react";

const Directions = props => {
  return (
    <div className="card">
      <h4 className="card-header">Accident Directions</h4>
      <div className="card-body">
        <h6 className="card-title">Address</h6>
        <p className="card-text">
          <ul className="list-group">
            {props.address.map(el => {
              return (
                <li className="list-group-item">{el.formatted_address}</li>
              );
            })}
          </ul>
        </p>
      </div>
    </div>
  );
};

export default Directions;
