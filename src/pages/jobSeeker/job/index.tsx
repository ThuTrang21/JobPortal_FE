import {
  Breadcrumb,
  Col,
  Divider,
  Input,
  Modal,
  notification,
  Row,
  Spin,
  Tag,
} from "antd";
import SearchBox from "../../../components/Form/SearchBox";
import { routes } from "../../../utils/routes";
import { Icon } from "../../../components/Icon";
import { Button } from "../../../components/Button";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  selectApplicationCount,
  selectIsLoadingJob,
  selectJobById,
} from "../../../store/job/selector";
import { useEffect, useRef, useState } from "react";
import {
  applicationCount,
  applyJob,
  getJobById,
  hasPayJob,
} from "../../../store/job/action";
import { uploadFileToCloud } from "../../../components/Form/UploadFileToCloudinary";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";
import Login from "../auth/Login";
import axios from "axios";
import { Transaction } from "../../../interfaces/common";

const JobDetail = () => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(255);

  const [timeLeftToday, setTimeLeftToday] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const diff = endOfDay.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeftToday("00:00:00");
        setIsModelPay(false);
        clearInterval(interval);
        dispatch(hasPayJob(id));
        return;
      }

      const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(
        2,
        "0"
      );
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(
        2,
        "0"
      );

      setTimeLeftToday(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResetQR = () => {
    setTimestamp(Date.now());
    setTimeLeft(255);
  };

  const [isModelPay, setIsModelPay] = useState(false);
  const { id } = useParams();
  const job = useAppSelector(selectJobById);
  const appCount = useAppSelector(selectApplicationCount);
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
    dispatch(applicationCount(id));
  }, [id]);
  useEffect(() => {
    if (!isModelPay) return;

    const timeout = setTimeout(() => {
      const interval = setInterval(async () => {
        try {
          const { data }: { data: Transaction } = await axios.get(
            "https://script.google.com/macros/s/AKfycbwBVsKxovVRO7FZ08nhZD083RNwIxC-L0hUyuG217Mb1y_JdOcj9yR1rtitYj6Gim8i/exec"
          );
          const now = new Date();
          const createdAt = new Date(data.createdAt.replace(" ", "T"));

          const diffInMinutes = Math.abs(
            (now.getTime() - createdAt.getTime()) / 60000
          );
          if (
            data.description === "Thanh toan dich vu xem so" &&
            data.amount === 10000 &&
            diffInMinutes < 1
          ) {
            clearInterval(interval);
            setIsModelPay(false);
            notification.success({
              message: "Thanh toán thành công",
              description: "Bạn đã mở quyền xem số người ứng tuyển.",
              duration: 3,
              placement: "topRight",
              pauseOnHover: false,
              onClose: () => {
                window.location.reload();
              },
            });
            dispatch(hasPayJob(id));
          }
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
        }
      }, 3000);

      return () => clearInterval(interval);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isModelPay]);

  const [openLogin, setOpenLogin] = useState(false);

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

  const MY_BANK = {
    BANK_ID: "MB",
    ACCOUNT_ID: "0382285203",
  };

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
            <div className="body-xl font-bold ">
              {job?.title}
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
            <div className="flex items-center gap-3">
              {job?.hasPaidAccess ? (
                <div className="flex flex-row items-center gap-1 border border-primary text-primary  px-2 py-1 rounded-lg">
                  <Icon
                    icon="fluent:people-queue-20-filled"
                    width="17"
                    height="17"
                    className="text-primary"
                  />
                  <span>
                    Số người đã ứng tuyển: {job?.countApplication}{" "}
                    <span className="font-bold">{timeLeftToday}</span>
                  </span>
                </div>
              ) : (
                <div
                  className="flex flex-row items-center cursor-pointer gap-1 border border-primary text-primary font-bold px-2 py-1 rounded-lg"
                  onClick={() => setIsModelPay(true)}
                >
                  <Icon
                    icon="mingcute:eye-fill"
                    width="17"
                    height="17"
                    className="text-primary"
                  />
                  <span>Xem số người đã ứng tuyển</span>
                </div>
              )}
              <Modal
                centered
                title={
                  <h1 className="text-2xl text-center">
                    Thanh toán dịch vụ:{" "}
                    <span className="text-primary">
                      Xem số người đã ứng tuyển
                    </span>
                  </h1>
                }
                open={isModelPay}
                onCancel={() => setIsModelPay(false)}
                width={900}
                footer={null}
              >
                <div className="flex gap-3 py-5">
                  <div className="flex flex-col w-[38%] gap-3">
                    <div className="border border-primary rounded-2xl p-5 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="ph:seal-check-fill"
                          width="21"
                          height="21"
                          className="text-primary"
                        />
                        <span className="text-lg font-bold">Quyền lợi</span>
                      </div>
                      <div>
                        Xem số người đã ứng tuyển của việc làm{" "}
                        <span className="font-bold text-primary">
                          {job?.title}
                        </span>{" "}
                        đến hết ngày {dayjs().format("DD/MM/YYYY")}
                      </div>
                    </div>
                    <div className="border border-primary rounded-2xl p-5 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="ri:money-dollar-circle-fill"
                          width="24"
                          height="24"
                          className="text-primary"
                        />
                        <span className="text-lg font-bold">
                          Số tiền thanh toán
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-primary text-center">
                        10.000 VND
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="w-[60%] border border-primary rounded-2xl p-5 flex flex-col gap-3">
                    <div className="font-semibold text-lg text-center">
                      Sử dụng{" "}
                      <span className="font-bold text-primary">
                        Ứng dụng ngân hàng
                      </span>{" "}
                      để thanh toán
                    </div>
                    <div className="bg-[#f2f4f5] flex flex-row gap-5 p-3 rounded-xl ">
                      <div className="flex flex-col gap-3 w-[12rem]">
                        <div className="relative flex items-center justify-center">
                          <img
                            key={timestamp}
                            src={`https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_ID}-compact.png?amount=10000&addInfo=Thanh toan dich vu xem so&t=${timestamp}`}
                            className={`w-[150px] h-[150px] transition  rounded-xl duration-300 ${
                              timeLeft <= 0 ? "opacity-40 blur-sm" : ""
                            }`}
                            alt="QR code"
                          />

                          {timeLeft <= 0 && (
                            <div
                              onClick={handleResetQR}
                              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
                            >
                              <div className="bg-white rounded-full p-33 shadow-lg hover:bg-gray-100 transition p-1">
                                <Icon
                                  icon="tabler:reload"
                                  width="24"
                                  height="24"
                                />
                              </div>
                              <p className="mt-1 text-sm font-medium text-gray-700">
                                Bấm để tạo lại
                              </p>
                            </div>
                          )}
                        </div>
                        {timeLeft <= 0 ? (
                          <p className="text-center text-red-500">
                            Mã QR đã hết hạn
                          </p>
                        ) : (
                          <p className="text-center text-gray-500">
                            Tự động hết hạn sau:{" "}
                            <span className="text-red-500">{timeLeft}s</span>
                          </p>
                        )}
                      </div>

                      <div className="font-bold text-gray-500 flex flex-col gap-3">
                        <p>Hướng dẫn thanh toán</p>
                        <div>
                          <span className="rounded-full bg-gray-200 px-2 text-xs py-1 mr-2">
                            1
                          </span>
                          Mở ứng dụng ngân hàng trên điện thoại
                        </div>
                        <div>
                          <span className="rounded-full bg-gray-200 px-2 text-xs py-1 mr-2">
                            2
                          </span>
                          Chọn “Quét mã” để quét mã QR
                        </div>
                        <div>
                          <span className="rounded-full bg-gray-200 px-2 text-xs py-1 mr-2">
                            3
                          </span>
                          Chọn “Xác nhận” để thanh toán
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

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
                <Button
                  className="w-full"
                  onClick={() => {
                    const isLoggedIn = Boolean(
                      localStorage.getItem("TimViec_ACCESS_TOKEN")
                    );
                    if (!isLoggedIn) {
                      setOpenLogin(true);
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                  disabled={appCount >= 3}
                >
                  {appCount >= 3 ? (
                    "Đã ứng tuyển tối đa 3 lần"
                  ) : appCount > 0 ? (
                    <>
                      <Icon
                        icon="material-symbols:replay"
                        width="24"
                        height="24"
                      />
                      Ứng tuyển lại
                    </>
                  ) : (
                    <>
                      <Icon
                        icon="mingcute:send-plane-line"
                        width="24"
                        height="24"
                      />
                      Ứng tuyển ngay
                    </>
                  )}
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
                              disabled={uploadFile}
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
                    ? dayjs(job.expiredAt).format("DD/MM/YYYY")
                    : ""}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    const isLoggedIn = Boolean(
                      localStorage.getItem("TimViec_ACCESS_TOKEN")
                    );
                    if (!isLoggedIn) {
                      setOpenLogin(true);
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                  disabled={appCount >= 3}
                >
                  {appCount >= 3 ? (
                    "Đã ứng tuyển tối đa 3 lần"
                  ) : appCount > 0 ? (
                    <>
                      <Icon
                        icon="material-symbols:replay"
                        width="24"
                        height="24"
                      />
                      Ứng tuyển lại
                    </>
                  ) : (
                    <>
                      <Icon
                        icon="mingcute:send-plane-line"
                        width="24"
                        height="24"
                      />
                      Ứng tuyển ngay
                    </>
                  )}
                </Button>
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
      <Login
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        switchToRegister={() => {
          setOpenLogin(false);
        }}
      />
    </div>
  );
};

export default JobDetail;
