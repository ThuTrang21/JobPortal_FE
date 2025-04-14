import { Input } from "antd";
import bg from "/images/bg_171576434650.png";
import { Button } from "../../../../components/Button";
import { routes } from "../../../../utils/routes";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { selectLoadingLogin } from "../../../../store/auth/selectors";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../../../../store/auth/actions";
import { trimObjectValues } from "../../../../utils/helpers";
import { t } from "i18next";

const LogIn = () => {
  const dispatch = useAppDispatch();

  const loadingLogin = useAppSelector(selectLoadingLogin);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        email: yup
          .string()
          .required("Email không được để trống")
          .email("Email không hợp lệ"),
        password: yup
          .string()
          .required("Mật khẩu không được để trống")
          .min(6, "Mật khẩu phải lớn hơn 6 ký tự"),
      }),
      onSubmit: (values) => {
        dispatch(
          login(trimObjectValues({ ...values, roleRequired: "ROLE_EMPLOYER" }))
        );
      },
    });

  return (
    <div
      className="p-0 md:p-16 login-wrapper"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="md:p-6 p-[12px] m-auto bg-white rounded-xl border border-neutral-12 max-w-[470px]">
        <div className="text-lg font-semibold py-2">
          Nhà tuyển dụng đăng nhập
        </div>
        <form autoComplete="on" noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              Địa chỉ email
              <Input
                placeholder={t("authen.form.placeholder.email")}
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              Mật khẩu
              <Input.Password
                placeholder={t("authen.form.placeholder.password")}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>
            <Button type="submit" size="large" disabled={loadingLogin}
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
      <div className="p-[12px] md:p-3 text-center m-auto md:m-auto md:my-3 text-sm mt-4 rounded-lg bg-white border border-neutral-12 max-w-[470px]">
        Bạn là nhà tuyển dụng mới?
        <a href={routes.EMPLOYER_REGISTER} className="text-primary ml-1">
          Đăng ký tài khoản
        </a>
      </div>
    </div>
  );
};

export default LogIn;
