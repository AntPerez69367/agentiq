import ActionMenu, { FIELD_TYPES } from "@/components/ui/action-menu";

const EmployeeActionMenu = ({ employee }) => {
  return (
    <ActionMenu
      employee={employee}
      actions={[
        {
          label: "View Details",
          onClick: () => {},
          type: FIELD_TYPES.ITEM,
        },
        {
          label: "Edit Employee",
          onClick: () => {},
          type: FIELD_TYPES.ITEM,
        },
        { type: FIELD_TYPES.SEPARATOR },
        {
          label: "Delete Employee",
          onClick: () => {},
          type: FIELD_TYPES.ITEM,
          className: "text-red-600 font-bold hover:text-red-800",
        },
      ]}
    />
  );
};

export default EmployeeActionMenu;
