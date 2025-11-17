import ActionMenu, { FIELD_TYPES } from "@/components/ui/action-menu";
import {
  editEmployeeIsOpenAtom,
  selectedEmployeeAtom,
} from "@/state/employees/employeeOverview";
import { setConfirmDialogAtom } from "@/state/global/confirmDialogAtom";
import { deleteEmployeeMutation } from "@/state/employees/employeeMutations";
import { useAtom, useSetAtom } from "jotai";

const EmployeeActionMenu = ({ employee }) => {
  const setEditEmployeeIsOpen = useSetAtom(editEmployeeIsOpenAtom);
  const setSelectedEmployee = useSetAtom(selectedEmployeeAtom);
  const [deleteMutation] = useAtom(deleteEmployeeMutation);
  const setConfirmDialog = useSetAtom(setConfirmDialogAtom);

  const handleEditEmployee = () => {
    setSelectedEmployee(employee);
    setEditEmployeeIsOpen(true);
  };

  const handleDeleteEmployee = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Employee",
      description: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: {
        fn: async () => {
          await deleteMutation.mutateAsync(employee.id);
        },
      },
    });
  };

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
          onClick: handleEditEmployee,
          type: FIELD_TYPES.ITEM,
        },
        { type: FIELD_TYPES.SEPARATOR },
        {
          label: "Delete Employee",
          onClick: handleDeleteEmployee,
          type: FIELD_TYPES.ITEM,
          className: "text-red-600 font-bold hover:text-red-800",
        },
      ]}
    />
  );
};

export default EmployeeActionMenu;
