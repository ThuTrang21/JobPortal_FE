import { Layout } from "antd";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { routes } from "../utils/routes";
import { Logo } from "../components/Logo";
import { selectUserInfo } from "../store/user/selectors";
import { useAppSelector } from "../store";

const EmployerLayout = () => {

  const location = useLocation();
  const userInfo = useAppSelector(selectUserInfo);

  return (
    <Layout className="bg-background relative">
      <Header
        homeRoute={
          userInfo ? routes.EMPLOYER_MANAGEPOST : routes.EMPLOYER_REGISTER
        }
        menu={
          userInfo // Chỉ hiển thị khi đăng nhập
            ? [
                { label: "Đăng tin miễn phí", route: routes.EMPLOYER_CREATEPOST},
                { label: "Tìm ứng viên", route: routes.EMPLOYER_MANAGEPOST },
              ]
            : []
        }
        logo={<Logo />}
        currentRoute={location.pathname}
        roleType="employer"
      />
    <Layout.Content>
      <Outlet />
    </Layout.Content>
  
    </Layout>
  );
};

export default EmployerLayout;
