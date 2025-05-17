import { Component, Input } from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';
import { ScaleOnHoverDirective } from '../../directives/scale-on-hover.directive';

@Component({
  selector: 'app-character-card',
  imports: [
    HighlightDirective,
    ScaleOnHoverDirective,
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() name!: string;
}
