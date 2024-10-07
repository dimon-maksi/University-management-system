import { schedule } from '../data/initial-data';
import { DataService } from '../interfaces/data-service.interface';
import { ScheduleConflict } from '../models/basic-types';
import { Lesson } from '../models/lesson';

export class LessonService implements DataService<Lesson> {
  private data: Lesson[] = schedule;

  getAll(): Lesson[] {
    return this.data;
  }

  getById(id: number): Lesson | undefined {
    return this.data.find(lesson => lesson.id === id);
  }

  // task: Напишіть функцію getProfessorSchedule(professorId: number): Lesson[],
  // яка повертає розклад конкретного професора
  getProfessorSchedule(professorId: number): Lesson[] {
    if (professorId < 0) throw new Error("Id is out of range")
    return this.data.filter(p => p.professorId === professorId);
  }

  // task: Реалізуйте функцію getClassroomUtilization(classroomNumber: string): number,
  // яка повертає відсоток використання аудиторії.  
  getClassroomUtilization(classroomNumber: string): number {
    const countPerWeek = this.data.filter(p => p.classroomNumber === classroomNumber).length;
    const lessonsPerWeek = 7 * 6;
    return countPerWeek / lessonsPerWeek;
  }

  // task: Створіть функцію addLesson(lesson: Lesson): boolean,
  // яка додає заняття до розкладу, якщо немає конфліктів
  add(lesson: Lesson): boolean {
    // Додати перевірку чи створює конфлікти
    const result = this.validateLesson(lesson);
    if (result === null) {
      this.data.push(lesson);
      return true;
    }
    if (result === 'ClassroomConflict') throw new Error("Classroom conflict");
    if (result === 'ProfessorConflict') throw new Error("Professor conflict");
    return false;
  }

  update(id: number, updatedLesson: Lesson): void {
    const index = this.data.findIndex(lesson => lesson.id === id);
    if (index !== -1) {
      this.data[index] = updatedLesson;
    }
  }

  // task: Реалізуйте функцію cancelLesson(lessonId: number): void, яка видаляє заняття з розкладу.
  delete(id: number): void {
    this.data = this.data.filter(lesson => lesson.id !== id);
  }

  // task: a) Створіть type alias ScheduleConflict з полями: type ("ProfessorConflict" | "ClassroomConflict"), lessonDetails: Lesson.  
  // b) Напишіть функцію validateLesson(lesson: Lesson): ScheduleConflict | null,
  // яка перевіряє, чи не створює нове заняття конфліктів у розкладі.
  validateLesson(lesson: Lesson): ScheduleConflict | null {
    if (this.validateProfessor(lesson.professorId, lesson.dayOfWeek, lesson.timeSlot) !== null) return "ProfessorConflict";
    if (this.validateClassroom(lesson.classroomNumber, lesson.dayOfWeek, lesson.timeSlot) !== null) return "ClassroomConflict";
    return null;
  }

  validateProfessor(professorId: number, dayOfWeek: string, timeSlot: string): "ProfessorConflict" | null {
    const lessonsInDay = this.data
      .filter(p => p.dayOfWeek === dayOfWeek)
      .filter(p => p.timeSlot === timeSlot)
      .filter(p => p.professorId === professorId)

    return lessonsInDay.length === 0 ? null : "ProfessorConflict";
  }

  validateClassroom(classroomNumber: string, dayOfWeek: string, timeSlot: string): "ClassroomConflict" | null {
    const lessonsInDay = this.data
      .filter(p => p.dayOfWeek === dayOfWeek)
      .filter(p => p.timeSlot === timeSlot)
      .filter(p => p.classroomNumber === classroomNumber)

    return lessonsInDay.length === 0 ? null : "ClassroomConflict";
  }
}