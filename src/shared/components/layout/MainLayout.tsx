import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { TUser } from "../../../types/types";
import Login from "../Login";
import AdminLayout from "./AdminLayout";
import TeacherLayout from "./TeacherLayout";

const MainLayout = () => {
    const user = useAppSelector((state: RootState) => state.auth.user as TUser);

    if (user.role === "admin") {
        return (
            <AdminLayout />
        );
    } else if (user.role === "teacher") {
        return (
            <TeacherLayout />
        );
    } else {
        return (<Login />);
    }
};

export default MainLayout;