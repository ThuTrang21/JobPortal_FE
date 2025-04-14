import { Button, Divider, Input, message, Modal } from "antd";
import { useFormik } from "formik";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { RegisterModalProps } from "../../../interfaces/auth";
import { useAppDispatch, useAppSelector } from "../../../store";
import { clearRegisterInfo, register } from "../../../store/auth/actions";
import { selectSuccessRegister } from "../../../store/auth/selectors";
import { useEffect } from "react";

const Register = ({ open, onClose, switchToLogin }: RegisterModalProps) => {
  const dispatch = useAppDispatch();
  const successRegister = useAppSelector(selectSuccessRegister);
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.fullName) {
        errors.fullName = "Họ và tên không được để trống";
      }

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

      if (!values.confirmPassword) {
        errors.confirmPassword = "Vui lòng nhập lại mật khẩu";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Mật khẩu nhập lại không khớp";
      }

      return errors;
    },
    onSubmit: (values) => {
      const { confirmPassword, ...data } = values;

      dispatch(
        register({
          ...data,
          role: "ROLE_JOB_SEEKER",
        })
      );
    },
  });
  useEffect(() => {
    if (successRegister) {
      message.success("Đăng ký thành công!");
      resetForm();
      onClose();
      dispatch(clearRegisterInfo());
    }
  }, [successRegister]);
  return (
    <Modal
      title={<div className="text-center text-lg font-semibold">Đăng ký</div>}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Divider className="m-1" />
      <form onSubmit={handleSubmit} className="py-5 space-y-6">
        <div>
          <label className="block font-semibold mb-1">Họ và tên</label>
          <Input
            placeholder="Họ và tên"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            prefix={<UserOutlined />}
          />
          {errors.fullName && touched.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <Input
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            prefix={<MailOutlined />}
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

        <div>
          <label className="block font-semibold mb-1">Nhập lại mật khẩu</label>
          <Input.Password
            placeholder="Nhập lại mật khẩu"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            prefix={<LockOutlined />}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button htmlType="submit" className="w-full mt-2" type="primary" >
          Đăng ký
        </Button>
      </form>
      <p className="text-center text-sm">
        Bạn đã có tài khoản?{" "}
        <span
          onClick={switchToLogin}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Đăng nhập ngay
        </span>
      </p>
    </Modal>
  );
};

export default Register;
