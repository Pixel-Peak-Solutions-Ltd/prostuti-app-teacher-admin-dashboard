export interface ICoupon {
    _id: string;
    title: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    voucherType: 'All_Course' | 'Specific_Course' | 'Specific_Student';
    startDate: string;
    endDate: string;
    student_id?: {name:string};
    course_id?: {
        name:string,
        category_id:{
            type:string
        }
    };
    createdBy: string;
  }
  
  export interface ICouponFilters {
    searchTerm?: string;
    course?: boolean;
    user?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
  
  export interface ICouponResponse {
    data: {
      data: ICoupon[];
      meta: {
        page: number;
        limit: number;
        count: number;
      };
    };
    success: boolean;
    message: string;
  }
  
  // Create coupon payload type
  export interface ICreateCouponPayload {
    title: string;
    discountType: 'Percentage' | 'Amount';
    voucherType?: "All_Course" | "Specific_Course" | "Specific_Student"
    discountValue: number;
    startDate: string;
    endDate: string;
    student_id?: string;
    course_id?: string;
  }
  // Update coupon payload type
export interface IUpdateCouponPayload {
    id: string;
  }