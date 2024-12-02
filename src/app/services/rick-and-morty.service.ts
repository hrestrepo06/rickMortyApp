import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private http = inject(HttpClient);
  
  constructor() { }
  
  getCharacter(params: any){
    return this.http.get(environment.character, {params})
  }
  
  getCharacterById(id: string){
    return this.http.get(environment.character + id);
  }
  
  getByUrl(url: string){
    return this.http.get(url);
  }
  
}
