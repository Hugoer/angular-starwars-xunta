import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { Character } from '../../core/swapi.model';

@Component({
  selector: 'app-character-list',
  imports: [
    CommonModule,
    CharacterCardComponent,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {
  characters: Character[] = [
    {
      name: 'Luke Skywalker',
      uid: '1',
    },
    {
      name: 'Darth Vader',
      uid: '2',
    }
  ]
}
