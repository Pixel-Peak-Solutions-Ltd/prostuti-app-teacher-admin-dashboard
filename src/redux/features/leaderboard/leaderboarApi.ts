import { baseApi } from "../../api/baseApi";

const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboardByCourseId: builder.query({
      query: ({ courseId }) => {
        return {
          url: `/leaderboard/course/${courseId}`,
          method: "GET",
        };
      },
      providesTags: ["Leaderboard"],
    }),
  }),
});

export const { useGetLeaderboardByCourseIdQuery } = leaderboardApi;
