import { atom } from "jotai";

export const editEmployeeIsOpenAtom = atom(false);
export const selectedEmployeeAtom = atom(null);
export const createEmployeeIsOpenAtom = atom(false);
export const deleteEmployeeIsOpenAtom = atom(false);
export const employeeToDeleteAtom = atom(null);
