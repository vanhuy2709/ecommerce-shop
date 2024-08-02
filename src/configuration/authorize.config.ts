import { verify } from "jsonwebtoken";
import { Action, ForbiddenError, UnauthorizedError } from "routing-controllers";

export const authorizationChecker = async (action: Action, roles: string[]) => {
  const authHeader = action.request.header('Authorization');
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new UnauthorizedError("You're not authenticate");

  try {
    const decoded = verify(token, process.env.ACCESS_SECRET_KEY);

    if (decoded && !roles.length) return true;

    // @ts-ignore
    if (decoded && roles.find(role => decoded.roles.indexOf(role) !== -1)) return true;

  } catch (error) {
    throw new ForbiddenError("Token is not valid")
  }

  return false;
}

export const currentUserChecker = async (action: Action) => {
  const authHeader = action.request.header('Authorization');
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new UnauthorizedError("You're not authenticate");

  try {
    const decoded = verify(token, process.env.ACCESS_SECRET_KEY);

    return decoded;
  } catch (error) {
    throw new ForbiddenError("Token is not valid");
  }
}