import { useNavigate } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FIELD_MAPPING } from "./action-menu.constants";

const ActionMenu = ({ actions = [] }) => {
  const navigate = useNavigate();

  const renderAction = (action, index) => {
    const Component = FIELD_MAPPING[action.type];
    return (
      <Component
        className={action.className}
        key={`${action.label}-${index}`}
        onClick={() => action.onClick(navigate)}
        disabled={action.disabled}
      >
        {action.label}
      </Component>
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {actions.map(renderAction)}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionMenu;
