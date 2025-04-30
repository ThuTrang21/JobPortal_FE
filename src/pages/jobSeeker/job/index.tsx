import { Breadcrumb, Col, Divider, Input, Modal, Row, Spin, Tag } from "antd";
import SearchBox from "../../../components/Form/SearchBox";
import { routes } from "../../../utils/routes";
import { Icon } from "../../../components/Icon";
import { Button } from "../../../components/Button";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectIsLoadingJob, selectJobById } from "../../../store/job/selector";
import { useEffect, useRef, useState } from "react";
import { applyJob, getJobById } from "../../../store/job/action";
import { format } from "date-fns";
import { uploadFileToCloud } from "../../../components/Form/UploadFileToCloudinary";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";

const JobDetail = () => {
  const { id } = useParams();
  const job = useAppSelector(selectJobById);
  console.log("job", job);
  const dispatch = useAppDispatch();
  const isLoadingJob = useAppSelector(selectIsLoadingJob);

  const [uploadFile, setUploadFile] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadFile(true);
    const uploadedUrl = await uploadFileToCloud(file);
    setFieldValue("coverLetter", uploadedUrl);
    setSelectedFileName(file?.name || "");
    setUploadFile(false);
  };

  useEffect(() => {
    dispatch(getJobById(id));
  }, [id]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
    errors,
    values,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
    },
    validationSchema: yup.object().shape({
      fullName: yup.string().required("Vui lòng nhập họ và tên"),
      email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      phone: yup
        .string()
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại"),
        coverLetter: yup.string().required("Vui lòng tải lên CV"),
    }),
    onSubmit: (values) => {
      dispatch(applyJob({ data: values, id: id }));
      console.log("values", values);
      resetForm();
      setSelectedFileName("");
      setIsModalOpen(false);
    },
  });

  if (isLoadingJob) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin className="w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="wp-container pt-0">
      <div className="w-full lg:px-10 px-3 py-7 bg-[linear-gradient(355deg,_#a0d8ef80,_#00bfff)]">
        <SearchBox />
      </div>
      <div className="w-full px-12 py-5">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <span className="font-bold text-primary">Trang chủ</span>,
              href: routes.HOME,
            },
            {
              title: (
                <span className="font-bold text-primary">
                  Tìm việc làm {job?.jobRoleName}
                </span>
              ),
              href: "",
            },
            {
              title: `${job?.title}`,
            },
          ]}
        />
      </div>
      <div className="flex flex-col lg:flex-row wp-container lg:px-12 px-1">
        <div className="w-full lg:w-[65%] pb-4">
          <div className="px-4 md:px-10 py-4 bg-white shadow-sd-12 rounded-lg mt-4 lg:mb-6 flex flex-col gap-7">
            <div className="body-xl font-bold flex items-center gap-2">
              <span>{job?.title}</span>
              <Icon
                icon="icon-park-solid:check-one"
                width="16"
                height="16"
                className="text-green-600"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-full p-1">
                  <Icon
                    icon="ic:baseline-attach-money"
                    width="26"
                    height="26"
                    className="text-white"
                  />
                </div>
                <div>
                  <div className="body-md">Mức lương</div>
                  <div className="body-sm font-bold">
                    {job?.salaryType === "Thỏa thuận"
                      ? "Thỏa thuận"
                      : `${job?.salaryMin} - ${job?.salaryMax} triệu`}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-full p-2">
                  <Icon
                    icon="mingcute:location-fill"
                    width="19"
                    height="19"
                    className="text-white"
                  />
                </div>
                <div>
                  <div className="body-md">Địa điểm</div>
                  <div className="body-sm font-bold">{job?.province}</div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-full p-2">
                  <Icon
                    icon="mdi:timer-sand-full"
                    width="19"
                    height="19"
                    className="text-white"
                  />
                </div>

                <div>
                  <div className="body-md">Kinh nghiệm</div>
                  <div className="body-sm font-bold">{job?.experience}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center ">
              <div className="flex flex-row items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                <Icon
                  icon="mingcute:time-fill"
                  width="17"
                  height="17"
                  className="text-gray-500"
                />
                <span>
                  Hạn nộp hồ sơ:{" "}
                  {job?.expiredAt
                    ? dayjs(job.expiredAt).format("DD/MM/YYYY")
                    : ""}
                </span>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-[75%]">
                <Button className="w-full" onClick={() => setIsModalOpen(true)}>
                  <Icon
                    icon="mingcute:send-plane-line"
                    width="24"
                    height="24"
                  />
                  Ứng tuyển ngay
                </Button>
                <form onSubmit={handleSubmit}>
                  <Modal
                  centered
                    title={
                      <h1 className="text-2xl">
                        Ứng tuyển{" "}
                        <span className="text-primary">{job?.title}</span>
                      </h1>
                    }
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={
                      <div className="w-full flex gap-2">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="w-1/4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                        >
                          Hủy
                        </button>
                        <button
                          className="w-3/4 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
                          onClick={() => {
                            handleSubmit();
                          }}
                          type="submit"
                        >
                          Nộp hồ sơ ứng tuyển
                        </button>
                      </div>
                    }
                  >
                    <div className="border-[1px] border-dashed border-primary rounded-lg p-3 flex flex-col">
                      <>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          hidden
                        />

                        <div className="flex flex-col gap-3 items-center py-3">
                          <div className="flex flex-row items-center gap-2">
                            <img
                              src="https://www.topcv.vn/v4/image/job-detail/modal-appply/upload-cloud.png"
                              alt=""
                              className="w-[41px] h-[28px]"
                            />
                            <p>Tải lên CV từ máy tính, chọn hoặc kéo thả</p>
                          </div>
                          <p>
                            Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới
                            5MB
                          </p>
                          <div className="flex flex-row gap-2 items-center">
                            {selectedFileName && (
                              <div className=" flex flex-row gap-3">
                                <span className="flex flex-row items-center text-sm text-primary font-bold gap-2">
                                  <Icon icon="bx:file" width="24" height="24" />
                                  {selectedFileName}
                                </span>

                                <Button
                                  variant="soft"
                                  className="bg-red-200 p-1"
                                  size="small"
                                  onClick={() => {
                                    setSelectedFileName("");
                                    if (fileInputRef.current) {
                                      fileInputRef.current.value = "";
                                    }
                                  }}
                                >
                                  <Icon
                                    icon="material-symbols:delete"
                                    width="17"
                                    height="17"
                                    className="text-red-500"
                                  />
                                </Button>
                              </div>
                            )}
                            <Button
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Chọn CV
                            </Button>
                          </div>
                          {touched.coverLetter && errors.coverLetter && (
                            <p className="text-red-500 text-sm">
                              {errors.coverLetter}
                            </p>
                          )}
                        </div>
                      </>
                      <Divider className="my-2" />
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                          <p className="text-primary">
                            Vui lòng nhập thông tin chi tiết
                          </p>
                          <p className="text-red-500">(*)Thông tin bắt buộc</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div>
                            Họ và tên <span className="text-red-500">*</span>
                          </div>
                          <Input
                            type="text"
                            className="border-[1px] border-gray-300 rounded-lg w-full p-2"
                            placeholder="Nhập họ và tên"
                            name="fullName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.fullName}
                          />
                          {touched.fullName && errors.fullName && (
                            <p className="text-red-500 text-sm">
                              {errors.fullName}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-row gap-2">
                          <div>
                            Email <span className="text-red-500">*</span>
                            <Input
                              type="text"
                              className="border-[1px] border-gray-300 rounded-lg w-full p-2"
                              placeholder="Nhập email"
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                            />
                            {touched.email && errors.email && (
                              <p className="text-red-500 text-sm">
                                {errors.email}
                              </p>
                            )}
                          </div>
                          <div>
                            Số điện thoại{" "}
                            <span className="text-red-500">*</span>
                            <Input
                              type="text"
                              className="border-[1px] border-gray-300 rounded-lg w-full p-2"
                              placeholder="Nhập số điện thoại"
                              name="phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.phone}
                            />
                            {touched.phone && errors.phone && (
                              <p className="text-red-500 text-sm">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </form>
              </div>
              <div className="w-[25%]">
                <Button className="w-full" variant="outlined">
                  <Icon icon="mdi:heart-outline" width="20" height="20" />
                  Lưu tin
                </Button>
              </div>
            </div>
          </div>
          <div className="px-4 md:px-10 py-4 bg-white shadow-sd-12 rounded-lg mt-4 lg:mb-6 flex flex-col gap-7">
            <h2 className="body-xl font-bold border-l-[7px] pl-3 border-primary">
              Chi tiết tin tuyển dụng
            </h2>
            <div className="flex gap-2">
              <Tag className="rounded-2xl body-sm py-1 px-2">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  {job?.industryName}
                </a>
              </Tag>
              <Tag className="rounded-2xl body-sm py-1 px-2">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  {job?.fieldName}
                </a>
              </Tag>
              <Tag className="rounded-2xl body-sm py-1 px-2">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  {job?.jobRoleName}
                </a>
              </Tag>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="body-lg text-24 font-semibold pb-1">
                  Mô tả công việc
                </h3>
                <ul className="list-disc pl-10 text-gray-700">
                  {job?.description?.split("\n").map((line, index) => (
                    <li key={index} className="list-disc ml-5">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="body-lg text-24 font-semibold pb-1">
                  Yêu cầu công việc
                </h3>
                <ul className="list-disc pl-10 text-gray-700">
                  {job?.requirement?.split("\n").map((line, index) => (
                    <li key={index} className="list-disc ml-5">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="body-lg text-24 font-semibold pb-1">
                  Địa điểm làm việc
                </h3>
                <li className="list-none before:content-['-'] before:mr-2 before:text-gray-500 before:font-extrabold">
                  {job?.province}: {job?.address}, {job?.district},{" "}
                  {job?.province}
                </li>
              </div>
              <div>
                <h3 className="body-lg text-24 font-semibold pb-1">
                  Thời gian làm việc
                </h3>
                <ul className="list-disc pl-10 text-gray-700">
                  {job?.workingTime?.split("\n").map((line, index) => (
                    <li key={index} className="list-disc ml-5">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="body-lg text-24 font-semibold pb-1">
                  Cách ứng tuyển
                </h3>
                <p>
                  Ứng viên nộp hồ sơ trực tuyến bằng cách bấm{" "}
                  <span className="font-bold">Ứng tuyển </span>ngay dưới đây.
                </p>
                <p className="pt-5">
                  Hạn nộp hồ sơ:{" "}
                  {job?.expiredAt
                    ?dayjs(job.expiredAt).format("DD/MM/YYYY")
                    : ""}
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setIsModalOpen(true)}>Ứng tuyển ngay</Button>
                <Button variant="outlined">Lưu tin</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[35%] lg:ml-8 px-0 md:px-4 lg:px-0">
          <div className="px-5 py-4 bg-white shadow-sd-12 rounded-lg mt-4 lg:mb-6">
            <Row gutter={[16, 15]}>
              <Col span={8}>
                <img
                  src={job?.company?.avatar}
                  className="border-[1px] p-1 rounded-xl"
                />
              </Col>
              <Col span={16}>
                <a className="body-lg font-bold">{job?.company.name}</a>
              </Col>
              <Col span={8}>
                <div className="flex text-slate-500 gap-2 items-center">
                  <Icon
                    icon="rivet-icons:user-group-solid"
                    width="15"
                    height="15"
                  />
                  <p>Quy mô:</p>
                </div>
              </Col>
              <Col span={16}>
                <p>{job?.company.companySize} nhân viên</p>
              </Col>
              <Col span={8}>
                <div className="flex text-slate-500 gap-2 items-center">
                  <Icon icon="ph:cube-fill" width="15" height="15" />
                  <p>Lĩnh vực:</p>
                </div>
              </Col>
              <Col span={16}>
                {job?.company?.industries
                  ?.map((industry) => industry.name)
                  .join(", ")}
              </Col>
              <Col span={8}>
                <div className="flex text-slate-500 gap-2 items-center">
                  <Icon icon="mingcute:location-fill" width="15" height="15" />
                  <p>Địa điểm:</p>
                </div>
              </Col>
              <Col span={16}>
                <p>{job?.company.address}</p>
              </Col>
            </Row>
            <div className="flex items-center justify-center pt-7 gap-2 text-primary">
              <a href="" className="hover:underline hover:text-primary">
                Xem trang công ty
              </a>
              <Icon
                icon="ion:arrow-up-right-box-outline"
                width="16"
                height="16"
              />
            </div>
          </div>
          <div className="px-5 py-4 bg-white shadow-sd-12 rounded-lg mt-4 lg:mb-6">
            <h2 className="body-xl font-bold border-l-[7px] pl-3 border-primary">
              Thông tin chung
            </h2>
            <div className="flex flex-col gap-5 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary p-2 text-white">
                  <Icon icon="solar:medal-star-bold" width="21" height="21" />
                </div>
                <div>
                  <div className="body-md">Cấp bậc</div>
                  <div className="body-sm font-bold">{job?.jobLevel}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary p-2 text-white">
                  <Icon
                    icon="fluent:hat-graduation-12-filled"
                    width="21"
                    height="21"
                  />
                </div>
                <div>
                  <div className="body-md">Học vấn</div>
                  <div className="body-sm font-bold">{job?.degree}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary p-2 text-white">
                  <Icon icon="f7:person-2-fill" width="21" height="21" />
                </div>
                <div>
                  <div className="body-md">Số lượng</div>
                  <div className="body-sm font-bold">{job?.quantity} người</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary p-2 text-white">
                  <Icon icon="basil:bag-solid" width="21" height="21" />
                </div>
                <div>
                  <div className="body-md">Hình thức làm việc</div>
                  <div className="body-sm font-bold">{job?.jobType}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary p-2 text-white">
                  <Icon icon="icon-park-solid:people" width="20" height="20" />
                </div>
                <div>
                  <div className="body-md">Giới tính</div>
                  <div className="body-sm font-bold">
                    {job?.genderRequirement}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
