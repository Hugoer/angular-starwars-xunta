import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterListComponent } from "./pages/character-list/character-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CharacterListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'starwars';
}
