import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callSwal(title: string, text: string, icon: any, callback: () => void) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: true,
      confirmButtonText: 'Tamam',
      showCancelButton: true,
      cancelButtonText: 'Vazgeç'
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    })
  }
}
