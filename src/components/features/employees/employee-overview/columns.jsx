import EmployeeActionMenu from "./EmployeeActionMenu";

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
const titleCell = {
  accessorKey: "title",
  header: () => <div className="text-center text-white">Title</div>,
  cell: ({ row }) => {
    return <div className="text-center text-white">{row.original.title}</div>;
  },
};

const actions = {
  id: "actions",
  cell: ({ row }) => {
    const employee = row.original;
    return <EmployeeActionMenu employee={employee} />;
  },
};

export default [firstNameCell, lastNameCell, emailCell, titleCell, actions];
