import { Injectable } from '@angular/core';
import { USER_ROLES_OPTIONS } from '../../../constants/dropdown-options.constant';
import { DropdownOption } from '../../../models/interfaces/dropdown/DropdownOption';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  getUserRolesOptions(): Array<DropdownOption> {
    return USER_ROLES_OPTIONS;
  }
}
