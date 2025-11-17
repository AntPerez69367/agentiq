import PolicyActionMenu from "./PolicyActionMenu";

const policyNumberCell = {
  accessorKey: "policyNumber",
  header: () => <div className="text-center text-white">Policy Number</div>,
  cell: ({ row }) => {
    return (
      <div className="text-center text-white">{row.original.policyNumber}</div>
    );
  },
};

const policyNameCell = {
  accessorKey: "policyName",
  header: () => <div className="text-center text-white">Policy Name</div>,
  cell: ({ row }) => {
    return (
      <div className="text-center text-white">{row.original.policyName}</div>
    );
  },
};

const policyDescriptionCell = {
  accessorKey: "policyDescription",
  header: () => <div className="text-center text-white">Description</div>,
  cell: ({ row }) => {
    return (
      <div className="text-center text-white">
        {row.original.policyDescription}
      </div>
    );
  },
};

const policyTypeCell = {
  accessorKey: "policyType",
  header: () => <div className="text-center text-white">Type</div>,
  cell: ({ row }) => {
    return (
      <div className="text-center text-white">{row.original.policyType}</div>
    );
  },
};

const policyStatusCell = {
  accessorKey: "policyStatus",
  header: () => <div className="text-center text-white">Status</div>,
  cell: ({ row }) => {
    return (
      <div className="text-center text-white">{row.original.policyStatus}</div>
    );
  },
};

const actions = {
  id: "actions",
  cell: ({ row }) => {
    const policy = row.original;
    return <PolicyActionMenu policy={policy} />;
  },
};

export default [
  policyNumberCell,
  policyNameCell,
  policyDescriptionCell,
  policyTypeCell,
  policyStatusCell,
  actions,
];
