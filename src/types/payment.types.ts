export interface IPayment {
    _id: string;
    student_id: {
      _id: string;
      name: string;
      studentId: string;
    };
    paymentType: 'Paid' | 'Subscription';
    amount: number;
    status: 'Success' | 'Failed' | 'Pending';
    transactionId: string;
    createdDate: Date;
    expireDate?: Date;
    isCouponAdded?: boolean;
  }
  
  export interface IPaymentFilters {
    searchTerm?: string;
    student_id?: string;
    // course_id?: string;
    paymentType?: string;
    status?: string;
    amount?: string;
    transactionId?: string;
    createdDate?: string;
    expireDate?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
  
  export interface IPaymentResponse {
    data: any,
    success: boolean;
    message: string;
  }
  
  // Create payment payload type
    export interface ICreatePaymentPayload {
        student_id: string;
        paymentType: 'Paid' | 'Subscription';
        amount: number;
        status: 'Success' | 'Failed' | 'Pending';
        transactionId: string;
        createdDate: Date;
        expireDate?: Date;
    }
  // Update payment payload type
export interface IUpdatePaymentPayload {
    id: string;
  }