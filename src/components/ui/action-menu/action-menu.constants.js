import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const FIELD_TYPES = {
  LABEL: "label",
  SEPARATOR: "separator",
  ITEM: "item",
};

export const FIELD_MAPPING = {
  [FIELD_TYPES.LABEL]: DropdownMenuLabel,
  [FIELD_TYPES.SEPARATOR]: DropdownMenuSeparator,
  [FIELD_TYPES.ITEM]: DropdownMenuItem,
};
