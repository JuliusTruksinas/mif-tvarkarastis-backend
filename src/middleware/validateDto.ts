import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';

export const validateDto = (dtoClass: any) =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const dto = plainToInstance(dtoClass, req.body);
      const errors = await validate(dto);

      if (!errors.length) {
        return next();
      }

      let validationErrors = {};

      for (const error of errors) {
        validationErrors[error.property] = error.constraints
          ? Object.values(error.constraints)
          : 'Invalid input';
      }

      const errorMessage = Object.entries(validationErrors)
        .map(
          ([property, messages]: any) => `${property}: ${messages.join(', ')}`,
        )
        .join('; ');

      next(
        new AppError(
          `Validation failed: ${errorMessage}`,
          400,
          validationErrors,
        ),
      );
    },
  );
