import { Button, Col, Collapse, DatePicker, Input, Radio, Row } from "antd";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useRef, useState } from "react";
import { uploadImageToCloud } from "../../../../components/Form/UploadToCloudinary";
import { useFormik } from "formik";
import * as yup from "yup";
import { selectUpdateUserSuccess, selectUserInfo } from "../../../../store/user/selectors";
import dayjs from "dayjs";
import { updateUser } from "../../../../store/user/actions";
import { trimObjectValues } from "../../../../utils/helpers";
import { toast } from "react-toastify";
const UserProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserInfo);
  const loadingUpdateUser = useAppSelector(selectUpdateUserSuccess);

  const [uploadImage, setUploadImage] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadImage(true);
    const image = await uploadImageToCloud(file);
    formik.setFieldValue("avatar", image);
    setUploadImage(false);
  };
  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName,
      phone: user?.phone,
      address: user?.address,
      avatar: user?.avatar,
      gender: user?.gender,
      birthday: user?.birthday,
    },
    validationSchema: yup.object().shape({
      fullName: yup.string().required("Họ và tên không được để trống"),
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
    <div className="flex flex-col gap-7">
      <Collapse
        className="shadow-md bg-white"
        defaultActiveKey={['1']} 
        expandIconPosition="end"
        items={[
          {
            key: "1",
            label: <p className="body-lg font-bold">Thông tin đăng ký</p>,
            children: (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-1/5 font-bold text-center">Email</div>
                  <div className="flex-1">
                    <Input
                      defaultValue={user?.email}
                      disabled
                      suffix={
                        <Icon
                          icon="teenyicons:tick-circle-outline"
                          width="15"
                          height="15"
                          className="text-primary"
                        />
                      }
                      className="w-[21rem]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-1/5 font-bold text-center">Mật khẩu</div>
                  <div className="flex-1">
                    <Input.Password
                      defaultValue={"123456"}
                      disabled
                      className="w-[21rem]"
                    />
                  </div>
                </div>

                <div className="flex ml-[12rem] gap-4">
                  <Button type="link" className="flex items-center gap-2">
                    <Icon icon="carbon:password" width="17" height="17" />
                    Đổi mật khẩu
                  </Button>

                  <Button type="primary" className="flex items-center gap-2">
                    <Icon icon="solar:pen-linear" width="17" height="17" />
                    Sửa email
                  </Button>
                </div>
              </div>
            ),
          },
        ]}
      />
      <form onSubmit={formik.handleSubmit}>
        <Collapse
          className="shadow-md bg-white"
          defaultActiveKey={['1']} 
          expandIconPosition="end"
          items={[
            {
              key: "1",
              label: <p className="body-lg font-bold">Thông tin cá nhân</p>,
              children: (
                <div className="flex flex-col gap-7 p-5">
                  <Row gutter={16}>
                    <Col span={12} className="flex flex-col gap-5">
                      <Row gutter={[, 7]}>
                        <Col span={24} className="font-bold">
                          Họ và tên<span className="text-red-500"> *</span>
                        </Col>
                        <Col span={24}>
                          <Input
                            name="fullName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                          />
                          {formik.touched.fullName && formik.errors.fullName ? (
                            <p className="text-red-500">
                              {formik.errors.fullName}
                            </p>
                          ) : null}
                        </Col>
                      </Row>

                      <Row gutter={[16, 7]}>
                        <Col span={24} className="font-bold">
                          Địa chỉ
                        </Col>
                        <Col span={24}>
                          <Input
                            name="address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                          />
                        </Col>
                      </Row>
                      <Row gutter={[16, 7]}>
                        <Col span={12} className="flex flex-col gap-3">
                          <p className="font-bold "> Giới tính</p>
                          <Radio.Group
                            name="gender"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.gender}
                          >
                            <Radio value="Nam">Nam</Radio>
                            <Radio value="Nữ">Nữ</Radio>
                          </Radio.Group>
                        </Col>
                        <Col span={12} className="flex flex-col gap-2">
                          <p className="font-bold">Ngày sinh</p>
                          <DatePicker
                            className="w-full"
                            placeholder="Chọn ngày sinh"
                            format="DD/MM/YYYY"
                            value={
                              formik.values.birthday
                                ? dayjs(formik.values.birthday, "DD/MM/YYYY")
                                : null
                            }
                            onChange={(date) => {
                              formik.setFieldValue(
                                "birthday",
                                date ? date.format("DD/MM/YYYY") : ""
                              );
                            }}
                          />
                        </Col>
                      </Row>
                      <Row gutter={[16, 7]}>
                        <Col span={24} className="font-bold">
                          Số điện thoại
                        </Col>
                        <Col span={24}>
                          <Input
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      span={12}
                      className="flex flex-col justify-center gap-8"
                    >
                      <Row>
                        <Col span={24}>
                          <div className="flex items-center gap-2 flex-col">
                            <h2 className="font-bold mb-3">Ảnh đại diện</h2>
                            <div className="flex items-center gap-4">
                              <img
                                src={
                                  formik.values.avatar ||
                                  "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                                }
                                alt=""
                                className="rounded-full w-[104px] min-w-[104px] h-[104px]"
                              />
                            </div>
                            <p className="text-xs text-slate-400">
                              Kích cỡ ảnh khuyên dùng từ 1000x1000px trở lên
                            </p>
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
                          </div>
                        </Col>
                      </Row>
                      <Row gutter={[16, 7]}></Row>
                    </Col>
                  </Row>
                  <div className="flex flex-row mr-auto gap-3">
                    <Button className="w-full border-primary text-primary">
                      <Icon
                        icon="material-symbols:delete-outline"
                        width="18"
                        height="18"
                      />
                      Hủy
                    </Button>
                    <Button type="primary" className="w-full" htmlType="submit" loading={loadingUpdateUser}>
                      <Icon
                        icon="material-symbols:save-outline"
                        width="18"
                        height="18"
                      />
                      Lưu thông tin
                    </Button>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </form>
    </div>
  );
};

export default UserProfile;
