import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchStateService } from '../../../services/branch-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'], 
})
export class SidebarComponent implements OnInit {
  selectedBranches: string[] = [];
  branchList = [
    { name: 'DHA Branch', color: '#d736ff' },
    { name: 'Malir Branch', color: '#ffd84d' },
    { name: 'Saddar Branch', color: '#2ebc96' },
    { name: 'Golshan Branch', color: '#4285f4' },
  ];

  constructor(private branchState: BranchStateService) {}

  ngOnInit() {
    this.branchState.selectedBranches$.subscribe(
      (branches) => (this.selectedBranches = branches)
    );
  }

  isSelected(branch: string): boolean {
    return this.selectedBranches.includes(branch);
  }
}
