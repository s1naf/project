import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Choices } from '../interfaces/choices';


const API_URL=`${environment.apiURL}/api/choices`

@Injectable({
  providedIn: 'root'
})

export class ChoicesService {
  http:HttpClient = inject(HttpClient)

  

  registerChoices(choices:Choices){
    return this.http.post<{msg:string}>(`${API_URL}/:username/insert`,choices)
  }
}


