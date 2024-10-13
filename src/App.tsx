import { useLocation } from 'react-router-dom';
import { TeacherLayout } from './shared/components/layout/TeacherLayout';
import AdminLayout from './shared/components/layout/AdminLayout';

const App = () => {
  const location = useLocation();
  return (
    <>
      {
        location.pathname.includes('/admin') ? <AdminLayout /> : <TeacherLayout />
      }
    </>
  );
};

export default App;
