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

  characters: any[] = [];
  params = {} as any;

  constructor() {}

  ngOnInit() {
    this.params.page = 0;
    this.getCharacter();
  }

  //===  Obtener personajes  ======
  getCharacter(event?: any) {
    this.params.page += 1;

    this.rickAndMortySvc.getCharacter(this.params).subscribe({
      next: (res: any) => {
        this.characters.push(...res.results);
        console.log(this.characters);

        if (event) event.target.complete();
      },
      error: (error: any) => {
        if (event) event.target.complete();
      },
    });
  }

  //===  buscar personajes por nombre  ======
  searchCharacter() {
    this.params.page = 1;

    this.rickAndMortySvc.getCharacter(this.params).subscribe({
      next: (res: any) => {
        this.characters = res.results;
      },
      error: (error: any) => {},
    });
  }
}
