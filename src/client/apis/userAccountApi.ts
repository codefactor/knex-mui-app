import {
  Credentials,
  InitialPayload,
  LoginPayload,
  NewUser,
} from "../../core/sharedTypes";
import { getJson, postJson, responseJson, responseOk } from "./util";

export async function fetchInitialPayload(): Promise<InitialPayload> {
  return await getJson<InitialPayload>("init");
}

export async function requestLogin(
  credentials: Credentials
): Promise<LoginPayload> {
  return await responseJson(await postJson("login", credentials));
}

export async function requestLogout(): Promise<void> {
  await getJson("logout");
}

export async function requestCreateUser(newUser: NewUser): Promise<void> {
  await responseOk(await postJson("user", newUser));
}
