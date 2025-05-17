import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { RouterModule } from '@angular/router';
import { LoggerService } from '../../core/services/logger.service';
import { Character } from '../../core/models/swapi.model';
import { StarwarsService } from '../../core/services/starwars.service';

@Component({
  selector: 'app-character-list',
  imports: [
    CommonModule,
    CharacterCardComponent,
    RouterModule,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {

  private logger = inject(LoggerService);
  private starWarsService = inject(StarwarsService);
  characters$ = this.starWarsService.getCharacters();

  constructor() {
    this.logger.log('CharacterListComponent initialized');
  }
}
