import { Router, Request, Response, NextFunction } from 'express';
import CourseRepo from './../repositories/CoursesRepo';
import { apiErrorHandler } from './../handlers/errorHandler';

export default class CoursesRoutes {
  constructor() {}

  getAllCourses(req: Request, res: Response, next: NextFunction) {
    CourseRepo.getAllCourses({ order: ['seqNo'] })
      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(err, req, res, 'Fetch All Courses failed.');
      });
  }

  getCourseDetails(req: Request, res: Response, next: NextFunction) {
    CourseRepo.getById(req.params.id)
      .then(result => {
        if (result) {
          return res.json(result);
        } else {
          res.status(404).send(`Lesson ${req.params.id} not found.`);
        }
      })
      .catch(err => {
        apiErrorHandler(err, req, res, `Course ${req.params.id} is failed.`);
      });
  }
}
