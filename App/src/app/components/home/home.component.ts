import { Component } from '@angular/core';
import { ScheduleComponent } from "../schedule/schedule.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ScheduleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
