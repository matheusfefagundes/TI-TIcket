export const routePermissions = {
  "/admin": ["admin"],
  "/technician": ["technical"],
  "/portal": ["client"],
};

export function findMatchingRoute(path: string) {
  return Object.keys(routePermissions).find((route) => path.startsWith(route));
}
