import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Character, Episodes, Result } from '../interfaces/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private http = inject(HttpClient);
  
  constructor() { }

  getCharacter(params: any): Observable<Character>{
    return this.http.get<Character>(environment.character, {params})
  }
  
  getCharacterById(id: string): Observable<Result>{
    return this.http.get<Result>(environment.character + id);
  }
  
  getByUrl(url: string): Observable<Episodes>{
    return this.http.get<Episodes>(url);
  }
  
}
