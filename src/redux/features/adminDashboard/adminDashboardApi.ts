import { baseApi } from "../../api/baseApi";

const adminDashboardAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get course engagement data
    getCourseEngagement: builder.query({
      query: () => ({
        url: "/analytics/course-engagement",
        method: "GET",
      }),
      providesTags: ["CourseEngagement"],
    }),

    // Get top selling courses data
    getTopSellingCourses: builder.query({
      query: () => ({
        url: "/analytics/top-selling",
        method: "GET",
      }),
      providesTags: ["TopSellingCourses"],
    }),

    // Get test completion data
    getTestCompletion: builder.query({
      query: () => ({
        url: "/analytics/test",
        method: "GET",
      }),
      providesTags: ["TestCompletion"],
    }),

    // Get assignment completion data
    getAssignmentCompletion: builder.query({
      query: () => ({
        url: "/analytics/assignment",
        method: "GET",
      }),
      providesTags: ["AssignmentCompletion"],
    }),

    // Get monthly sales statistics
    getMonthlySalesStats: builder.query({
      query: () => ({
        url: "/analytics/monthly-sales",
        method: "GET",
      }),
      providesTags: ["MonthlySalesStats"],
    }),

    // Get last 7 days sales data
    getLast7DaysSales: builder.query({
      query: () => ({
        url: "/analytics/last-7days-sales",
        method: "GET",
      }),
      providesTags: ["Last7DaysSales"],
    }),

    // Get flashcard statistics
    getFlashcardStats: builder.query({
      query: () => ({
        url: "/analytics/flashcard",
        method: "GET",
      }),
      providesTags: ["FlashcardStats"],
    }),

    //
  }),
});

export const {
  useGetCourseEngagementQuery,
  useGetTopSellingCoursesQuery,
  useGetTestCompletionQuery,
  useGetAssignmentCompletionQuery,
  useGetMonthlySalesStatsQuery,
  useGetLast7DaysSalesQuery,
  useGetFlashcardStatsQuery,
} = adminDashboardAPI;
