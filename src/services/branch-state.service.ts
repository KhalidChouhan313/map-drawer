import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchStateService {
  private _selectedBranches = new BehaviorSubject<string[]>([]);
  selectedBranches$ = this._selectedBranches.asObservable();
  get selectedBranches() {
    return this._selectedBranches.value;
  }
  selectBranch(branch: string) {
    if (!this.selectedBranches.includes(branch)) {
      this._selectedBranches.next([...this.selectedBranches, branch]);
    }
  }
}
