import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonAvatar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSearchbar,
} from '@ionic/angular/standalone';

import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { Character, CharacterParams, Result } from 'src/app/interfaces/characters.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonAvatar,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    RouterModule
  ],
})
export class HomePage implements OnInit {
  private rickAndMortySvc = inject(RickAndMortyService);

  characters: Result[] = [];
  params: CharacterParams = { page: 0 };
  

  constructor() {}

  ngOnInit() {
    this.getCharacter();
  }

  //===  Obtener personajes  ======
  getCharacter(event?:  Event) {
  
    this.params.page += 1;

    this.rickAndMortySvc.getCharacter(this.params).subscribe({
        
        next: (res: Character) => {
        this.characters.push(...res.results);
 
        if (event) {
          const infiniteScroll = event.target as HTMLIonInfiniteScrollElement;
          infiniteScroll.complete();
        }
      },
      error: (error: Error) => {
        if (event) {
          const infiniteScroll = event.target as HTMLIonInfiniteScrollElement;
          infiniteScroll.complete();
        }
      },
    });
  }

  //===  buscar personajes por nombre  ======
  searchCharacter() {
    this.params.page = 1;

    this.rickAndMortySvc.getCharacter(this.params).subscribe({
      next: (res: Character) => {
        this.characters = res.results;
      },
      error: (error: Error) => {},
    });
  }
}
