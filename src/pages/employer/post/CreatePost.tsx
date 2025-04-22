import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { Icon } from "../../../components/Icon";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  selectCompanyInfo,
  selectIndustriesByCompanyId,
} from "../../../store/company/selector";
import { getCompanyIndustries } from "../../../store/company/action";
import { getFieldsByIndustryId } from "../../../store/industry/actions";
import { selectFields } from "../../../store/industry/selector";
import { getJobRolesByFieldId } from "../../../store/field/action";
import { selectJobRolesByFieldId } from "../../../store/field/selector";
import { selectDistricts, selectProvinces } from "../../../store/app/selectors";
import { getDistrict, getProvince } from "../../../store/app/actions";
import { createJob, viewJob } from "../../../store/job/action";

const CreatePost = () => {
  const industries = useAppSelector(selectIndustriesByCompanyId);
  const company = useAppSelector(selectCompanyInfo);
  const fields = useAppSelector(selectFields);
  const jobRoles = useAppSelector(selectJobRolesByFieldId);
  const provinces = useAppSelector(selectProvinces);
  const districts = useAppSelector(selectDistricts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCompanyIndustries(company?.id));
    dispatch(getProvince());
  }, [company?.id]);

  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    resetForm,
    errors,
    values,
    touched,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      requirement: "",
      benefit: "",
      experience: "",
      expiredAt: "",
      workingTime: "",
      jobType: "",
      jobLevel: "",
      degree: "",
      quantity: "",
      genderRequirement: "",
      salaryType: "",
      salaryMin: 0,
      salaryMax: 0,
      location: {
        province: "",
        district: "",
        address: "",
      },
      industry: {
        id: "",
      },
      field: {
        id: "",
      },
      jobRole: {
        id: "",
      },
      viewCount: 0,
      countApplication: 0,
      active: true,
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Tiêu đề không được để trống"),
      description: yup.string().required("Mô tả không được để trống"),
      requirement: yup.string().required("Yêu cầu không được để trống"),
      benefit: yup.string().required("Quyền lợi không được để trống"),
      workingTime: yup
        .string()
        .required("Thời gian làm việc không được để trống"),

      experience: yup.string().required("Kinh nghiệm không được để trống"),
      expiredAt: yup.string().required("Hạn nộp hồ sơ không được để trống"),
      jobType: yup.string().required("Hình thức làm việc không được để trống"),
      jobLevel: yup.string().required("Cấp bậc không được để trống"),
      degree: yup.string().required("Học vấn không được để trống"),
      quantity: yup
        .number()
        .required("Số lượng không được để trống")
        .positive("Số lượng phải lớn hơn 0"),
      genderRequirement: yup.string().required("Giới tính không được để trống"),
      salaryType: yup.string().required("Loại lương không được để trống"),
      salaryMin: yup
        .number()
        .nullable()
        .when("salaryType", {
          is: "Theo khoảng",
          then: (schema) =>
            schema
              .required("Lương tối thiểu không được để trống")
              .positive("Lương tối thiểu phải lớn hơn 0"),
          otherwise: (schema) => schema.nullable().notRequired(),
        }),

      salaryMax: yup
        .number()
        .nullable()
        .when("salaryType", {
          is: "Theo khoảng",
          then: (schema) =>
            schema
              .required("Lương tối đa không được để trống")
              .positive("Lương tối đa phải lớn hơn 0")
              .test(
                "is-greater",
                "Lương tối đa phải lớn hơn lương tối thiểu",
                function (value) {
                  const { salaryMin } = this.parent;
                  return value > salaryMin;
                }
              ),
          otherwise: (schema) => schema.nullable().notRequired(),
        }),
      location: yup.object().shape({
        province: yup.string().required("Tỉnh/Thành phố không được để trống"),
        district: yup.string().required("Quận/Huyện không được để trống"),
        address: yup.string().required("Địa chỉ không được để trống"),
      }),
      industry: yup.object().shape({
        id: yup.string().required("Lĩnh vực không được để trống"),
      }),
      field: yup.object().shape({
        id: yup.string().required("Ngành nghề không được để trống"),
      }),
      jobRole: yup.object().shape({
        id: yup.string().required("Vị trí không được để trống"),
      }),
    }),
    onSubmit: async (values) => {
      await dispatch(createJob({ data: values }));
      resetForm();
      console.log("values", values);
    },
  });
  return (
    <div className=" p-0 md:pr-4 !pb-24">
      <div className="mt-2">
        <div className="relative">
          <form onSubmit={handleSubmit}>
            <Card>
              <div className="flex flex-col">
                <div>
                  <h3 className="text-base font-bold pb-2">Thông tin cơ bản</h3>
                  <div className="flex flex-col md:mb-4 items-start gap-2">
                    <p className="text-12 font-semibold leading-6 text-neutral-84">
                      Tiêu đề tuyển dụng
                      <span className="text-red-500"> *</span>
                    </p>
                    <Input
                      placeholder="Vị trí hiển thị đăng tuyển"
                      type="text"
                      name="title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
                    />
                    {errors.title && touched.title && (
                      <p className="text-red-500 text-xs">{errors.title}</p>
                    )}
                  </div>
                  <div className="md:mb-4">
                    <Row gutter={[16, 24]}>
                      <Col span={8}>
                        <div>
                          <p className="text-12 font-semibold leading-6 text-neutral-84">
                            Lĩnh vực<span className="text-red-500"> *</span>
                          </p>
                          <Select
                            placeholder="Chọn lĩnh vực"
                            style={{ width: "100%" }}
                            options={industries.map((industry) => ({
                              value: industry.id,
                              label: industry.name,
                            }))}
                            onChange={(value) => {
                              setSelectedIndustry(value);
                              setFieldValue("industry.id", value);

                              // Reset field & position
                              setSelectedField("");
                              setFieldValue("field.id", "");
                              setSelectedPosition("");
                              setFieldValue("jobRole.id", "");

                              dispatch(getFieldsByIndustryId(value));
                            }}
                            onBlur={handleBlur}
                            value={values.industry.id || undefined}
                          />
                          {errors.industry && touched.industry && (
                            <p className="text-red-500 text-xs">
                              {errors.industry.id}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col span={8}>
                        <div>
                          <p className="text-12 font-semibold leading-6 text-neutral-84">
                            Ngành nghề<span className="text-red-500"> *</span>
                          </p>
                          <Select
                            placeholder="Chọn ngành nghề"
                            style={{ width: "100%" }}
                            options={fields.map((field) => ({
                              value: field.id,
                              label: field.name,
                            }))}
                            onChange={(value) => {
                              setSelectedField(value);

                              // Reset position
                              setSelectedPosition("");
                              setFieldValue("jobRole.id", "");

                              setFieldValue("field.id", value);
                              dispatch(getJobRolesByFieldId(value));
                            }}
                            onBlur={handleBlur}
                            value={values.field.id || undefined}
                            disabled={!selectedIndustry}
                          />
                          {errors.field && touched.field && (
                            <p className="text-red-500 text-xs">
                              {errors.field.id}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col span={8}>
                        <div>
                          <p className="text-12 font-semibold leading-6 text-neutral-84">
                            Vị trí<span className="text-red-500"> *</span>
                          </p>
                          <Select
                            placeholder="Chọn vị trí"
                            style={{ width: "100%" }}
                            options={jobRoles.map((jobRole) => ({
                              value: jobRole.id,
                              label: jobRole.name,
                            }))}
                            value={values.jobRole.id || undefined}
                            onChange={(value) => {
                              setSelectedPosition(value);
                              setFieldValue("jobRole.id", value);
                            }}
                            onBlur={handleBlur}
                            disabled={!selectedField}
                          />
                          {errors.jobRole && touched.jobRole && (
                            <p className="text-red-500 text-xs">
                              {errors.jobRole.id}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col span={8}>
                        <div>
                          <p className="text-12 font-semibold leading-6 text-neutral-84">
                            Kinh nghiệm
                            <span className="text-red-500"> *</span>
                          </p>
                          <Select
                            placeholder="Chọn kinh nghiệm"
                            style={{ width: "100%" }}
                            value={values.experience || undefined}
                            onChange={(value) =>
                              setFieldValue("experience", value)
                            }
                            onBlur={handleBlur}
                          >
                            <Select.Option value="Chưa có kinh nghiệm">
                              Chưa có kinh nghiệm
                            </Select.Option>
                            <Select.Option value="Dưới 1 năm">
                              Dưới 1 năm
                            </Select.Option>
                            <Select.Option value="1 năm">1 năm</Select.Option>
                            <Select.Option value="2 năm">2 năm</Select.Option>
                            <Select.Option value="3 năm">3 năm</Select.Option>
                            <Select.Option value="4 năm">4 năm</Select.Option>
                            <Select.Option value="5 năm">5 năm</Select.Option>
                            <Select.Option value="Hơn 5 năm">
                              Hơn 5 năm
                            </Select.Option>
                          </Select>
                          {errors.experience && touched.experience && (
                            <p className="text-red-500 text-xs">
                              {errors.experience}
                            </p>
                          )}
                        </div>
                      </Col>

                      <Col span={4}>
                        <p className="text-12 font-semibold leading-6 text-neutral-84">
                          Hạn nộp hồ sơ
                          <span className="text-red-500"> *</span>
                        </p>
                        <DatePicker
                          placeholder="Chọn ngày"
                          style={{ width: "100%" }}
                          format="DD/MM/YYYY"
                          onChange={(date) =>
                            setFieldValue(
                              "expiredAt",
                              date ? date.format("DD/MM/YYYY") : ""
                            )
                          }
                          value={
                            values.expiredAt
                              ? dayjs(values.expiredAt, "DD/MM/YYYY")
                              : null
                          }
                        />
                        {errors.expiredAt && touched.expiredAt && (
                          <p className="text-red-500 text-xs">
                            {errors.expiredAt}
                          </p>
                        )}
                      </Col>

                      <Col span={4}>
                        <p className="text-12 font-semibold leading-6 text-neutral-84">
                          Lương<span className="text-red-500"> *</span>
                        </p>
                        <Select
                          placeholder="Chọn lương"
                          style={{ width: "100%" }}
                          value={values.salaryType || undefined}
                          onChange={(value) => {
                            setFieldValue("salaryType", value);
                            if (value !== "Theo khoảng") {
                              setFieldValue("salaryMin", null);
                              setFieldValue("salaryMax", null);
                            }
                          }}
                          onBlur={handleBlur}
                        >
                          <Select.Option value="Thỏa thuận">
                            Thỏa thuận
                          </Select.Option>
                          <Select.Option value="Theo khoảng">
                            Theo khoảng
                          </Select.Option>
                        </Select>
                        {errors.salaryType && touched.salaryType && (
                          <p className="text-red-500 text-xs">
                            {errors.salaryType}
                          </p>
                        )}
                      </Col>
                      <Col span={3}>
                        <p className="text-12 font-semibold leading-6 text-neutral-84">
                          Từ
                          <span className="text-red-500"> *</span>
                        </p>
                        <InputNumber
                          type="text"
                          style={{ width: "100%" }}
                          min={0}
                          onChange={(value) =>
                            setFieldValue("salaryMin", value)
                          }
                          onBlur={handleBlur}
                          value={
                            values.salaryType === "Thỏa thuận"
                              ? 0
                              : values.salaryMin !== null
                              ? values.salaryMin
                              : 0
                          }
                          disabled={values.salaryType !== "Theo khoảng"}
                          name="salaryMin"
                        />
                        {errors.salaryMin && touched.salaryMin && (
                          <p className="text-red-500 text-xs">
                            {errors.salaryMin}
                          </p>
                        )}
                      </Col>
                      <p className="flex mt-7 justify-center font-bold">-</p>
                      <Col span={3}>
                        <p className="text-12 font-semibold leading-6 text-neutral-84">
                          Đến
                          <span className="text-red-500"> *</span>
                        </p>
                        <InputNumber
                          type="text"
                          style={{ width: "100%" }}
                          min={0}
                          onChange={(value) => {
                            setFieldValue("salaryMax", value);
                          }}
                          onBlur={handleBlur}
                          value={
                            values.salaryType === "Thỏa thuận"
                              ? 0
                              : values.salaryMax !== null
                              ? values.salaryMax
                              : 0
                          }
                          disabled={values.salaryType !== "Theo khoảng"}
                          name="salaryMax"
                        />
                        {errors.salaryMax && touched.salaryMax && (
                          <p className="text-red-500 text-xs">
                            {errors.salaryMax}
                          </p>
                        )}
                      </Col>
                      <Col
                        span={1}
                        className="flex mt-7 justify-center font-bold"
                      >
                        triệu
                      </Col>
                    </Row>
                  </div>

                  <div className="bg-neutral-100 py-3 px-4 mb-2">
                    <div className="flex items-center gap-1">
                      <Icon
                        icon="mingcute:location-fill"
                        width="14"
                        height="14"
                      />
                      <p className="font-bold">Địa chỉ</p>
                    </div>
                    <Divider className="my-2" />
                    <div className="md:mb-4">
                      <Row gutter={[16, 24]}>
                        <Col span={8}>
                          <div>
                            <p className="text-12 font-semibold leading-6 text-neutral-84">
                              Tỉnh / Thành phố
                              <span className="text-red-500"> *</span>
                            </p>
                            <Select
                              placeholder="Chọn tỉnh hoặc thành phố"
                              style={{ width: "100%" }}
                              onChange={(value) => {
                                const selectedProvince = provinces.find(
                                  (p) => p.code === Number(value)
                                );
                                dispatch(getDistrict(value));
                                setFieldValue("location.district", "");
                                setFieldValue(
                                  "location.province",
                                  selectedProvince?.name
                                );
                              }}
                              onBlur={handleBlur}
                              value={values.location.province || undefined}
                            >
                              {provinces.map((province) => (
                                <Select.Option
                                  key={province.code}
                                  value={province.code}
                                >
                                  {province.name}
                                </Select.Option>
                              ))}
                            </Select>
                            {errors.location &&
                              errors.location.province &&
                              touched.location &&
                              touched.location.province && (
                                <p className="text-red-500 text-xs">
                                  {errors.location.province}
                                </p>
                              )}
                          </div>
                        </Col>
                        <Col span={8}>
                          <div>
                            <p className="text-12 font-semibold leading-6 text-neutral-84">
                              Quận / Huyện
                              <span className="text-red-500"> *</span>
                            </p>
                            <Select
                              placeholder="Chọn Quận/Huyện"
                              style={{ width: "100%" }}
                              onChange={(value) => {
                                const selectedDistrict = districts.find(
                                  (d) => d.code === Number(value)
                                );
                                setFieldValue(
                                  "location.district",
                                  selectedDistrict?.name
                                );
                              }}
                              onBlur={handleBlur}
                              value={values.location.district || undefined}
                            >
                              {districts.map((district) => (
                                <Select.Option
                                  key={district.code}
                                  value={district.code}
                                >
                                  {district.name}
                                </Select.Option>
                              ))}
                            </Select>
                            {errors.location &&
                              errors.location.district &&
                              touched.location &&
                              touched.location.district && (
                                <p className="text-red-500 text-xs">
                                  {errors.location.district}
                                </p>
                              )}
                          </div>
                        </Col>
                        <Col span={8}>
                          <p className="text-12 font-semibold leading-6 text-neutral-84">
                            Số nhà tên đường
                            <span className="text-red-500"> *</span>
                          </p>
                          <Input
                            placeholder="VD: 23 Trần Cao Vân, phường Đa Kao"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.location.address || undefined}
                            name="location.address"
                          />
                          {errors.location &&
                            errors.location.address &&
                            touched.location &&
                            touched.location.address && (
                              <p className="text-red-500 text-xs">
                                {errors.location.address}
                              </p>
                            )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                  {/* Thông tin chung */}
                  <div className="bg-neutral-100 p-5 mt-7">
                    <div className="flex flex-row items-center gap-1">
                      <Icon
                        icon="fluent-mdl2:company-directory"
                        width="15"
                        height="15"
                      />
                      <p className="font-bold"> Thông tin chung</p>
                    </div>

                    <Divider className="my-2" />
                    <Row gutter={[16, 24]}>
                      <Col span={5}>
                        <p className="text-12 font-semibold leading-6 text-neutral-84">
                          Cấp bậc
                          <span className="text-red-500"> *</span>
                        </p>
                        <Select
                          placeholder="Chọn cấp bậc"
                          style={{ width: "100%" }}
                          onChange={(value) => setFieldValue("jobLevel", value)}
                          onBlur={handleBlur}
                          value={values.jobLevel || undefined}
                        >
                          <Select.Option value="Thực tập sinh">
                            Thực tập sinh
                          </Select.Option>
                          <Select.Option value="Nhân viên">
                            Nhân viên
                          </Select.Option>
                          <Select.Option value="Trưởng nhóm">
                            Trưởng nhóm
                          </Select.Option>
                          <Select.Option value="Trưởng / Phó phòng">
                            Trưởng / Phó phòng
                          </Select.Option>
                          <Select.Option value="Quản lý/Giám sát">
                            Quản lý / Giám sát
                          </Select.Option>
                          <Select.Option value="Trưởng chi nhánh">
                            Trưởng chi nhánh
                          </Select.Option>
                          <Select.Option value="Phó giám đốc">
                            Phó giám đốc
                          </Select.Option>
                          <Select.Option value="Giám đốc">
                            Giám đốc
                          </Select.Option>
                        </Select>
                        {errors.jobLevel && touched.jobLevel && (
                          <p className="text-red-500 text-xs">
                            {errors.jobLevel}
                          </p>
                        )}
                      </Col>
                      <Col span={5}>
                        <p className="text-12 font-semibold leading-6 text-neutral-84">
                          Học vấn
                          <span className="text-red-500"> *</span>
                        </p>
                        <Select
                          placeholder="Chọn học vấn"
                          style={{ width: "100%" }}
                          onChange={(value) => setFieldValue("degree", value)}
                          onBlur={handleBlur}
                          value={values.degree || undefined}
                        >
                          <Select.Option value="Không yêu cầu">
                            Không yêu cầu
                          </Select.Option>
                          <Select.Option value="Trung cấp trở lên">
                            Trung cấp trở lên
                          </Select.Option>
                          <Select.Option value="Cao đẳng trở lên">
                            Cao đẳng trở lên
                          </Select.Option>
                          <Select.Option value="Đại học">Đại học</Select.Option>
                        </Select>
                        {errors.degree && touched.degree && (
                          <p className="text-red-500 text-xs">
                            {errors.degree}
                          </p>
                        )}
                      </Col>
                      <Col span={4}>
                        <p className="text-12 font-semibold leading-6 text-neutral-84">
                          Số lượng
                          <span className="text-red-500"> *</span>
                        </p>
                        <Input
                          placeholder="Nhập số lượng"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.quantity}
                          name="quantity"
                        />
                        {errors.quantity && touched.quantity && (
                          <p className="text-red-500 text-xs">
                            {errors.quantity}
                          </p>
                        )}
                      </Col>
                      <Col span={5}>
                        <p className="text-12 font-semibold leading-6 text-neutral-84">
                          Hình thức làm việc
                          <span className="text-red-500"> *</span>
                        </p>
                        <Select
                          placeholder="Chọn hình thức làm việc"
                          style={{ width: "100%" }}
                          onChange={(value) => setFieldValue("jobType", value)}
                          onBlur={handleBlur}
                          value={values.jobType || undefined}
                        >
                          <Select.Option value="Khác">Khác</Select.Option>
                          <Select.Option value="Toàn thời gian">
                            Toàn thời gian
                          </Select.Option>
                          <Select.Option value="Bán thời gian">
                            Bán thời gian
                          </Select.Option>
                        </Select>
                        {errors.jobType && touched.jobType && (
                          <p className="text-red-500 text-xs">
                            {errors.jobType}
                          </p>
                        )}
                      </Col>
                      <Col span={5}>
                        <p className="text-12 font-semibold leading-6 text-neutral-84">
                          Giới tính
                          <span className="text-red-500"> *</span>
                        </p>
                        <Select
                          placeholder="Chọn giới tính"
                          style={{ width: "100%" }}
                          onChange={(value) =>
                            setFieldValue("genderRequirement", value)
                          }
                          onBlur={handleBlur}
                          value={values.genderRequirement || undefined}
                        >
                          <Select.Option value="Không yêu cầu">
                            Không yêu cầu
                          </Select.Option>
                          <Select.Option value="Nam">Nam</Select.Option>
                          <Select.Option value="Nữ">Nữ</Select.Option>
                        </Select>
                        {errors.genderRequirement &&
                          touched.genderRequirement && (
                            <p className="text-red-500 text-xs">
                              {errors.genderRequirement}
                            </p>
                          )}
                      </Col>
                    </Row>
                  </div>
                  <h3 className="text-base font-bold py-3 pt-5">
                    Công việc chi tiết
                  </h3>
                  <div>
                    <div className="flex flex-col md:mb-4 items-start gap-2">
                      <p className="text-12 font-semibold leading-6 text-neutral-84">
                        Mô tả công việc
                        <span className="text-red-500"> *</span>
                      </p>
                      <TextArea
                        rows={4}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        name="description"
                      />
                      {errors.description && touched.description && (
                        <p className="text-red-500 text-xs">
                          {errors.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col md:mb-4 items-start gap-2">
                      <p className="text-12 font-semibold leading-6 text-neutral-84">
                        Yêu cầu công việc
                        <span className="text-red-500"> *</span>
                      </p>
                      <TextArea
                        rows={4}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.requirement}
                        name="requirement"
                      />
                      {errors.requirement && touched.requirement && (
                        <p className="text-red-500 text-xs">
                          {errors.requirement}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col md:mb-4 items-start gap-2">
                      <p className="text-12 font-semibold leading-6 text-neutral-84">
                        Quyền lợi<span className="text-red-500"> *</span>
                      </p>
                      <TextArea
                        rows={4}
                        name="benefit"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.benefit}
                      />
                      {errors.benefit && touched.benefit && (
                        <p className="text-red-500 text-xs">{errors.benefit}</p>
                      )}
                    </div>
                    <div className="flex flex-col md:mb-4 items-start gap-2">
                      <p className="text-12 font-semibold leading-6 text-neutral-84">
                        Thời gian làm việc
                        <span className="text-red-500"> *</span>
                      </p>
                      <TextArea
                        rows={2}
                        name="workingTime"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.workingTime}
                      />
                      {errors.workingTime && touched.workingTime && (
                        <p className="text-red-500 text-xs">
                          {errors.workingTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Divider className="my-4" />
              <Button className="ml-auto" type="primary" htmlType="submit">
                Lưu
              </Button>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
