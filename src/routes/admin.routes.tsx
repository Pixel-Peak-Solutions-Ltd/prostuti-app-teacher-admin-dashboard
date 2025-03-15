import AdminDashboard from "../features/admin/Pages/AdminDashboard/AdminDashboard";
import AddCategory from "../features/admin/Pages/Category/AddCategory/AddCategory";
import Category from "../features/admin/Pages/Category/Category";
import Coupon from "../features/admin/Pages/Coupon/Coupon";
import CourseApproved from "../features/admin/Pages/CourseManagement/CourseApproved/CourseApproved";
import CourseManagement from "../features/admin/Pages/CourseManagement/CourseManagement";
import FlashCardManagement from "../features/admin/Pages/FlashCardManagement";
import PaymentManagement from "../features/admin/Pages/PaymentManagement/PaymentManagement";
import SinglePayment from "../features/admin/Pages/PaymentManagement/SinglePayment";
import PracticeTest from "../features/admin/Pages/PracticeTest";
import ReportCompliance from "../features/admin/Pages/ReportCompliance";
import RevenueManagement from "../features/admin/Pages/RevenueManagement";
import TeacherManagement from "../features/admin/Pages/TeacherManagement/TeacherManagement/TeacherManagement";

import TeacherProfile from "../features/admin/Pages/TeacherManagement/TeacherProfile/TeacherProfile";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "course-management",
    element: <CourseManagement />,
  },
  {
    path: "course-approved/:courseId",
    element: <CourseApproved />,
  },
  {
    path: "flashcard-management",
    element: <FlashCardManagement />,
  },
  {
    path: "teacher-management",
    element: <TeacherManagement />,
  },
  {
    path: "teacher-management/profile/:id",
    element: <TeacherProfile />,
  },
  {
    path: "practice-test",
    element: <PracticeTest />,
  },
  {
    path: "payment-management",
    element: <PaymentManagement />,
  },
  {
    path: 'payment-management/:id',
    element: <SinglePayment />,
  },
  {
    path: 'coupon-management',
    element: <Coupon/>,
  },
  {
    path: 'revenue-management',
    element: <RevenueManagement />,
  },
  {
    path: "category",
    element: <Category />,
  },
  {
    path: "add-category",
    element: <AddCategory />,
  },
  {
    path: "report-compliance",
    element: <ReportCompliance />,
  },
];
