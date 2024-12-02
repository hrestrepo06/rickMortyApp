import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonAvatar,
  IonLabel,
  IonItem,
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardContent,
  IonSpinner,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { addIcons } from 'ionicons';
import { chevronDown, locationOutline, videocamOutline } from 'ionicons/icons';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonCardContent,
    IonCard,
    IonRow,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonAvatar,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class CharacterDetailPage implements OnInit {
  private actRoute = inject(ActivatedRoute);
  private rickAndMortySvc = inject(RickAndMortyService);

  characterId: string = '';
  character = null as any;
  episodes: any[] = [];

  constructor() {
    addIcons({ locationOutline, videocamOutline, chevronDown });
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
    console.log(this.characterId);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getCharacter();
  }

  //===  Obtener personaje especifico  ======
  getCharacter() {
    this.rickAndMortySvc.getCharacterById(this.characterId).subscribe({
      next: (res: any) => {
        this.character = res;
        this.getEpisodes();
      },
      error: (error: any) => {},
    });
  }

  getEpisodes() {
    for (let url of this.character.episode) {
      this.rickAndMortySvc.getByUrl(url).subscribe({
        next: (res: any) => {
          console.log(res);
          this.episodes.push(res);
        },
        error: (error: any) => {},
      });
    }
  }
}