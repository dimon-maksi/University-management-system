import { classrooms } from '../data/initial-data';
import { DataService } from '../interfaces/data-service.interface';
import { Classroom } from '../models/classroom';

export class ClassroomService implements DataService<Classroom> {
  private data: Classroom[] = classrooms;

  getAll(): Classroom[] {
    return this.data;
  }

  getById(number: string): Classroom | undefined {
    return this.data.find(classroom => classroom.number === number);
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

  delete(number: string): void {
    this.data = this.data.filter(classroom => classroom.number !== number);
  }
}
