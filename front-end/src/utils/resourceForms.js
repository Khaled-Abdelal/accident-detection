export const usersForm = [
  { type: "text", name: "name", value: "", label: "Name" },
  { type: "password", name: "password", value: "", label: "Password" },
  { type: "text", name: "device_id", value: "", label: "Device Id" },
  { type: "text", name: "phoneNumber", value: "", label: "PhoneNumber" },
  { type: "text", name: "address", value: "", label: "Address" },
  { type: "text", name: "bloodType", value: "", label: "BloodType" },
  { type: "text", name: "nextOfKin.name", value: "", label: "Relative Name" },
  {
    type: "text",
    name: "nextOfKin.phoneNumber",
    value: "",
    label: "Relative PhoneNumber"
  }
];

export const hospitalsForm = [
  { type: "text", name: "hospitalName", label: "Hospital Name" },
  { type: "password", name: "password", label: "Password" },
  {
    type: "text",
    name: "location.coordinates",
    label: "Coordinates",
    placeholder: "enter coordinates as follows ex:  longitude,latitude"
  }
];
