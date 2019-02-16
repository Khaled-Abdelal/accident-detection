/// format fetched data (hospital)
export const formatHospitals = hospitals => {
  return hospitals.data.map(hosp => {
    return {
      hospitalName: hosp.hospitalName,
      long: hosp.location.coordinates[0],
      lat: hosp.location.coordinates[1],
      id: hosp._id
    };
  });
};

/// format fetched data (users)
export const formatUsers = users => {
  return users.data.map(user => {
    return {
      name: user.name,
      isDonor: user.isDonor,
      address: user.address,
      phoneNumber: user.phoneNumber,
      bloodType: user.bloodType,
      device_id: user.device_id,
      id: user._id
    };
  });
};
