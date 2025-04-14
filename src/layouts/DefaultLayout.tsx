import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { routes } from "../utils/routes";
import { Logo } from "../components/Logo";
import Header from "../components/Header";
import { Footer } from "../components/Footer";

export const DefaultLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        homeRoute={routes.HOME}
        menu={[
          { label: "Cơ hội làm việc", route: routes.HOME },
          {
            label: "Công cụ ",
            icon: "gridicons:dropdown",
            route: routes.JOBSEEKER_DEFAULT,
          },
        ]}
        logo={<Logo />}
        currentRoute={location.pathname}
        roleType="jobseeker"
      />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Footer />
    </Layout>
  );
};
