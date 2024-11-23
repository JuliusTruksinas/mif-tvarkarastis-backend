import express from 'express';
import {
  getAllCoursesOptions,
  getAllGroupsOptions,
  getAllProgramsOptions,
  getAllStudyTypesOptions,
  getAllSubgroupsOptions,
} from './studyOptions.handler';
import { validateDto } from '../middleware/validateDto';
import { GetProgramsOptionsDto } from './dto/request/get-programs-options.dto';
import { GetCoursesOptionsDto } from './dto/request/get-courses-options.dto';
import { GetGroupsOptionsDto } from './dto/request/get-groups-options.dto';

const studyOptionsRoutes = express.Router();

studyOptionsRoutes.get('/types-options', getAllStudyTypesOptions);

studyOptionsRoutes.post(
  '/programs-options',
  validateDto(GetProgramsOptionsDto),
  getAllProgramsOptions,
);

studyOptionsRoutes.post(
  '/courses-options',
  validateDto(GetCoursesOptionsDto),
  getAllCoursesOptions,
);

studyOptionsRoutes.post(
  '/groups-options',
  validateDto(GetGroupsOptionsDto),
  getAllGroupsOptions,
);

studyOptionsRoutes.get('/subgroups-options', getAllSubgroupsOptions);

export default studyOptionsRoutes;
