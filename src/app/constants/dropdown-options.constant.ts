import { UserRole } from "../models/enums/users/UserRole";
import { DropdownOption } from "../models/interfaces/dropdown/DropdownOption";

export const USER_ROLES_OPTIONS: Array<DropdownOption> = [
  { label: 'Administrador', value: UserRole.ADMIN },
  { label: 'Usuário', value: UserRole.USER },
];
