import academicLogo from '../assets/images/academicLogo.png';
import admissionLogo from '../assets/images/admissionLogo.png';
import jobLogo from '../assets/images/jobLogo.png';
import resource from '../assets/images/resource.png';
import test from '../assets/images/test.png';
import assignment from '../assets/images/assignment.png';
import video from '../assets/images/video.png';
import routine from '../assets/images/routine.png';
import notice from '../assets/images/notice.png';

export const questionDatabase = [
    {
        logo: academicLogo,
        name: 'Academic Question'
    },
    {
        logo: admissionLogo,
        name: 'Admission Question'
    },
    {
        logo: jobLogo,
        name: 'Job Question'
    },
];

export const materials = [
    {
        logo: video,
        name: 'Record Class'
    },
    {
        logo: resource,
        name: 'Resources'
    },
    {
        logo: test,
        name: 'Test Creation',
    },
    {
        logo: assignment,
        name: 'Assignment',
    },
    {
        logo: routine,
        name: 'Routine',
    },
    {
        logo: notice,
        name: 'Notice'
    }
];

export const testTime = ['10 Minutes', '15 Minutes', '20 Minutes', '30 Minutes', '45 Minutes', '60 Minutes'];
export const QuestionType = ['MCQ', 'Written'];
export const QuestionCategory = ['Academic', 'Admission', 'Job'];