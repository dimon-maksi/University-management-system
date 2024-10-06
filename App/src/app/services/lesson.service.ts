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

  add(lesson: Lesson): void {
    this.data.push(lesson);
  }

  update(id: number, updatedLesson: Lesson): void {
    const index = this.data.findIndex(lesson => lesson.id === id);
    if (index !== -1) {
      this.data[index] = updatedLesson;
    }
  }

  delete(id: number): void {
    this.data = this.data.filter(lesson => lesson.id !== id);
  }
}
