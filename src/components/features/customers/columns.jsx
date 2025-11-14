/**
 * This file defines the columns for the customer data table. Utilizes the customerSchema
 */

const firstNameCell = {
  accessorKey: "firstName",
  header: () => <div className="text-center text-white">First Name</div>,
  cell: ({ row }) => {
    return (
      <div className="text-center text-white">{row.original.firstName}</div>
    );
  },
};

const lastNameCell = {
  accessorKey: "lastName",
  header: () => <div className="text-center text-white">Last Name</div>,
  cell: ({ row }) => {
    return (
      <div className="text-center text-white">{row.original.lastName}</div>
    );
  },
};

const emailCell = {
  accessorKey: "email",
  header: () => <div className="text-center text-white">Email</div>,
  cell: ({ row }) => {
    return <div className="text-center text-white">{row.original.email}</div>;
  },
};
const phoneNumberCell = {
  accessorKey: "phoneNumber",
  header: () => <div className="text-center text-white">Phone Number</div>,
  cell: ({ row }) => {
    return (
      <div className="text-center text-white">{row.original.phoneNumber}</div>
    );
  },
};
const addressCell = {
  accessorKey: "address",
  header: () => <div className="text-center text-white">Address</div>,
  cell: ({ row }) => {
    return <div className="text-center text-white">{row.original.address}</div>;
  },
};

export default [
  firstNameCell,
  lastNameCell,
  emailCell,
  phoneNumberCell,
  addressCell,
];
