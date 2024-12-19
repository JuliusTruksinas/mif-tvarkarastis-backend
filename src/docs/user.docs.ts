/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: Update user information
 *     description: Allows the authenticated user to update their personal information.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeUserInfoDto'
 *     responses:
 *       200:
 *         description: User information updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/ChangeUserInfoResponseDto'
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
 */

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search for users
 *     description: Searches for users based on a query string. Excludes the authenticated user, their friends, and sent friend requests.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Query string to search for users by name.
 *     responses:
 *       200:
 *         description: List of users matching the search query.
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
 *                     $ref: '#/components/schemas/SendBasicUserInfoResponseDto'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppError'
 */

/**
 * @swagger
 * /api/users/friends:
 *   get:
 *     summary: Get all friends
 *     description: Retrieves the authenticated user's list of friends.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of friends.
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
 *                     $ref: '#/components/schemas/SendBasicUserInfoResponseDto'
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
 *     ChangeUserInfoDto:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           maxLength: 100
 *           example: "John"
 *         lastName:
 *           type: string
 *           maxLength: 100
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 100
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           maxLength: 100
 *           example: "securepassword123"
 *         studyType:
 *           type: number
 *           example: 1
 *         programName:
 *           type: string
 *           maxLength: 100
 *           example: "Computer Science"
 *         course:
 *           type: number
 *           example: 3
 *         group:
 *           type: number
 *           example: 101
 *         subgroup:
 *           type: number
 *           example: 1
 *
 *     ChangeUserInfoResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f14a9d8d6f4b243af0b89c"
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         studyType:
 *           type: number
 *           example: 1
 *         programName:
 *           type: string
 *           example: "Computer Science"
 *         course:
 *           type: number
 *           example: 3
 *         group:
 *           type: number
 *           example: 101
 *         subgroup:
 *           type: number
 *           example: 1
 *
 *     SendBasicUserInfoResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f14a9d8d6f4b243af0b89c"
 *         firstName:
 *           type: string
 *           example: "Jane"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           example: "jane.doe@example.com"
 */
