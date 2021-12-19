/**
 * @DESC Check the application user role
 * Works only for system users not ticket validators
 */
const userRoleAuth = (roles: string[]) => (req: any, res: any, next: any) => {
    if (roles.includes(req.user.roles.name)) {
        return next();
    }
    return res.status(403).json({
        message: `Forbidden.`,
        success: false
    });
};
export default userRoleAuth;