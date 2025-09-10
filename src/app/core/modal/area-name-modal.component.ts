import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-name-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-content custom-modal">
      <div class="modal-header flex-column text-center border-1 border-bottom ">
        <button
          type="button"
          class="btn-close ms-auto"
          aria-label="Close"
          (click)="activeModal.dismiss()"
        ></button>
        <h4 class="modal-title fw-bold">Assign Location to Company</h4>
        <p class="text-muted mb-0">Save New Operational Location</p>
      </div>

      <div class="modal-body">
        <label
          class="form-label fw-bold text-dark mb-1"
          style="font-size: 16px;"
        >
          Select Company
        </label>

        <select
          class="form-select"
          style="
      border:0.856px solid #D9D9D9;
      border-radius: 8px !important;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      padding: 0.6rem 0.75rem;
      font-size: 14px;
    "
          [(ngModel)]="selectedCompany"
        >
          <option value="" disabled selected>
            Choose a registered company
          </option>
          <option
            *ngFor="let branch of branches"
            [value]="branch"
            class="rounded-full"
          >
            {{ branch }}
          </option>
        </select>
      </div>

      <div class="modal-footer border-0 d-flex justify-content-between">
        <button class="btn  text-[#737791]" (click)="activeModal.dismiss()">
          Cancel
        </button>
        <button
          class="btn btn-success"
          style="border-radius: 8px;
background: linear-gradient(270deg, #2EBC96 0%, #1A9096 100%);
box-shadow: 0 0 10px 0 rgba(46, 188, 150, 0.20);"
          (click)="activeModal.close(selectedCompany)"
        >
          Saved Changes
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .custom-modal {
        padding: 0.5rem 1rem;
      }
      .btn-success {
        background-color: #1abc9c;
        border: none;
      }
      .btn-success:hover {
        background-color: #17a589;
      }
    `,
  ],
})
export class AreaNameModalComponent {
  @Input() areaName = '';
  selectedCompany = '';
  branches = ['DHA Branch', 'Malir Branch', 'Saddar Branch', 'Golshan Branch'];

  constructor(public activeModal: NgbActiveModal) {}
}
