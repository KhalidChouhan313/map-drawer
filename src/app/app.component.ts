import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapCommponentComponent } from "./map-commponent/map-commponent.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapCommponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
