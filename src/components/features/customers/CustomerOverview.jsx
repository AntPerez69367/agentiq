import React from "react";

const CustomerOverview = ({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  policies,
}) => (
  <div id={id} className="customer-overview">
    <div>
      Name: {firstName} {lastName}{" "}
    </div>
    <div> Email: {email} </div>
    <div> Phone: {phoneNumber} </div>
    <div> Address: {address} </div>
    <div> Policies: {policies.length} </div>
  </div>
);

export default CustomerOverview;
