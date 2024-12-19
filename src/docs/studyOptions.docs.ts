/**
 * @swagger
 * /api/study-options/types-options:
 *   get:
 *     summary: Get all study types options
 *     description: Retrieves all available study types options.
 *     tags:
 *       - Study Options
 *     responses:
 *       200:
 *         description: Successfully retrieved study types options.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Full-Time", "Part-Time"]
 */

/**
 * @swagger
 * /api/study-options/programs-options:
 *   post:
 *     summary: Get all programs options
 *     description: Retrieves all available programs options based on the specified study type.
 *     tags:
 *       - Study Options
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetProgramsOptionsDto'
 *     responses:
 *       200:
 *         description: Successfully retrieved programs options.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Computer Science", "Mechanical Engineering"]
 *       400:
 *         description: Bad request (e.g., invalid study type).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 */

/**
 * @swagger
 * /api/study-options/courses-options:
 *   post:
 *     summary: Get all courses options
 *     description: Retrieves all available courses options for a given study type and program name.
 *     tags:
 *       - Study Options
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetCoursesOptionsDto'
 *     responses:
 *       200:
 *         description: Successfully retrieved courses options.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Course 1", "Course 2"]
 *       400:
 *         description: Bad request (e.g., invalid program name or study type).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 */

/**
 * @swagger
 * /api/study-options/groups-options:
 *   post:
 *     summary: Get all groups options
 *     description: Retrieves all available groups options for a given study type, program name, and course.
 *     tags:
 *       - Study Options
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetGroupsOptionsDto'
 *     responses:
 *       200:
 *         description: Successfully retrieved groups options.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                         example: "Group 101"
 *                       value:
 *                         type: string
 *                         example: "101"
 *       400:
 *         description: Bad request (e.g., invalid course or program name).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 */

/**
 * @swagger
 * /api/study-options/subgroups-options:
 *   get:
 *     summary: Get all subgroups options
 *     description: Retrieves all available subgroups options.
 *     tags:
 *       - Study Options
 *     responses:
 *       200:
 *         description: Successfully retrieved subgroups options.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Subgroup A", "Subgroup B"]
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GetProgramsOptionsDto:
 *       type: object
 *       properties:
 *         studyType:
 *           type: number
 *           example: 1
 *           description: The ID of the study type.
 *
 *     GetCoursesOptionsDto:
 *       allOf:
 *         - $ref: '#/components/schemas/GetProgramsOptionsDto'
 *         - type: object
 *           properties:
 *             studyProgramName:
 *               type: string
 *               example: "Computer Science"
 *               description: The name of the study program.
 *
 *     GetGroupsOptionsDto:
 *       allOf:
 *         - $ref: '#/components/schemas/GetCoursesOptionsDto'
 *         - type: object
 *           properties:
 *             course:
 *               type: number
 *               example: 3
 *               description: The course year.
 *
 */
