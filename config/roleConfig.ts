// import { Role, Permission, RoleConfig } from "@/types/auth.types"

// export const ROLE_CONFIG: Record<Role, RoleConfig> = {
//   ADMIN: {
//     dashboardPath: "/dashboard/admin",
//     permissions: [
//       "dashboard:admin",
//     ],
//     allowedRoutes: ["/dashboard/admin"],
//   },
//   USER: {
//     dashboardPath: "/dashboard/user",
//     permissions: [
//       "dashboard:user",
//     ],
//     allowedRoutes: ["/dashboard/user"],
//   },
//   STAFF: {
//     dashboardPath: "/dashboard/user",
//     permissions: [
//       "dashboard:user",
//     ],
//     allowedRoutes: ["/dashboard/user"],
//   },
// }


// export function getDashboardPath(role: Role): string {
//   return ROLE_CONFIG[role].dashboardPath
// }

// export function hasPermission(role: Role, permission: Permission): boolean {
//   return ROLE_CONFIG[role].permissions.includes(permission)
// }

// export function canAccessRoute(role: Role, pathname: string): boolean {
//   return ROLE_CONFIG[role].allowedRoutes.some((route) =>
//     pathname.startsWith(route)
//   )
// }

// export function getPermissions(role: Role): Permission[] {
//   return ROLE_CONFIG[role].permissions
// }