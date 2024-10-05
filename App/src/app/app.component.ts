import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { Professor } from './models/professor';
import { Classroom } from './models/classroom';
import { Course } from './models/course';
import { Lesson } from './models/lesson';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  classrooms: Classroom[];
  courses: Course[];
  lessons: Lesson[];
  professors: Professor[];


  constructor(private dataService: DataService) {
    this.classrooms = this.dataService.getClassrooms();
    this.courses = this.dataService.getCourses();
    this.lessons = this.dataService.getSchedule();
    this.professors = this.dataService.getProfessors();
  }
}