import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import PolicyForm from "./PolicyForm";
import { useAtom } from "jotai";
import {
  editPolicyIsOpenAtom,
  createPolicyIsOpenAtom,
  selectedPolicyAtom,
} from "@state/policies/policyOverview";
const PolicyFormDialog = ({ trigger }) => {
  const [editPolicyIsOpen, setEditPolicyIsOpen] = useAtom(editPolicyIsOpenAtom);

  const [createPolicyIsOpen, setCreatePolicyIsOpen] = useAtom(
    createPolicyIsOpenAtom
  );

  const [policy, setSelectedPolicy] = useAtom(selectedPolicyAtom);

  const isEditMode = !!policy;

  const setDialogOpen = isEditMode
    ? setEditPolicyIsOpen
    : setCreatePolicyIsOpen;
  const handleSuccess = () => {
    setDialogOpen(false);
    setSelectedPolicy(null);
  };

  const handleOpenChange = (open) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedPolicy(null);
    }
  };

  return (
    <Dialog
      open={isEditMode ? editPolicyIsOpen : createPolicyIsOpen}
      onOpenChange={() => handleOpenChange(false)}
    >
      {trigger}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Policy" : "Create New Policy"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update policy information below."
              : "Fill in the details to create a new policy."}
          </DialogDescription>
        </DialogHeader>
        <PolicyForm policy={policy} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default PolicyFormDialog;
