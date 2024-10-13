import AdminDashboard from "../features/admin/Pages/AdminDashboard";
import CourseManagement from "../features/admin/Pages/CourseManagement";
import FlashCardManagement from "../features/admin/Pages/FlashCardManagement";
import PracticeTest from "../features/admin/Pages/PracticeTest";
import ReportCompliance from "../features/admin/Pages/ReportCompliance";
import RevenueManagement from "../features/admin/Pages/RevenueManagement";
import TeacherManagement from "../features/admin/Pages/TeacherManagement";
import PaymentManagement from "../shared/components/Icons/PaymentManagement";

export const adminRoutes = [
    {
        path: 'dashboard',
        element: <AdminDashboard />
    },
    {
        path: 'course-management',
        element: <CourseManagement />
    },
    {
        path: 'flashcard-management',
        element: <FlashCardManagement />
    },
    {
        path: 'teacher-management',
        element: <TeacherManagement />
    },
    {
        path: 'practice-test',
        element: <PracticeTest />
    },
    {
        path: 'payment-management',
        element: <PaymentManagement />
    },
    {
        path: 'revenue-management',
        element: <RevenueManagement />
    },
    {
        path: 'report-compliance',
        element: <ReportCompliance />
    },
];