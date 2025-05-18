import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-character-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './character-menu.component.html',
  styleUrls: ['./character-menu.component.scss']
})
export class CharacterMenuComponent {}
