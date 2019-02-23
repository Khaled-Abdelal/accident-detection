import React from "react";

const Profile = props => {
  return (
    <div className="container emp-profile">
      <div className="row">
        <div className="col-md-4">
          <div className="profile-img">
            <img src={"/" + props.user.picture} alt="" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="profile-head">
            <h5>{props.user.name}</h5>
            {/* <h6>Web Developer and Designer</h6> */}

            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-8">
          <div className="tab-content profile-tab" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row">
                <div className="col-md-4">
                  <label>Name</label>
                </div>
                <div className="col-md-8">
                  <p>{props.user.name}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label>Address</label>
                </div>
                <div className="col-md-8">
                  <p>{props.user.address}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label>Phone</label>
                </div>
                <div className="col-md-8">
                  <p>{props.user.phoneNumber}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label>Blood Type</label>
                </div>
                <div className="col-md-8">
                  <p>{props.user.bloodType}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label>Relative Name</label>
                </div>
                <div className="col-md-8">
                  <p> {props.user.nextOfKin.name}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label>Relative Phone</label>
                </div>
                <div className="col-md-8">
                  <p> {props.user.nextOfKin.phoneNumber}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label>Donor Status</label>
                </div>
                <div className="col-md-8">
                  <p>{props.user.isDonor ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
