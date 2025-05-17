import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { Character } from '../../core/swapi.model';
import { RouterModule } from '@angular/router';
import { LoggerService } from '../../core/services/logger.service';

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
  characters: Character[] = [
    {
      name: 'Luke Skywalker',
      uid: '1',
    },
    {
      name: 'Darth Vader',
      uid: '2',
    }
  ];
  constructor() {
    this.logger.log('CharacterListComponent initialized');
  }
}
