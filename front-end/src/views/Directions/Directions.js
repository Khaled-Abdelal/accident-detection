import React from "react";

const Directions = props => {
  return (
    <div className="card  mt-4">
      <h4 className="card-header">Accident Directions</h4>
      <div className="card-body">
        <h6 className="card-title">Address</h6>

        <ul className="list-group">
          {props.address.map((el, id) => {
            return (
              <li className="list-group-item lead card-text" key={id}>
                {el.formatted_address}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Directions;
