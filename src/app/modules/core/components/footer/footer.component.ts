import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'del-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  hotLine = environment.hotLine;
  email = environment.email

  currentYear = new Date().getFullYear();
}
