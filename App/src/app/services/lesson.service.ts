import { schedule } from '../data/initial-data';
import { DataService } from '../interfaces/data-service.interface';
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

  // task: Реалізуйте функцію getClassroomUtilization(classroomNumber: string): number,
  // яка повертає відсоток використання аудиторії.  

  // task: Створіть функцію addLesson(lesson: Lesson): boolean,
  // яка додає заняття до розкладу, якщо немає конфліктів
  add(lesson: Lesson): void {
    // Додати перевірку чи створює конфлікти
    this.data.push(lesson);
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
}