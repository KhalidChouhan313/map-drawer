import { Component } from '@angular/core';
import { HeaderComponent } from "./core/header/header.component";
import { SidebarComponent } from "./core/sidebar/sidebar.component";
import { MapCommponentComponent } from "./feartures/map-commponent/map-commponent.component";

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, SidebarComponent, MapCommponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
