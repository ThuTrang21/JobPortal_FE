import { Layout, Menu, Spin } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Scroll from "../../components/Scroll";
import { Icon } from "../../components/Icon";
import { routes } from "../../utils/routes";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectLoadingUserInfo } from "../../store/auth/selectors";
import { useEffect } from "react";
import { getCompanyInfo } from "../../store/company/action";

const Employer = () => {
  const navigate = useNavigate();
  const isLoadingUserInfo = useAppSelector(selectLoadingUserInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCompanyInfo());
  }, []);
  if (isLoadingUserInfo) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Layout hasSider className="!bg-transparent">
      <Layout.Sider
        width={280}
        className="!bg-white fixed bottom-0 left-0 top-[3.6rem] z-20"
      >
        <Scroll className="h-[calc(100vh-56px)]">
          <Menu
            className="select-none"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={[
              {
                type: "group",
                label: "Tin đăng",
                children: [
                  {
                    label: "Quản lý tin đăng",
                    key: routes.EMPLOYER_MANAGEPOST,
                    icon: <Icon icon="gg:list" width={15} height={15} />,
                    onClick: () => navigate(routes.EMPLOYER_MANAGEPOST),
                  },
                  {
                    label: "Tạo tin tuyển dụng",
                    key: routes.EMPLOYER_CREATEPOST,
                    icon: <Icon icon="gg:add" width={15} height={15} />,
                    onClick: () => navigate(routes.EMPLOYER_CREATEPOST),
                  },
                ],
              },
              {
                type: "group",
                label: "Ứng viên",
                children: [
                  {
                    label: "Hồ sơ ứng tuyển",
                    key: routes.EMPLOYER_PROFILE,
                    icon: (
                      <Icon
                        icon="basil:folder-user-outline"
                        width="15"
                        height="15"
                      />
                    ),
                    onClick: () => navigate(routes.EMPLOYER_PROFILE),
                  },
                  {
                    label: "Hồ sơ đã lưu",
                    key: routes.EMPLOYER_SAVEDPROFILE,
                    icon: <Icon icon="line-md:heart" width="15" height="15" />,
                    onClick: () => navigate(routes.EMPLOYER_SAVEDPROFILE),
                  },
                ],
              },
              {
                type: "group",
                label: "Tài khoản",
                children: [
                  {
                    label: "Thông tin tài khoản",
                    key: routes.EMPLOYER_ACCOUNTINFOR,
                    icon: (
                      <Icon
                        icon="mdi:badge-account-horizontal-outline"
                        width="15"
                        height="15"
                      />
                    ),
                    onClick: () => navigate(routes.EMPLOYER_ACCOUNTINFOR),
                  },
                  {
                    label: "Thông tin công ty",
                    key: routes.EMPLOYER_COMPANYINFOR,
                    icon: (
                      <Icon icon="lucide:landmark" width="15" height="15" />
                    ),
                    onClick: () => {
                      navigate(routes.EMPLOYER_COMPANYINFOR);
                    },
                  },
                ],
              },
            ]}
          />
        </Scroll>
      </Layout.Sider>

      <Layout.Content className="z-10 overflow-x-hidden pl-[280px]">
        <div className="p-4">
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default Employer;
