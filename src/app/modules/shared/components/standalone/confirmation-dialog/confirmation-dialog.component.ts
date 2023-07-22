import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Component, Inject, Optional, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'del-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatDialogModule, ButtonComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);

  pageTitle = '';
  pageMessage = '';

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: { pageTitle: string; pageMessage: string; }) {
    this.pageTitle = data.pageTitle;
    this.pageMessage = data.pageMessage;
  }

  close() {
    this.dialogRef.close(true);
  }
}
