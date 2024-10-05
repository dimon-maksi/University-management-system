import { Injectable } from '@angular/core';
import { classrooms, courses, professors, schedule } from '../data/initial-data';
import { Professor } from '../models/professor';
import { Classroom } from '../models/classroom';
import { Course } from '../models/course';
import { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private professors = professors;
  private classrooms = classrooms;
  private courses = courses;
  private schedule = schedule;

  getProfessors(): Professor[] {
    return this.professors;
  }

  getClassrooms(): Classroom[] {
    return this.classrooms;
  }

  getCourses(): Course[] {
    return this.courses;
  }

  getSchedule(): Lesson[] {
    return this.schedule;
  }
}
