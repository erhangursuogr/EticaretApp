import { Component, inject } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { BasketService } from '../../baskets/services/basket.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public _basketService = inject(BasketService);

  constructor() { 
    this._basketService.getCount();
  }

}
