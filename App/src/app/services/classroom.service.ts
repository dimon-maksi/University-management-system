import { Expansion } from '@angular/compiler';
import { classrooms } from '../data/initial-data';
import { DataService } from '../interfaces/data-service.interface';
import { DayOfWeek, TimeSlot } from '../models/basic-types';
import { Classroom } from '../models/classroom';
import { LessonService } from './lesson.service';

export class ClassroomService implements DataService<Classroom> {
  private data: Classroom[] = classrooms;

  getAll(): Classroom[] {
    return this.data;
  }

  getById(number: string): Classroom | undefined {
    return this.data.find(classroom => classroom.number === number);
  }

  // task: Реалізуйте функцію findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[], 
  // яка повертає номери вільних аудиторій у вказаний час
  findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const availableClassrooms: string[] = [];
    const lessonService = new LessonService();
    const lessons = lessonService.getAll();

    const activeLessons = lessons
      .filter(l => l.dayOfWeek === dayOfWeek)
      .filter(l => l.timeSlot === timeSlot);

    activeLessons.forEach(element => {
      availableClassrooms.push(element.classroomNumber);
    });

    return availableClassrooms;
  }

  add(classroom: Classroom): void {
    this.data.push(classroom);
  }

  update(number: string, updatedClassroom: Classroom): void {
    const index = this.data.findIndex(classroom => classroom.number === number);
    if (index !== -1) {
      this.data[index] = updatedClassroom;
    }
  }

  // task: Напишіть функцію reassignClassroom(lessonId: number, newClassroomNumber: string): boolean,
  // яка змінює аудиторію для заняття, якщо це можливо.  

  delete(number: string): void {
    this.data = this.data.filter(classroom => classroom.number !== number);
  }
}