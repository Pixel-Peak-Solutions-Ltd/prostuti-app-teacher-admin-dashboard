import { ICoupon, ICouponFilters, ICouponResponse, ICreateCouponPayload, IUpdateCouponPayload } from "../../../types/coupon.types";
import { baseApi } from "../../api/baseApi";

const couponAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new coupon
    createCoupon: builder.mutation<ICouponResponse, ICreateCouponPayload>({
      query: (coupon) => ({
        url: "/voucher/create-voucher",
        method: "POST",
        body: coupon,
      }),
      invalidatesTags: ["Coupons"],
    }),

    // Get all coupons with filters
    getAllCoupons: builder.query<ICouponResponse, ICouponFilters>({
      query: (filters) => {
        const queryParams = new URLSearchParams();

       
        queryParams.set('limit', (filters.limit || 10).toString());

       
        if (filters.searchTerm) queryParams.set('searchTerm', filters.searchTerm);
        if (filters.course) queryParams.set('course', 'true');
        if (filters.user) queryParams.set('user', 'true');
        if (filters.page) queryParams.set('page', filters.page.toString());
        if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);
        if (filters.sortOrder) queryParams.set('sortOrder', filters.sortOrder);

        return {
          url: `/voucher/all-voucher?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Coupons"],
    }),

    // Delete a coupon
    deleteCoupon: builder.mutation<void, string>({
      query: (id) => ({
        url: `/voucher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),

    // Update a coupon
    updateCoupon: builder.mutation<any, IUpdateCouponPayload>({
      query: ({id,...coupon}) => ({
        url: `/voucher/${id}`,
        method: "PATCH",
        body:coupon,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Coupons",
        { type: 'Coupon', id }
      ],
    }),

    // Get a single coupon
    getCouponById: builder.query<any, string>({
      query: (id) => ({
        url: `/voucher/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: 'Coupon', id }],
    }),
  }),
});

// Export hooks
export const {
  useCreateCouponMutation,
  useGetAllCouponsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
  useGetCouponByIdQuery,
} = couponAPI;