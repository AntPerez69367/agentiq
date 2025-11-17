import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import EmployeeForm from "./EmployeeForm";
import { useAtom } from "jotai";
import {
  editEmployeeIsOpenAtom,
  createEmployeeIsOpenAtom,
  selectedEmployeeAtom,
} from "@state/employees/employeeOverview";

const EmployeeFormDialog = ({ trigger }) => {
  const [editEmployeeIsOpen, setEditEmployeeIsOpen] = useAtom(
    editEmployeeIsOpenAtom
  );

  const [createEmployeeIsOpen, setCreateEmployeeIsOpen] = useAtom(
    createEmployeeIsOpenAtom
  );

  const [employee, setSelectedEmployee] = useAtom(selectedEmployeeAtom);

  const isEditMode = !!employee;

  const setDialogOpen = isEditMode
    ? setEditEmployeeIsOpen
    : setCreateEmployeeIsOpen;
  const handleSuccess = () => {
    setDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleOpenChange = (open) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedEmployee(null);
    }
  };

  return (
    <Dialog
      open={isEditMode ? editEmployeeIsOpen : createEmployeeIsOpen}
      onOpenChange={() => handleOpenChange(false)}
    >
      {trigger}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Employee" : "Create New Employee"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update employee information below."
              : "Fill in the details to create a new employee."}
          </DialogDescription>
        </DialogHeader>
        <EmployeeForm employee={employee} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeFormDialog;
