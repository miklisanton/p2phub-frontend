import {z} from 'zod';
import axios from 'axios';
import { privateFetch, publicFetch} from './utils';
import {toast} from 'react-toastify';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

export const BaseResponseSchema = z.object({
  message: z.string(),
});

const errorItemSchema = z.record(z.any());

export const ErrorSchema = BaseResponseSchema.extend({
  errors: errorItemSchema
});

export const UserSchema = BaseResponseSchema.extend({
  user: z.object({
    email: z.string().email(),
    telegram: z.number().nullable(),
  }),
});

export const MethodSchema = z.object({
  Outbided: z.boolean(),
  Id: z.string(),
  Name: z.string(),
});

export const FormPMethSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const TrackerSchema = z.object({
  id: z.number(),
  exchange: z.string(),
  currency: z.string(),
  side: z.string(),
  notify: z.boolean(),
  payment_methods: z.array(MethodSchema),
  price: z.number(),
  tg_chat_id: z.number(),
  waiting_update: z.boolean(),
  is_aggregated: z.boolean(),
  username: z.string(),
});

export const TrackerListSchema = BaseResponseSchema.extend({
  hasMore: z.boolean(),
  trackers: z.array(TrackerSchema),
});

export type User = z.infer<typeof UserSchema>;
export type ErrorResponse = z.infer<typeof ErrorSchema>;
export type BaseResponse = z.infer<typeof BaseResponseSchema>;
export type Method = z.infer<typeof MethodSchema>;
export type Tracker = z.infer<typeof TrackerSchema>;
export type TrackerList = z.infer<typeof TrackerListSchema>;
export type FormPMeth = z.infer<typeof FormPMethSchema>;

export type TrackerPost = {
  exchange: string,
  side: string,
  username: string,
  currency: string,
  notify: boolean,
  payment_methods: string[],
  is_aggregated: boolean
}

export class APIError extends Error {
  public readonly errors?: any;
  constructor(message: string, errors?: any) {
    super(message);
    this.name = 'APIError';
    this.errors = errors;
  }
  public displayErrors() {
    if (this.errors) {
      for (const [key, value] of Object.entries(this.errors)) {
        console.error(`${key}: ${value}`);
        toast.error(`${value}`);
      }
    }
  }
}

type Result<T, E extends APIError = APIError> = { success: true; data: T } | { success: false; error: E };

export const fetchUser = async (): Promise<User | ErrorResponse> => {
  console.log('fetchUser')
  try {
    const response = await privateFetch.get('/profile');

    // Attempt to parse the response data as a User
    const userData = UserSchema.parse(response.data);
    return userData;
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Validation error while parsing UserSchema
      try {
        // Attempt to parse the response data as an Error
        const errorData = ErrorSchema.parse(err.errors);
        return errorData;
      } catch {
        // Return a generic error if parsing fails
        return { message: 'Invalid response format', errors: [] };
      }
    } else if (axios.isAxiosError(err)) {
      // Axios error (e.g., network error or non-2xx status code)
      if (err.response) {
        try {
          // Attempt to parse the error response data
          const errorData = ErrorSchema.parse(err.response.data);
          return errorData;
        } catch {
          // Return a generic error if parsing fails
          return {
            message: err.response.statusText || 'HTTP error',
            errors: [],
          };
        }
      } else {
        // No response received (e.g., network error)
        return { message: 'No response received from the server', errors: [] };
      }
    } else {
      // Unknown error
      return { message: 'An unexpected error occurred', errors: [] };
    }
  }
};

export const LoginRequest = async ({email, password}: {email: string, password: string}): Promise<Result<BaseResponse>> => {
  try {
    const response = await publicFetch.post('/login', {email, password});
    const result = BaseResponseSchema.safeParse(response.data)
    if (result.success) {
      return {success: true, data: result.data};
    }else{
      return {success: false, error: new APIError(result.error.message, result.error.errors)};
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.log(err.response.request)
        const errorData = ErrorSchema.safeParse(err.response.data);
        if (errorData.success) {
          return {success: false, error: new APIError(errorData.data.message, errorData.data.errors)};
        } else {
          return {success: false, error: new APIError(errorData.error.message, errorData.error.errors)};
        }
      } else {
        return {success: false, error: new APIError("No response received from the server")};
      }
    } else {
      return {success: false, error: new APIError("An unexpected error occurred")};
    }
  }
}

export const FetchTrackers = async (page:number): Promise<Result<BaseResponse>> => {
  try {
    const response = await privateFetch.get('/trackers?page='+page);
    const result = TrackerListSchema.safeParse(response.data)
    if (result.success) {
      return {success: true, data: result.data};
    }else{
      return {success: false, error: new APIError(result.error.message, result.error.errors)};
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const errorData = ErrorSchema.safeParse(err.response.data);
        if (errorData.success) {
          return {success: false, error: new APIError(errorData.data.message, errorData.data.errors)};
        } else {
          return {success: false, error: new APIError(errorData.error.message, errorData.error.errors)};
        }
      } else {
        return {success: false, error: new APIError("No response received from the server")};
      }
    } else {
      return {success: false, error: new APIError("An unexpected error occurred")};
    }
  }
}

