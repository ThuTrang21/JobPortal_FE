import { Avatar, Divider, Dropdown, Layout, MenuProps } from "antd";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/helpers";
import { routes } from "../../utils/routes";
import { map } from "lodash";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../store/auth/actions";
import Login from "../../pages/jobSeeker/auth/Login";
import Register from "../../pages/jobSeeker/auth/Register";
import { selectUserInfo } from "../../store/user/selectors";

interface IHeaderProps {
  currentRoute?: string;
  menu?: {
    label: string;
    route: string;
    icon?: string;
  }[];
  submenu?: React.ReactNode;
  logo: React.ReactNode;
  homeRoute: string;
  moreMenus?: any;
  className?: string;
  roleType?: "employer" | "jobseeker";
}
const Header = ({
  menu,
  logo,
  className,
  homeRoute,
  roleType,
}: IHeaderProps) => {
  const navigate = useNavigate();
  const userSelector = useAppSelector(selectUserInfo);

  const dispatch = useAppDispatch();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          onClick={() =>
            navigate(
              roleType === "employer"
                ? routes.EMPLOYER_ACCOUNTINFOR
                : routes.ACCOUNT_PROFILE
            )
          }
        >
          Tài khoản
        </a>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: (
        <a
          onClick={() =>
            dispatch(
              logout({
                role:
                  roleType === "employer" ? "ROLE_EMPLOYER" : "ROLE_JOB_SEEKER",
              })
            )
          }
        >
          Đăng xuất
        </a>
      ),
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <Layout.Header
      className={cn(
        "bg-white sticky left-0 top-0 z-50 h-14 w-full !px-0 data-[has-submenu=true]:h-[calc(56px+48px)]",
        className
      )}
    >
      <div className="bg-white border-neutral-200 flex justify-between h-14 items-center px-5">
        <div
          className="cursor-pointer px-10"
          onClick={() => {
            navigate(homeRoute || "/");
          }}
        >
          {logo}
        </div>
        {userSelector && <Divider type="vertical" className="h-10" />}

        <div className="ml-48 flex items-center gap-2">
          {map(menu, (item, index) => (
            <button
              className="data-[active=true]:!bg-primary hover:text-blue-500 body-xs flex h-9 cursor-pointer items-center rounded-lg px-5 font-bold uppercase transition-all data-[active=true]:pointer-events-none"
              key={`${item.route}-${index}`}
              onClick={() => navigate(item.route)}
            >
              {item.label}
              {item.icon && <Icon icon={item.icon} className="size-5" />}
            </button>
          ))}
        </div>

        {userSelector ? (
          <div className="gap-2 ml-auto flex items-center ">
            <Divider type="vertical" className="h-10" />
            {userSelector?.avatar ? (
              <img
                src={userSelector?.avatar}
                alt="avatar"
                className="rounded-full w-8 h-8"
              />
            ) : (
              <Avatar>
                {userSelector?.fullName
                  .trim()
                  .split(" ")
                  .slice(-1)[0]
                  .charAt(0)
                  .toUpperCase()}
              </Avatar>
            )}
            <Dropdown
              menu={{ items }}
              arrow={{ pointAtCenter: true }}
              placement="bottomRight"
            >
              <div className="flex items-center justify-end gap-1 cursor-pointer ">
                <p>{userSelector?.fullName}</p>
                <Icon icon="teenyicons:down-solid" width="12" height="12" />
              </div>
            </Dropdown>
          </div>
        ) : (
          <div className="gap-3 ml-auto flex items-center">
            <Divider type="vertical" className="h-10" />
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() =>
                roleType === "employer"
                  ? navigate(routes.EMPLOYER_LOGIN)
                  : setOpenLogin(true)
              }
            >
              Đăng nhập
            </Button>
            <Button
              variant="filled"
              color="primary"
              size="medium"
              onClick={() =>
                roleType === "employer"
                  ? navigate(routes.EMPLOYER_REGISTER)
                  : setOpenRegister(true)
              }
            >
              Đăng ký
            </Button>
          </div>
        )}
        <div className="flex items-center">
          {!userSelector && roleType === "jobseeker" && (
            <>
          
              <Divider type="vertical" className="h-10" />
              <Button
                variant="filled"
                color="primary"
                size="small"
                onClick={() => navigate(routes.EMPLOYER)}
              >
                Dành cho nhà tuyển dụng
              </Button>
            </>
          )}
        </div>
      </div>
      <Login
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        switchToRegister={() => {
          setOpenLogin(false);
          setOpenRegister(true);
        }}
      />
      <Register
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        switchToLogin={() => {
          setOpenLogin(true);
          setOpenRegister(false);
        }}
      />
    </Layout.Header>
  );
};
export default memo(Header);
