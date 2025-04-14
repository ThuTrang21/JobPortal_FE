import { Button, Divider, Input, message, Modal } from "antd";
import { LoginModalProps } from "../../../interfaces/auth";
import { useFormik } from "formik";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../store";
import { clearLoginInfo, login } from "../../../store/auth/actions";
import { selectLoginSuccess } from "../../../store/auth/selectors";
import {  useEffect } from "react";
import { trimObjectValues } from "../../../utils/helpers";

const Login = ({ open, onClose, switchToRegister }: LoginModalProps) => {
  const dispatch = useAppDispatch();
  const successLogin = useAppSelector(selectLoginSuccess);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit,resetForm } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate: (values) => {
        const errors: any = {};
        if (!values.email) {
          errors.email = "Email không được để trống";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Email không hợp lệ";
        }
        if (!values.password) {
          errors.password = "Mật khẩu không được để trống";
        } else if (values.password.length < 6) {
          errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }
        return errors;
      },
      onSubmit: (values) => {
        dispatch(login(trimObjectValues({...values,roleRequired: 'ROLE_JOB_SEEKER'})));
    
      },
    });
      useEffect(() => {
        if (successLogin) {
          message.success("Đăng nhập thành công!");
          resetForm();
          onClose();
          dispatch(clearLoginInfo());
        }
      }, [successLogin]);
  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Đăng nhập</div>}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Divider className="m-1" />
      <form onSubmit={handleSubmit} className="py-5 space-y-6">
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <Input
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            prefix={<UserOutlined />}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Mật khẩu</label>
          <Input.Password
            placeholder="Mật khẩu"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            prefix={<LockOutlined />}
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <Button type="primary" htmlType="submit" className="w-full mt-2">
          Đăng nhập
        </Button>
      </form>
      <p className="text-center text-sm">
        Bạn chưa có tài khoản?{" "}
        <span
          onClick={switchToRegister}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Đăng ký ngay
        </span>
      </p>
    </Modal>
  );
};

export default Login;
