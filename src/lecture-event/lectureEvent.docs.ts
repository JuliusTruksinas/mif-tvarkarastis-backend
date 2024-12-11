/**
 * @swagger
 * /api/lecture-events:
 *   get:
 *     summary: Get user-specific lecture events
 *     description: Fetches lecture events based on the authenticated user's group and subgroup. Requires a Bearer Token for authentication.
 *     tags:
 *       - Lecture Events
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Limit the number of lecture events returned.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         required: false
 *         description: Skip a number of lecture events (useful for pagination).
 *     responses:
 *       200:
 *         description: Successfully fetched lecture events.
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
 *                     $ref: '#/components/schemas/LectureEvent'
 *       400:
 *         description: Bad request (e.g., invalid parameters).
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
