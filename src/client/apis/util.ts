import {
  AsyncThunk,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { AjaxError } from "../../core/sharedTypes";
import { showError } from "../features/Errors/errorsSlice";

export function apiPath(path: string) {
  return `/api/${path}`;
}

export function createApiThunk<Returned, ThunkArg>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg>
): AsyncThunk<Returned, ThunkArg, {}> {
  return createAsyncThunk(typePrefix, async (arg, api) => {
    try {
      return await payloadCreator(arg, api);
    } catch (error) {
      api.dispatch(showError(error, "There was an error"));
      throw error;
    }
  });
}

export async function responseOk(response: Response): Promise<void> {
  if (new URLSearchParams(window.location.search).has("delay")) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  if (!response.ok) {
    const error: AjaxError = Object.assign(
      new Error(`Recieved error ${response.status}`),
      {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
      }
    );
    try {
      error.serverError = await response.json();
    } catch (e) {}
    throw error;
  }
}

export async function responseJson<T>(response: Response): Promise<T> {
  await responseOk(response);
  return await response.json();
}

export async function getJson<T>(path: string): Promise<T> {
  return responseJson(await fetch(apiPath(path)));
}

export async function postJson(path: string, body: any): Promise<Response> {
  return fetch(apiPath(path), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
