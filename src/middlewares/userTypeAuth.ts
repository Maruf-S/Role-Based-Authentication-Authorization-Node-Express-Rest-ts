/**
 * @DESC Check the application type user
 */
const userTypeAuth = type => (req: any, res: any, next: any) => {
    if (type === req.user.userType) {
        return next();
    }
    return res.status(401).json({
        message: `Unauthorized.`,
        success: false
    });
};
export default userTypeAuth;