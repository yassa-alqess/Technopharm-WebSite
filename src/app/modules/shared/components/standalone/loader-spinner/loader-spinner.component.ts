import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingService } from 'core/services/loading/loading.service';

@Component({
  selector: 'del-loader-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent {
  loading = inject(LoadingService).loadingSub;

}
