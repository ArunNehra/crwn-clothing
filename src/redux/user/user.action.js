import { UserActionTypes } from "./user.types";

export const setcurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});
