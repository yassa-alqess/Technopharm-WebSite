import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingService } from 'core/services/loading/loading.service';

@Component({
  selector: 'del-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading = inject(LoadingService).isLoading;
}
