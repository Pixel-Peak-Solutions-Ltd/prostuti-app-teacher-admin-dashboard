
import { IPaymentFilters, IPaymentResponse } from "../../../types/payment.types";
import { baseApi } from "../../api/baseApi";

const paymentAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new payment
    // createPayment: builder.mutation<IPaymentResponse, ICreatePaymentPayload>({
    //   query: (payment) => ({
    //     url: "/voucher/create-voucher",
    //     method: "POST",
    //     body: payment,
    //   }),
    //   invalidatesTags: ["Payments"],
    // }),

    // Get all payments with filters
    getAllPayments: builder.query<IPaymentResponse, IPaymentFilters>({
      query: (filters) => {
        const queryParams = new URLSearchParams();

       
        queryParams.set('limit', (filters.limit || 10).toString());

       
        if (filters.searchTerm) queryParams.set('searchTerm', filters.searchTerm);
        if (filters.student_id) queryParams.set('student_id', filters.student_id);
        if (filters.paymentType) queryParams.set('paymentType', filters.paymentType);
        if (filters.status) queryParams.set('status', filters.status);
        if (filters.amount) queryParams.set('amount', filters.amount);
        if (filters.transactionId) queryParams.set('transactionId', filters.transactionId);
        if (filters.createdDate) queryParams.set('createdDate', filters.createdDate);
        if (filters.expireDate) queryParams.set('expireDate', filters.expireDate);
        if (filters.page) queryParams.set('page', filters.page.toString());
        if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);
        if (filters.sortOrder) queryParams.set('sortOrder', filters.sortOrder);

        return {
          url: `/payment/all-payment?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Payments"],
    }),

    // Delete a payment
    // deletePayment: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/voucher/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Payments"],
    // }),

    // Update a payment
    // updatePayment: builder.mutation<IPaymentResponse, IUpdatePaymentPayload>({
    //   query: ({ id}) => ({
    //     url: `/voucher/${id}`,
    //     method: "PATCH",
        
    //   }),
    //   invalidatesTags: ["Payments"],
    // }),

    // Get a single payment
    getPaymentById: builder.query<IPaymentResponse, string>({
      query: (id) => ({
        url: `/payment/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: 'Payment', id }],
    }),
  }),
});

// Export hooks
export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
} = paymentAPI;