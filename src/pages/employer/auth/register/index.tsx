import { Link } from "react-router-dom";
import bg from "/images/bg_171576434650.png";
import img from "/images/image1.png";
import { routes } from "../../../../utils/routes";
import { useState } from "react";
import { Col, Input, Row } from "antd";
import { Button } from "../../../../components/Button";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { selectLoadingRegister } from "../../../../store/auth/selectors";
import { useFormik } from "formik";
import * as yup from "yup";
import { register } from "../../../../store/auth/actions";
import MultiSelect from "../../../../components/Form/MultiSelect";

const Register = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const dispatch = useAppDispatch();

  const loadingRegister = useAppSelector(selectLoadingRegister);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        phone: "",
        password: "",
        company: {
          name: "",
          taxCode: "",
          industries: [],
        },
      },
      validationSchema: yup.object().shape({
        fullName: yup.string().required("Họ và tên không được để trống"),
        email: yup
          .string()
          .required("Email không được để trống")
          .email("Email không hợp lệ"),
        phone: yup
          .string()
          .required("Số điện thoại không được để trống")
          .matches(
            /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
            "Số điện thoại không hợp lệ"
          ),
        password: yup
          .string()
          .required("Mật khẩu không được để trống")
          .min(6, "Mật khẩu phải lớn hơn 6 ký tự"),
        company: yup.object().shape({
          name: yup.string().required("Tên công ty không được để trống"),
          taxCode: yup.string().required("Mã số thuế không được để trống"),
        }),
      }),
      onSubmit: (values) => {
        dispatch(
          register({
            ...values,
            role: "ROLE_EMPLOYER",
          })
        );
      },
    });

  return (
    <div className="flex justify-between 2xl:h-[calc(100vh-80px)]">
      <div
        className="box-register-left mt-[-50px] w-[70%]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="md:flex justify-center w-full md:mt-14">
          {!showRegisterForm ? (
            <div className="mt-20">
              <div className="m-auto md:w-[560px]">
                <p className="text-20 md:text-[24px] leading-8 md:leading-10 text-neutral-84 md:text-left text-center mt-12 md:mt-0">
                  Bạn đang là?
                </p>
              </div>
              <div className="m-auto md:w-[560px] w-full md:bg-white rounded-2xl md:border border-neutral-12 p-4 md:p-6 mt-2">
                <div className="flex gap-4 md:flex-row flex-col">
                  <Link to="/">
                    <div className="flex justify-center items-center flex-row md:flex-col md:border bg-white border-grey-80 rounded-lg w-full md:w-[248px] text-neutral-84 cursor-pointer hover:border-primary transition-all p-4 gap-4 md:gap-0">
                      <img
                        src="https://cdn1.vieclam24h.vn/images/public/2024/08/22/seeker_signup_img_172431234783.png"
                        className="block w-32 h-32"
                      />
                      <div>
                        <p className="body-md text-14 leading-6 mt-2 md:text-center">
                          Tôi là
                        </p>
                        <p className="body-xl text-20 leading-8 font-medium">
                          Người tìm việc
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div
                    onClick={() => setShowRegisterForm(true)}
                    className="flex justify-center items-center flex-row md:flex-col md:border bg-white border-grey-80 rounded-lg w-full md:w-[248px] text-neutral-84 cursor-pointer hover:border-primary transition-all p-4 gap-4 md:gap-0"
                  >
                    <img
                      src="https://cdn1.vieclam24h.vn/images/public/2024/08/22/recruiter_signup_img_172431235191.png"
                      className="block w-32 h-32"
                    />
                    <div>
                      <p className="body-md text-14 leading-6 mt-2 md:text-center">
                        Tôi là
                      </p>
                      <p className="body-xl text-20 leading-8 font-medium">
                        Nhà tuyển dụng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full h-full">
              <h4 className="text-20 md:text-[24px] leading-8 md:leading-10 text-neutral-84 md:text-left text-center">
                Đăng ký tài khoản nhà tuyển dụng
              </h4>
              <div className=" bg-white rounded-xl border border-neutral-12 p-4 md:p-6 my-5 max-w-[560px]">
                <div className="relative ">
                  <form autoComplete="on" noValidate onSubmit={handleSubmit}>
                    <Row gutter={[15, 20]} className="pb-7">
                      <Col span={24} className="body-lg font-bold">
                        Thông tin tài khoản
                      </Col>
                      <Col span={8} className="flex items-center">
                        Họ và tên
                      </Col>
                      <Col span={16}>
                        <Input
                          name="fullName"
                          placeholder="Điền họ và tên"
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.fullName && errors.fullName && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.fullName}
                          </div>
                        )}
                      </Col>
                      <Col span={8} className="flex items-center">
                        Số điện thoại
                      </Col>
                      <Col span={16}>
                        <Input
                          placeholder="Điền số điện thoại"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.phone && errors.phone && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </div>
                        )}
                      </Col>
                      <Col span={8} className="flex items-center">
                        Email
                      </Col>
                      <Col span={16}>
                        <Input
                          placeholder="Điền Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.email && errors.email && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </div>
                        )}
                      </Col>
                      <Col span={8} className="flex items-center">
                        Mật khẩu
                      </Col>
                      <Col span={16}>
                        <Input.Password
                          placeholder="Điền mật khẩu"
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
                      </Col>
                    </Row>

                    <hr className=" w-20 hidden md:block " />

                    <Row gutter={[15, 20]} className="pt-7">
                      <Col span={24} className="body-lg font-bold">
                        Thông tin công ty
                      </Col>
                      <Col span={8} className="flex items-center">
                        Tên công ty
                      </Col>
                      <Col span={16}>
                        <Input
                          name="company.name"
                          placeholder="Điền tên công ty"
                          value={values.company.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.company?.name && errors.company?.name && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.company?.name}
                          </div>
                        )}
                      </Col>
                      <Col span={8} className="flex items-center">
                        Mã số thuế
                      </Col>
                      <Col span={16}>
                        <Input
                          name="company.taxCode"
                          value={values.company.taxCode}
                          placeholder="Điền mã số thuế"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.company?.taxCode &&
                          errors.company?.taxCode && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.company?.taxCode}
                            </div>
                          )}
                      </Col>
                      <Col span={8} className="pt-2">
                        Lĩnh vực hoạt động
                      </Col>
                      <Col span={16}>
                        <MultiSelect
                          value={values.company.industries}
                          onChange={(selectedValues) =>
                            handleChange({
                              target: {
                                name: "company.industries",
                                value: selectedValues, 
                              },
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <div className="flex justify-between items-center pt-4">
                      <div className=" body-md">
                        Bạn đã có tài khoản?
                        <Link to={routes.EMPLOYER_LOGIN}>
                          <span className="text-primary"> Đăng nhập</span>
                        </Link>
                      </div>
                      <Button
                        variant="filled"
                        color="primary"
                        size="large"
                        type="submit"
                        loading={loadingRegister}
                      >
                        Hoàn thành đăng ký
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-[-20px] hidden md:flex w-[47%]">
        <img src={img} className="max-w-full h-auto object-cover" />
      </div>
    </div>
  );
};

export default Register;
