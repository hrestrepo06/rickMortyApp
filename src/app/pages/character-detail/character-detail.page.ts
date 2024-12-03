import { Component, inject, OnInit, ElementRef } from '@angular/core';
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
import { Episodes, Result } from 'src/app/interfaces/characters.interface';

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
  private elRef = inject(ElementRef);

  characterId: string = '';
  character: Result | null = null;
  episodes: Episodes[] = [];
  
  constructor() {
    addIcons({ locationOutline, videocamOutline, chevronDown });
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
      // Mueve el foco al contenedor principal de la nueva página
      const mainElement = this.elRef.nativeElement.querySelector('ion-content');
      if (mainElement) {
        mainElement.setAttribute('tabindex', '-1');
        mainElement.focus();
      }
  }

  ionViewWillEnter() {
    this.getCharacter();
  }

  //===  Obtener personaje especifico  ======
  getCharacter() {
    this.rickAndMortySvc.getCharacterById(this.characterId).subscribe({
    next: (res: Result) => {
        this.character = res;
        this.getEpisodes();
      },
      error: (error: Error) => {},
    });
  }

  getEpisodes() {
  
    if (!this.character) return;
    
    for (let url of this.character.episode) {
      this.rickAndMortySvc.getByUrl(url).subscribe({
        next: (res: Episodes) => {
          this.episodes.push(res);
        },
        error: (error: Error) => {},
      });
    }
  }
}
