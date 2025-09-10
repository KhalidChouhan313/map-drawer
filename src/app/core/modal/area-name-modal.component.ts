import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-area-name-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `
    <div class="modal-backdrop" (click)="close()"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h4>Assign Location to Company</h4>
        <button class="close-btn" (click)="close()">×</button>
      </div>
      <div class="modal-body">
        <label>Select Company</label>
        <select [(ngModel)]="selectedCompany">
          <option value="" disabled selected>Choose a company</option>
          <option *ngFor="let branch of branches" [value]="branch">
            {{ branch }}
          </option>
        </select>
      </div>
      <div class="modal-footer">
        <button class="btn cancel-btn" (click)="close()">Cancel</button>
        <button class="btn save-btn" (click)="save()">Save</button>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
      }
      .modal-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 1rem;
        border-radius: 8px;
        width: 300px;
        z-index: 1001;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      .close-btn {
        border: none;
        background: none;
        font-size: 20px;
        cursor: pointer;
      }
      .modal-body select {
        width: 100%;
        padding: 0.5rem;
        border-radius: 6px;
        border: 1px solid #ccc;
      }
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 1rem;
      }
      .btn {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        border: none;
        font-weight: bold;
      }
      .cancel-btn {
        background: #ccc;
        color: #000;
      }
      .save-btn {
        background: #2ebc96;
        color: white;
      }
    `,
  ],
})
export class AreaNameModalComponent {
  @Input() branches = [
    'DHA Branch',
    'Malir Branch',
    'Saddar Branch',
    'Golshan Branch',
  ];
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<string>();

  selectedCompany = '';

  close() {
    this.closed.emit();
  }

  save() {
    if (this.selectedCompany) this.saved.emit(this.selectedCompany);
  }
}
