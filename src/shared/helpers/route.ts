import { AUTH_ROUTES, PRIVATE_ROUTES } from "../constants/Path";

export const CheckIsPrivateRoute = (currentRoute: string): boolean => {
  return Boolean(
    PRIVATE_ROUTES.find((r: string) => {
      return currentRoute.includes(r);
    })
  );
};

export const CheckIsAuthRoute = (currentRoute: string): boolean => {
  return Boolean(
    AUTH_ROUTES.find((r: string) => {
      return r.includes(currentRoute);
    })
  );
};
