import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent {
  characterId: string | null = null;

  constructor(private route: ActivatedRoute, private logger: LoggerService) {
    this.logger.log('CharacterDetailComponent initialized');
    this.characterId = this.route.snapshot.paramMap.get('id');
  }
}
