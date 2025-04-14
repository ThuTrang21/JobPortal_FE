import { Layout, Menu } from "antd";
import Scroll from "../../../components/Scroll";
import { Icon } from "../../../components/Icon";
import { routes } from "../../../utils/routes";
import { navigate } from "../../../store/app/actions";
import { Outlet, useLocation } from "react-router-dom";

const Account = () => {
  const location = useLocation();
  return (
    <Layout hasSider className="!bg-transparent">
      <Layout.Sider width={280} className="!bg-white shadow-lg mt-1">
        <Scroll className="h-[calc(100vh-56px)]">
          <Menu
            className="select-none"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={[
              {
                type: "group",
                label: "Tài khoản",
                children: [
                  {
                    label: "Tài khoản của bạn",
                    key: routes.ACCOUNT_PROFILE,
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
                    onClick: () => navigate(routes.EMPLOYER_COMPANYINFOR),
                  },
                ],
              },
            ]}
          />
        </Scroll>
      </Layout.Sider>

      <Layout.Content className="p-7">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default Account;
