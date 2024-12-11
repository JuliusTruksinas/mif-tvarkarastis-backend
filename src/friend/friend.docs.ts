/**
 * @swagger
 * /api/friends/request/{friendId}:
 *   post:
 *     summary: Send a friend request
 *     description: Allows a user to send a friend request to another user.
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to whom the friend request is sent.
 *     responses:
 *       200:
 *         description: Friend request sent successfully.
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
 *         description: Validation or logical error (e.g., already sent request).
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
 * /api/friends/accept/{friendId}:
 *   post:
 *     summary: Accept a friend request
 *     description: Allows a user to accept a received friend request.
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose friend request is being accepted.
 *     responses:
 *       200:
 *         description: Friend request accepted successfully.
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
 *         description: Validation or logical error (e.g., no request to accept).
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
 * /api/friends/decline/{friendId}:
 *   post:
 *     summary: Decline a friend request
 *     description: Allows a user to decline a received friend request.
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose friend request is being declined.
 *     responses:
 *       200:
 *         description: Friend request declined successfully.
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
 *         description: Validation or logical error (e.g., no request to decline).
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
 * /api/friends/remove/{friendId}:
 *   delete:
 *     summary: Remove a friend
 *     description: Allows a user to remove an existing friend from their friend list.
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the friend to remove.
 *     responses:
 *       200:
 *         description: Friend removed successfully.
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
 *         description: Validation or logical error (e.g., friend not found in list).
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
