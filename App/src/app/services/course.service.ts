import { courses } from '../data/initial-data';
import { DataService } from '../interfaces/data-service.interface';
import { Course } from '../models/course';

export class CourseService implements DataService<Course> {
  private data: Course[] = courses;

  getAll(): Course[] {
    return this.data;
  }

  getById(id: number): Course | undefined {
    return this.data.find(course => course.id === id);
  }

  // task: Створіть функцію getMostPopularCourseType(): CourseType, 
  // яка визначає найпопулярніший тип занять. 

  add(course: Course): void {
    this.data.push(course);
  }

  update(id: number, updatedCourse: Course): void {
    const index = this.data.findIndex(course => course.id === id);
    if (index !== -1) {
      this.data[index] = updatedCourse;
    }
  }

  delete(id: number): void {
    this.data = this.data.filter(course => course.id !== id);
  }
}