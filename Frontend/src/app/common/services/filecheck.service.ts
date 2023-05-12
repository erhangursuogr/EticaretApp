import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileCheckService {

  private _http = inject(HttpClient);
  result: boolean = false;

  constructor() { }

  check(url: string) {
    this.fileExists(url).subscribe(res => {
      this.result = res;
    }
      
    );

    console.log(this.result);
    
    

  }



  // check(url: string): boolean {
  //   let result: boolean = false;
  //   this.fileExists(url).subscribe({
  //     next: data => {
  //       if (data) {
  //         result = true;
  //       } else {
  //         result = false;
  //       }
  //     },      
  //   });
  //   return result;
    
  // }

  fileExists(url: string): Observable<boolean> {
    return this._http.head(url, { responseType: 'text' }).pipe(
      map(() => true),
      catchError(() => of(false))      
    );
  }



}
