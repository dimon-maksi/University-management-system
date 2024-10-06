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
    if (number === "") throw new Error("Empty string");
    return this.data.find(classroom => classroom.number === number);
  }

  // task: Реалізуйте функцію findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[], 
  // яка повертає номери вільних аудиторій у вказаний час
  findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const availableClassrooms: string[] = this.data.map(c => c.number);
    const lessonService = new LessonService();
    const lessons = lessonService.getAll();
    if (lessons.length === 0) throw new Error("Lessons list is empty");

    const activeLessons = lessons
      .filter(l => l.dayOfWeek === dayOfWeek)
      .filter(l => l.timeSlot === timeSlot)
      .map(c => c.classroomNumber);
    if (activeLessons.length === 0) return availableClassrooms;

    return availableClassrooms.filter(c => !activeLessons.includes(c));
  }

  add(classroom: Classroom): void {
    this.data.push(classroom);
  }

  update(number: string, updatedClassroom: Classroom): void {
    if (number === "") throw new Error("Empty string");
    const index = this.data.findIndex(classroom => classroom.number === number);
    if (index === -1) throw new Error("Entity isn't in Classroom list");

    this.data[index] = updatedClassroom;
  }

  // task: Напишіть функцію reassignClassroom(lessonId: number, newClassroomNumber: string): boolean,
  // яка змінює аудиторію для заняття, якщо це можливо.
  reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    if (lessonId < 0) throw new Error("Id is out of range");
    if (newClassroomNumber === "") throw new Error("Empty string");

    const lessonService = new LessonService();
    const lesson = lessonService.getById(lessonId)
    if (lesson === undefined) return false;

    const availableClassrooms = this.findAvailableClassrooms(lesson.timeSlot, lesson.dayOfWeek);
    if (availableClassrooms.length === 0) return false;

    const result = availableClassrooms.indexOf(newClassroomNumber);

    if (result != -1) {
      lessonService.update(lessonId, lesson)
      return true;
    }
    return false;
  }

  delete(number: string): void {
    if (number === "") throw new Error("Empty string");
    this.data = this.data.filter(classroom => classroom.number !== number);
  }
}