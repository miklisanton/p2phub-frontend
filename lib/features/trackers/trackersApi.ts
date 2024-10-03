import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, {Method} from "axios";
import { privateFetch } from "@/utils";

import { type TrackerList, type FormPMeth, TrackerPost, Tracker, ErrorSchema} from "@/types";

export const customBaseQuery: BaseQueryFn<
  {url: string, method: "get"|"post"|"delete"|"patch", body?: any},
  unknown,
  unknown
  > = async ({ url, method, body }) => {
    try {
      const response = await privateFetch[method](url, body);
      return {data: response.data};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorData = ErrorSchema.safeParse(error.response.data);
          if (errorData.success) {
            return {error: { message: errorData.data.message, errors: errorData.data.errors }};
          } else {
            return {error: { message: errorData.error.message, errors: errorData.error.errors }};
          }
        } else {
          return {error: { message: "No response received from the server", errors: [] }};
        }
      } else {
        return {error: { message: "An unexpected error occurred", errors: [] }};
      }
    }
}

type updateArgs = {
  id: number,
  notify: boolean
}

export const trackersApi = createApi({
  reducerPath: "trackersApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Trackers"],
  endpoints: (builder) => ({
    getTrackers: builder.query<TrackerList, number>({
      query: (page) => ({
        url: "/trackers?page="+page,
        method: "get"
      }),
      providesTags: (result) => {
        return result
          ?  [...result.trackers.map(({id}) => ({type: "Trackers", id} as const)), {type: "Trackers", id: "LIST"}]
          :  [{type: "Trackers", id: "LIST"}]
      }
    }),
    getTrackerById: builder.query<Tracker & {message: string}, number>({
      query: (id) => ({
        url: "/trackers/"+id,
        method: "get"
      }),
      providesTags: (result, error, id) => [{type: "Trackers", id}],
    }),
    createTracker: builder.mutation<TrackerList, TrackerPost>({
      query: (tracker) => ({
        url: "/trackers",
        method: "post",
        body: tracker
      }),
      invalidatesTags: [{type: "Trackers", id: "LIST"}],
    }),
    deleteTracker: builder.mutation<{message: string, id: number}, number>({
      query: (id) => ({
        url: "/trackers/"+id,
        method: "delete"
      }),
      invalidatesTags: (result, error, id) => [{type: "Trackers", id: id}],
    }),
    updateTracker: builder.mutation<Tracker & {message: string}, updateArgs>({
      query: (args) => ({
        url: "/trackers/"+args.id,
        method: "patch",
        body: {notify: args.notify}
      }),
      async onQueryStarted({id}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(trackersApi.endpoints.getTrackerById.initiate(id, {forceRefetch: true}));
        } catch (error) {
          console.error("Error deleting tracker", error);
        }
      },
    }),
    fetchExchanges: builder.query<{exchanges: string[]} & {message: string}, void>({
      query: () => ({
        url: "/trackers/options/exchanges",
        method: "get",
      }),
    }),
    fetchCurrencies: builder.query<{options: string[]} & {message: string}, string>({
      query: (exchange) => ({
        url: `/trackers/options/currencies?exchange=${exchange}`,
        method: "get",
      }),
    }),
    fetchMethods: builder.query<{options: FormPMeth[]} & {message: string}, [string, string]>({
     query: ([exchange, currency]) => ({
      url: `/trackers/options/methods?exchange=${exchange}&currency=${currency}`,
      method: "get",
      }),
    }),
  })
});

export const {
  useGetTrackersQuery,
  useGetTrackerByIdQuery,
  useCreateTrackerMutation, 
  useDeleteTrackerMutation,
  useUpdateTrackerMutation,
  useFetchExchangesQuery,
  useFetchCurrenciesQuery,
  useFetchMethodsQuery} = trackersApi;
