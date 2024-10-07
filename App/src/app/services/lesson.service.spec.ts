import { TestBed } from '@angular/core/testing';

import { LessonService } from './lesson.service';
import { Lesson } from '../models/lesson';

describe('LessonService', () => {

  let lessonService: LessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonService],
    });
    lessonService = TestBed.inject(LessonService);
  });

  it('should get all lessons', () => {
    const lessons = lessonService.getAll();
    expect(lessons).toBeTruthy();
    expect(lessons.length).toBeGreaterThan(0);  // Підставте актуальні значення для ваших тестів
  });

  it('should get lesson by id', () => {
    const lesson = lessonService.getById(1);
    expect(lesson).toBeTruthy();
    expect(lesson?.id).toBe(1);  // Підставте актуальні значення для ваших тестів
  });

  it('should add lesson if no conflicts', () => {
    const newLesson: Lesson = {
      id: 5,
      courseId: 2,
      professorId: 101,
      classroomNumber: '102',
      dayOfWeek: 'Monday',
      timeSlot: '10:15-11:45'
    };

    jest.spyOn(lessonService, 'validateLesson').mockReturnValue(null);

    const result = lessonService.add(newLesson);
    expect(result).toBeTruthy();
  });

  it('should throw error if classroom conflict during lesson addition', () => {
    const newLesson: Lesson = {
      id: 5,
      courseId: 2,
      professorId: 101,
      classroomNumber: '102',
      dayOfWeek: 'Monday',
      timeSlot: '10:15-11:45'
    };

    jest.spyOn(lessonService, 'validateLesson').mockReturnValue('ClassroomConflict');

    expect(() => lessonService.add(newLesson)).toThrowError('Classroom conflict');
  });

  it('should throw error if professor conflict during lesson addition', () => {
    const newLesson: Lesson = {
      id: 5,
      courseId: 2,
      professorId: 101,
      classroomNumber: '102',
      dayOfWeek: 'Monday',
      timeSlot: '10:15-11:45'
    };

    jest.spyOn(lessonService, 'validateLesson').mockReturnValue('ProfessorConflict');

    expect(() => lessonService.add(newLesson)).toThrowError('Professor conflict');
  });

  it('should delete lesson by id', () => {
    const initialCount = lessonService.getAll().length;

    lessonService.delete(1);  // Підставте актуальний id
    const lessons = lessonService.getAll();

    expect(lessons.length).toBeLessThan(initialCount);
    expect(lessons.find(l => l.id === 1)).toBeUndefined();
  });

  it('should validate professor schedule without conflict', () => {
    const result = lessonService.validateProfessor(2, 'Friday', '10:15-11:45');
    expect(result).toBeNull();
  });

  it('should validate classroom schedule without conflict', () => {
    const result = lessonService.validateClassroom('102', 'Friday', '10:15-11:45');
    expect(result).toBeNull();
  });
});
