import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

// TODO Log onto a file
const file = new winston.transports.File({
  filename: '../logs/error.log',
  level: 'error',
  handleExceptions: true,
});

export function unCaughtErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  winston.error(JSON.stringify(err));
  res.end({ error: err });
}

export function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  message: string,
) {
  const error: object = { Message: message, Request: req, Stack: err };
  winston.error(JSON.stringify(error));
  res.json({ Message: message });
}
