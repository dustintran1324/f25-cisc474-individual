import { Link } from './links/entities/link.entity';
import { CreateLinkDto } from './links/dto/create-link.dto';
import { UpdateLinkDto } from './links/dto/update-link.dto';

export const links = {
  dto: {
    CreateLinkDto,
    UpdateLinkDto,
  },
  entities: {
    Link,
  },
};

export { IdParam, Pagination } from './queries';

export {
  UserRef,
  UserOut,
  UserCreateIn,
  UserUpdateIn,
  UsersListFilter,
} from './users';

export {
  CourseRef,
  CourseOut,
  CourseCreateIn,
  CourseUpdateIn,
  CoursesListFilter,
} from './courses';

export {
  AssignmentRef,
  AssignmentOut,
  AssignmentCreateIn,
  AssignmentUpdateIn,
  AssignmentsListFilter,
  SubmissionTypeEnum,
} from './assignments';

export {
  SubmissionRef,
  SubmissionOut,
  SubmissionCreateIn,
  SubmissionUpdateIn,
  SubmissionsListFilter,
  SubmissionStatusEnum,
} from './submissions';

export {
  NotificationRef,
  NotificationOut,
  NotificationCreateIn,
  NotificationUpdateIn,
  NotificationsListFilter,
  NotificationTypeEnum,
} from './notifications';

export {
  FeedbackRef,
  FeedbackOut,
  FeedbackCreateIn,
  FeedbackUpdateIn,
  FeedbackListFilter,
} from './feedback';
