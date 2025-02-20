import FlashCard from "../features/teacher/Pages/FlashCard";
import Messages from "../features/teacher/Pages/Messages";
import MyCourse from "../features/teacher/Pages/Course/MyCourse";
import Profile from "../features/teacher/Pages/Profile";
import AcademicQuestion from "../features/teacher/Pages/Question Database/AcademicQuestion";
import AddQuestion from "../features/teacher/Pages/Question Database/AddQuestion/AddQuestion";
import AdmissionQuestion from "../features/teacher/Pages/Question Database/AdmissionQuestion";
import JobQuestion from "../features/teacher/Pages/Question Database/JobQuestion";
import QuestionDatabase from "../features/teacher/Pages/QuestionDatabase";
import TeacherDashboard from "../features/teacher/Pages/TeacherDashboard";
import CreateCourse from "../features/teacher/Pages/Course/CreateCourse";
import CourseDetails from "../features/teacher/Pages/Course/CourseDetails";
import CreateLessons from "../features/teacher/Pages/Course/CreateLessons";
import AddCourseMaterial from "../features/teacher/Pages/Course/AddCourseMaterial";
import RecordClass from "../features/teacher/Pages/Materials/RecordClass/RecordClass";
import AssignmentCreation from "../features/teacher/Pages/Materials/Assignment/AssignmentCreation";
import TestCreation from "../features/teacher/Pages/Materials/Create Test/TestCreation";
import ResourcesCreation from "../features/teacher/Pages/Materials/Resource/ResourcesCreation";
import RoutineCreation from "../features/teacher/Pages/Materials/RoutineCreation";
import NoticeCreation from "../features/teacher/Pages/Materials/Notice/NoticeCreation";
import CoursePreview from "../features/teacher/Pages/Course/CoursePreview";
import RecordClassList from "../features/teacher/Pages/Materials/RecordClass/RecordClassList";
import AssignmentList from "../features/teacher/Pages/Materials/Assignment/AssignmentList";
import ResourcesList from "../features/teacher/Pages/Materials/Resource/ResourcesList";
import NoticeList from "../features/teacher/Pages/Materials/Notice/NoticeList";
import TestList from "../features/teacher/Pages/Materials/Create Test/TestList";

export const teacherRoutes = [
    {
        path: 'dashboard',
        element: <TeacherDashboard />
    },
    {
        path: 'my-course',
        element: <MyCourse />,
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

    // course preview route
    {
        path: 'course-preview/:courseId',
        element: <CoursePreview />
    },

    // course update routes
    {
        path: 'record-update/:recordId',
        element: <RecordClass />
    },
    {
        path: 'assignment-update/:assignmentId',
        element: <AssignmentCreation />
    },
    {
        path: 'resource-update/:resourceId',
        element: <ResourcesCreation />
    },
    {
        path: 'test-update/:testId',
        element: <TestCreation />
    },
    {
        path: 'notice-update/:noticeId',
        element: <NoticeCreation />
    },

    // course material lists route
    {
        path: 'record-class-list',
        element: <RecordClassList />
    },
    {
        path: 'resources-list',
        element: <ResourcesList />
    },
    {
        path: 'test-list',
        element: <TestList />
    },
    {
        path: 'assignment-list',
        element: <AssignmentList />
    },
    {
        path: 'routine-list',
        element: <RecordClassList />
    },
    {
        path: 'notice-list',
        element: <NoticeList />
    },

    // course paths
    {
        path: 'create-course',
        element: <CreateCourse />,
        children: [
            {
                path: 'create-course',
                element: <CourseDetails />
            },
            {
                path: 'create-lessons',
                element: <CreateLessons />
            },
            {
                path: 'add-course-material',
                element: <AddCourseMaterial />
            },
            {
                path: 'course-preview',
                element: <CoursePreview />
            },
        ]
    },

    // course material routes
    {
        path: 'record-class',
        element: <RecordClass />
    },
    {
        path: 'assignment',
        element: <AssignmentCreation />
    },
    {
        path: 'test-creation',
        element: <TestCreation />
    },
    {
        path: 'resources',
        element: <ResourcesCreation />
    },
    {
        path: 'routine',
        element: <RoutineCreation />
    },
    {
        path: 'notice',
        element: <NoticeCreation />
    },
];