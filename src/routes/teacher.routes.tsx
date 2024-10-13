import FlashCard from "../features/teacher/Pages/FlashCard";
import Messages from "../features/teacher/Pages/Messages";
import MyCourse from "../features/teacher/Pages/MyCourse";
import Profile from "../features/teacher/Pages/Profile";
import QuestionDatabase from "../features/teacher/Pages/QuestionDatabase";
import TeacherDashboard from "../features/teacher/Pages/TeacherDashboard";

export const teacherRoutes = [
    {
        path: 'teacher/dashboard',
        element: <TeacherDashboard />
    },
    {
        path: 'teacher/my-course',
        element: <MyCourse />
    },
    {
        path: 'teacher/messages',
        element: <Messages />
    },
    {
        path: 'teacher/profile',
        element: <Profile />
    },
    {
        path: 'teacher/question-database',
        element: <QuestionDatabase />
    },
    {
        path: 'teacher/flashcard',
        element: <FlashCard />
    },
];