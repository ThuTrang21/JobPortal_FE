import { Button, Card, Col, Divider, Input, Row } from "antd";
import {  useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { uploadImageToCloud } from "../../../components/Form/UploadToCloudinary";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateUser } from "../../../store/user/actions";
import { trimObjectValues } from "../../../utils/helpers";
import {
  selectUpdateUserSuccess,
  selectUserInfo,
} from "../../../store/user/selectors";
import { toast } from "react-toastify";

const AccountInfor = () => {
  const dispatch = useAppDispatch();

  const [uploadImage, setUploadImage] = useState(false);
  const loadingUpdateUser = useAppSelector(selectUpdateUserSuccess);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadImage(true);
    const image = await uploadImageToCloud(file);
    formik.setFieldValue("avatar", image);
    setUploadImage(false);
  };
  const user = useAppSelector(selectUserInfo);

  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName,
      phone: user?.phone,
      address: user?.address,
      avatar: user?.avatar,
    },
    validationSchema: yup.object().shape({
      fullName: yup.string().required("Họ và tên không được để trống"),
      phone: yup
        .string()
        .required("Số điện thoại không được để trống")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Số điện thoại không hợp lệ"
        ),
    }),
    onSubmit: async (values) => {
      if (!loadingUpdateUser) {
        try {
          await dispatch(
            updateUser({ id: user?.id, ...trimObjectValues(values) })
          );
          toast.success("Cập nhật thông tin thành công");
        } catch (err) {
          console.log(err);
        }
      }
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <h3 className="body-xl font-bold mb-5">Thông tin tài khoản</h3>

            <Row gutter={[0, 16]}>
              <Col span={15}>
                <div>
                  <h2 className="body-md font-bold text-gray-400 mb-4">
                    Thông tin đăng nhập
                  </h2>
                  <Row gutter={[0, 16]}>
                    <Col span={6}>
                      Địa chỉ email <span className="text-red-500">*</span>
                    </Col>
                    <Col span={15}>
                      <Input
                        style={{ width: "100%" }}
                        disabled
                        defaultValue={user?.email}
                      />
                    </Col>
                    <Col span={6}>
                      Mật khẩu <span className="text-red-500">*</span>
                    </Col>
                    <Col span={15}>
                      <Input.Password
                        disabled
                        style={{ width: "100%" }}
                        defaultValue={"123456"}
                      />
                    </Col>
                    <Col span={6}></Col>
                    <Col span={15}>
                      <p className="text-primary cursor-pointer">
                        Đổi mật khẩu
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col span={9}>
                <div>
                  <h2 className="body-md font-bold text-gray-400 mb-3">
                    Ảnh đại diện
                  </h2>
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        formik.values.avatar ||
                        "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                      }
                      alt=""
                      className="rounded-full w-[104px] min-w-[104px] h-[104px]"
                    />
                    <div>
                      <div>
                        <Button
                          variant="outlined"
                          disabled={uploadImage}
                          onClick={() => fileInputRef.current?.click()}
                          loading={uploadImage}
                          type="primary"
                        >
                          {uploadImage ? "Đang tải..." : "Thay đổi ảnh"}
                        </Button>

                        <input
                          ref={fileInputRef}
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>

                      <p className="text-xs pt-1 text-slate-400">
                        Kích cỡ ảnh khuyên dùng từ 1000x1000px trở lên
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Divider />
            <Row gutter={[0, 16]}>
              <Col span={15}>
                <div>
                  <h2 className="body-md font-bold text-gray-400 mb-4">
                    Thông tin liên hệ
                  </h2>
                  <Row gutter={[0, 16]} align="middle">
                    <Col span={6}>
                      Họ và tên<span className="text-red-500">*</span>
                    </Col>
                    <Col span={15}>
                      <Input
                        style={{ width: "100%" }}
                        defaultValue={user?.fullName}
                        name="fullName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                      />
                    </Col>
                    <Col span={6}>
                      Số điện thoại <span className="text-red-500">*</span>
                    </Col>
                    <Col span={15}>
                      <Input
                        defaultValue={user?.phone}
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                      />
                    </Col>

                    <Col span={6}>
                      Địa chỉ liện hệ
                      <br />
                      <span className="text-xs">(Không bắt buộc)</span>
                    </Col>
                    <Col span={15}>
                      <Input
                        defaultValue={user?.address}
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
          <div className="pt-7">
            <Button
              className="px-20 py-3"
              htmlType="submit"
              type="primary"
              loading={loadingUpdateUser}
            >
              Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AccountInfor;
