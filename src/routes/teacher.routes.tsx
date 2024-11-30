import Routine from "../features/teacher/Course/Routine";
import FlashCard from "../features/teacher/Pages/FlashCard";
import Messages from "../features/teacher/Pages/Messages";
import MyCourse from "../features/teacher/Pages/MyCourse";
import Profile from "../features/teacher/Pages/Profile";
import AcademicQuestion from "../features/teacher/Pages/Question Database/AcademicQuestion";
import AddQuestion from "../features/teacher/Pages/Question Database/AddQuestion/AddQuestion";
import AdmissionQuestion from "../features/teacher/Pages/Question Database/AdmissionQuestion";
import JobQuestion from "../features/teacher/Pages/Question Database/JobQuestion";
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
        element: <QuestionDatabase />,
    },
    {
        path: 'flashcard',
        element: <FlashCard />
    },

    // question database paths
    {
        path: 'academic-question',
        element: <AcademicQuestion />
    },
    {
        path: 'admission-question',
        element: <AdmissionQuestion />
    },
    {
        path: 'job-question',
        element: <JobQuestion />
    },
    {
        path: 'add-question',
        element: <AddQuestion />
    },
    {
        path: 'routine',
        element: <Routine/>
    }
];