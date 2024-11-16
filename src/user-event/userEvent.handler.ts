import { catchAsync } from '../utils/catchAsync';
import { CreateUserEventDto } from './dto/request/create-user-event.dto';
import { UserEvent } from './userEvent.model';

export const createUserEvent = catchAsync(async (req, res, next) => {
  const {
    startDateTime,
    endDateTime,
    title,
    notes,
    location,
  }: CreateUserEventDto = req.body;

  const createdUserEvent = await UserEvent.create({
    startDateTime,
    endDateTime,
    title,
    notes,
    location,
    user: req.user,
  });
  res.json({ status: 'success', data: { id: createdUserEvent._id } });
});
