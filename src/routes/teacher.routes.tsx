import FlashCard from "../features/teacher/Pages/FlashCard";
import Messages from "../features/teacher/Pages/Messages";
import MyCourse from "../features/teacher/Pages/MyCourse";
import Profile from "../features/teacher/Pages/Profile";
import QuestionDatabase from "../features/teacher/Pages/QuestionDatabase";
import TeacherDashboard from "../features/teacher/Pages/TeacherDashboard";

export const teacherRoutes = [
    {
        path: 'dashboard',
        element: <TeacherDashboard />
    },
    {
        path: 'my-course',
        element: <MyCourse />
    },
    {
        path: 'messages',
        element: <Messages />
    },
    {
        path: 'profile',
        element: <Profile />
    },
    {
        path: 'question-database',
        element: <QuestionDatabase />
    },
    {
        path: 'flashcard',
        element: <FlashCard />
    },
];