import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appValid]',
  standalone: true
})
export class ValidDirective {

  @Input() appValid: Boolean = false;

  constructor(
    private _el: ElementRef<any>
  ) { }

  @HostListener('keyup') onKeyUp() {
    if(this.appValid) {
      this._el.nativeElement.className = "form-control is-valid";
    } else {
      this._el.nativeElement.className = "form-control is-invalid";
    }
  }

}
