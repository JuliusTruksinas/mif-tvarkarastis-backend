/**
 * @swagger
 * /api/user-events:
 *   get:
 *     summary: Fetch all user events
 *     description: Retrieves all events created by the authenticated user.
 *     tags:
 *       - User Events
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user events.
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
 *                     $ref: '#/components/schemas/UserEvent'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 *
 *   post:
 *     summary: Create a new user event
 *     description: Creates a new event for the authenticated user.
 *     tags:
 *       - User Events
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserEventDto'
 *     responses:
 *       200:
 *         description: User event created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/CreateUserEventResponseDto'
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 *
 * /user-events/{userEventId}:
 *   patch:
 *     summary: Update a user event
 *     description: Updates an existing user event for the authenticated user.
 *     tags:
 *       - User Events
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userEventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user event to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserEventDto'
 *     responses:
 *       200:
 *         description: User event updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/UpdateUserEventResponseDto'
 *       400:
 *         description: Invalid input data or event not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 *
 *   delete:
 *     summary: Delete a user event
 *     description: Deletes an existing user event for the authenticated user.
 *     tags:
 *       - User Events
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userEventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user event to delete.
 *     responses:
 *       200:
 *         description: User event deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Event not found or invalid ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserEventDto:
 *       type: object
 *       properties:
 *         startDateTime:
 *           type: string
 *           format: date-time
 *           example: "2024-12-01T10:00:00Z"
 *         endDateTime:
 *           type: string
 *           format: date-time
 *           example: "2024-12-01T12:00:00Z"
 *         title:
 *           type: string
 *           example: "Meeting with Team"
 *         note:
 *           type: string
 *           nullable: true
 *           example: "Discuss project milestones."
 *         location:
 *           type: string
 *           nullable: true
 *           example: "Office Room 101"
 *
 *     UpdateUserEventDto:
 *       type: object
 *       properties:
 *         startDateTime:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2024-12-02T10:00:00Z"
 *         endDateTime:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2024-12-02T12:00:00Z"
 *         title:
 *           type: string
 *           nullable: true
 *           example: "Updated Meeting Title"
 *         note:
 *           type: string
 *           nullable: true
 *           example: "Updated project details."
 *         location:
 *           type: string
 *           nullable: true
 *           example: "New Location"
 *
 *     CreateUserEventResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f14a9d8d6f4b243af0b89c"
 *         startDateTime:
 *           type: string
 *           format: date-time
 *           example: "2024-12-01T10:00:00Z"
 *         endDateTime:
 *           type: string
 *           format: date-time
 *           example: "2024-12-01T12:00:00Z"
 *         title:
 *           type: string
 *           example: "Meeting with Team"
 *         note:
 *           type: string
 *           nullable: true
 *           example: "Discuss project milestones."
 *         location:
 *           type: string
 *           nullable: true
 *           example: "Office Room 101"
 *
 *     UpdateUserEventResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f14a9d8d6f4b243af0b89c"
 *         startDateTime:
 *           type: string
 *           format: date-time
 *           example: "2024-12-02T10:00:00Z"
 *         endDateTime:
 *           type: string
 *           format: date-time
 *           example: "2024-12-02T12:00:00Z"
 *         title:
 *           type: string
 *           example: "Updated Meeting Title"
 *         note:
 *           type: string
 *           nullable: true
 *           example: "Updated project details."
 *         location:
 *           type: string
 *           nullable: true
 *           example: "New Location"
 *
 *     UserEvent:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f14a9d8d6f4b243af0b89c"
 *         startDateTime:
 *           type: string
 *           format: date-time
 *           example: "2024-12-01T10:00:00Z"
 *         endDateTime:
 *           type: string
 *           format: date-time
 *           example: "2024-12-01T12:00:00Z"
 *         title:
 *           type: string
 *           example: "Meeting with Team"
 *         note:
 *           type: string
 *           nullable: true
 *           example: "Discuss project milestones."
 *         location:
 *           type: string
 *           nullable: true
 *           example: "Office Room 101"
 */
