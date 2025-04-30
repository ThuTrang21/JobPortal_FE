import {
  Breadcrumb,
  Checkbox,
  Col,
  Divider,
  InputNumber,
  Radio,
  Row,
  Skeleton,
  Tag,
} from "antd";
import SearchBox from "../../../components/Form/SearchBox";
import { routes } from "../../../utils/routes";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../../../components/Icon";
import { Button } from "../../../components/Button";
import { useAppSelector } from "../../../store";
import { selectJobFilter } from "../../../store/job/selector";
import { IJob, JobFilters } from "../../../interfaces/job";

export const Jobs = () => {
  const jobs = useAppSelector(selectJobFilter);
  const [showAll, setShowAll] = useState(false);

  const { keyword, selectedIndustry, selectedProvince } = useSearchFilters();
  const [selectedJob, setSelectedJob] = useState<IJob>();

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      title: <span className="font-bold text-primary">Trang chủ</span>,
      href: routes.HOME,
    },
  ];
  if (!keyword && !selectedIndustry && !selectedProvince) {
    breadcrumbItems.push({
      title: <span>Tuyển dụng 34.833 việc làm 2025 [Update 23/04/2025]</span>,
    });
  } else {
    if (selectedProvince || selectedIndustry || keyword) {
      breadcrumbItems.push({
        title: (
          <span className="text-primary font-bold">
            Việc làm {selectedProvince?.name || ""}
          </span>
        ),
        href: selectedProvince
          ? `/jobs?provinces=${selectedProvince.code}`
          : routes.HOME,
      });
    }
    if (selectedIndustry) {
      breadcrumbItems.push({
        title: (
          <span className={keyword ? "text-primary font-bold" : ""}>
            {selectedIndustry.name}
          </span>
        ),
        href: selectedIndustry
          ? `/jobs?industries=${selectedIndustry.id}`
          : routes.HOME,
      });
    }
    if (keyword) {
      breadcrumbItems.push({
        title: <span>{keyword}</span>,
      });
    }
  }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedJob !== undefined) {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 500); // Giả lập loading 0.5s
      return () => clearTimeout(timeout);
    }
  }, [selectedJob]);

  const [isDeal, setIsDeal] = useState(true);
  const [min, setMin] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);

  const handleInputChange = (value: number | null, type: "min" | "max") => {
    if (isDeal) setIsDeal(false);
    if (type === "min") setMin(value);
    else setMax(value);
  };

  const handleRadioChange = () => {
    setFilters((prev) => ({
      ...prev,
      isDeal: true,
      salaryMin: null,
      salaryMax: null,
    }));
    setMin(null);
    setMax(null);
  };
  const isButtonDisabled = min === null || max === null || min >= max;
  const isEqual = min !== null && max !== null && min === max;
  const isMaxInvalid = min !== null && max !== null && max < min;

  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        setIsScrolled(scrollTop > 0); // Nếu scroll > 0 thì xem như đã lướt
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [selectedJob]);

  const uniqueFieldNames = Array.from(
    new Set(jobs.map((job) => job.fieldName).filter(Boolean))
  );
  const displayedCategories = showAll
    ? uniqueFieldNames
    : uniqueFieldNames.slice(0, 5);

  const defaultFilters: JobFilters = {
    experience: "Tất cả",
    level: "Tất cả",
    salaryMin: null,
    salaryMax: null,
    isDeal: false,
    category: [],
    jobType: "Tất cả",
  };
  const [filters, setFilters] = useState<JobFilters>(defaultFilters);

  const handleDeleteFilters = () => {
    setFilters(defaultFilters);
    setMin(null);
    setMax(null);
  };

  const [filteredJobs, setFilteredJobs] = useState(jobs); // jobs là kết quả tìm kiếm ban đầu từ Redux

  useEffect(() => {
    let result = [...jobs];

    // Lọc theo kinh nghiệm
    if (filters.experience !== "Tất cả") {
      result = result.filter((job) => job.experience === filters.experience);
    }

    // Lọc theo danh mục
    if (filters.category.length > 0) {
      result = result.filter((job) => filters.category.includes(job.fieldName));
    }

    // Lọc theo cấp bậc
    if (filters.level !== "Tất cả") {
      result = result.filter((job) => job.jobLevel === filters.level);
    }

    // Lọc theo mức lương
    if (!filters.isDeal) {
      result = result.filter((job) => {
        const min = job.salaryMin;
        const max = job.salaryMax;
        return (
          (!filters.salaryMin || min <= filters.salaryMin) &&
          (!filters.salaryMax || max >= filters.salaryMax)
        );
      });
    } else {
      result = result.filter((job) => job.salaryType === "Thỏa thuận");
    }

    // Lọc theo hình thức
    if (filters.jobType !== "Tất cả") {
      result = result.filter((job) => job.jobType == filters.jobType);
    }

    setFilteredJobs(result);
  }, [filters, jobs]);

  return (
    <div className="wp-container pt-0">
      <div className="w-full lg:px-10 px-3 py-7 bg-[linear-gradient(355deg,_#a0d8ef80,_#00bfff)]">
        <SearchBox />
      </div>

      <div className="wp-container px-3 lg:px-12 m-auto max-w-full py-5">
        <div className="flex flex-col gap-2">
          <p className="font-bold">
            Tuyển dụng 34.761 việc làm [Update 23/04/2025]
          </p>
          <div>
            <Breadcrumb separator=">" items={breadcrumbItems} />
          </div>
        </div>
        <div className="flex flex-row justify-between py-7 w-full">
          {/* Lọc nâng cao */}
          {selectedJob === undefined && (
            <div className="w-[30%] mx-3 h-[calc(100vh-100px)] sticky top-[75px]">
              <div className="flex flex-row gap-4 justify-between">
                <div className="flex flex-row gap-2 justify-center">
                  <Icon
                    icon="fa6-solid:filter"
                    width="24"
                    height="24"
                    className="text-primary/80"
                  />
                  <span className="body-lg font-bold">Lọc nâng cao</span>
                </div>
                <div>
                  <Button variant="outlined" onClick={handleDeleteFilters}>
                    Xóa lọc
                  </Button>
                </div>
              </div>
              <Divider className="my-3" />
              <div
                style={{ scrollbarWidth: "thin" }}
                className="h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">Theo danh mục nghề</span>
                  {displayedCategories.map((category, index) => (
                    <Checkbox
                      key={index}
                      checked={filters.category.includes(category)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          setFilters((prev) => ({
                            ...prev,
                            category: [...prev.category, category],
                          }));
                        } else {
                          setFilters((prev) => ({
                            ...prev,
                            category: prev.category.filter(
                              (c) => c !== category
                            ),
                          }));
                        }
                      }}
                    >
                      {category}
                    </Checkbox>
                  ))}

                  {displayedCategories.length > 5 && (
                    <span
                      onClick={() => setShowAll(!showAll)}
                      className="text-primary cursor-pointer hover:underline"
                    >
                      {showAll ? "Ẩn bớt" : "Xem thêm"}
                    </span>
                  )}
                </div>

                <Divider className="my-3" dashed />
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">Kinh nghiệm</span>
                  <Radio.Group
                    value={filters.experience}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                  >
                    <Row gutter={[0, 8]}>
                      <Col span={12}>
                        <Radio value="Tất cả">Tất cả</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="Không yêu cầu">Không yêu cầu</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="Dưới 1 năm">Dưới 1 năm</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="1 năm">1 năm</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="2 năm">2 năm</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="3 năm">3 năm</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="4 năm">4 năm</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="5 năm">5 năm</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="Trên 5 năm">Trên 5 năm</Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </div>
                <Divider className="my-3" dashed />
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">Cấp bậc</span>

                  <Radio.Group
                    value={filters.level}
                    className="flex flex-col gap-2"
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, level: e.target.value }))
                    }
                  >
                    <Radio value="Tất cả">Tất cả</Radio>
                    <Radio value="Thực tập sinh">Thực tập sinh</Radio>
                    <Radio value="Nhân viên">Nhân viên</Radio>
                    <Radio value="Trưởng nhóm">Trưởng nhóm</Radio>
                    <Radio value="Trưởng / Phó phòng">Trưởng / Phó phòng</Radio>
                    <Radio value="Quản lý / Giám sát">Quản lý / Giám sát</Radio>
                    <Radio value="Trưởng chi nhánh">Trưởng chi nhánh</Radio>
                    <Radio value="Phó giám đốc">Phó giám đốc</Radio>
                    <Radio value="Giám đốc">Giám đốc</Radio>
                  </Radio.Group>
                </div>
                <Divider className="my-3" dashed />
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">Mức lương</span>

                  <Radio checked={filters.isDeal} onChange={handleRadioChange}>
                    Thỏa thuận
                  </Radio>

                  <div className="flex gap-5 items-center">
                    <InputNumber
                      className={isEqual ? "border border-red-500" : ""}
                      placeholder="Từ"
                      onFocus={() =>
                        setFilters((prev) => ({ ...prev, isDeal: false }))
                      }
                      min={0}
                      value={min ?? undefined}
                      onChange={(value) =>
                        handleInputChange(value as number | null, "min")
                      }
                    />
                    <span>-</span>
                    <InputNumber
                      className={
                        isEqual || isMaxInvalid ? "border border-red-500" : ""
                      }
                      placeholder="Đến"
                      onFocus={() =>
                        setFilters((prev) => ({ ...prev, isDeal: false }))
                      }
                      min={0}
                      value={max ?? undefined}
                      onChange={(value) => {
                        handleInputChange(value as number | null, "max");
                      }}
                    />
                    <span className="font-bold">triệu</span>
                  </div>

                  <Button
                    className="mt-2"
                    disabled={isButtonDisabled}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        salaryMin: min,
                        salaryMax: max,
                        isDeal: false,
                      }))
                    }
                  >
                    Áp dụng
                  </Button>
                </div>

                <Divider className="my-3" dashed />
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">Hình thức làm việc</span>
                  <Radio.Group
                    value={filters.jobType}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        jobType: e.target.value,
                      }))
                    }
                  >
                    <Row gutter={[0, 8]}>
                      <Col span={12}>
                        <Radio value="Tất cả">Tất cả</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="Toàn thời gian">Toàn thời gian</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="Bán thời gian">Bán thời gian</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="Khac">Khác</Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </div>
              </div>
            </div>
          )}
          <div
            className={`flex flex-row gap-4 ${
              selectedJob !== undefined ? "w-full" : "w-[70%] "
            }`}
          >
            {/*  Danh sách việc làm */}
            <div
              className={`${
                selectedJob !== undefined ? "w-[40%]" : "w-full"
              } flex flex-col gap-4`}
            >
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`relative group cursor-pointer shadow-sm border rounded-md px-3 py-5 bg-[#eff7fb] hover:bg-[#f7fbfd] 
                    ${
                      selectedJob?.id === job.id
                        ? "border-primary border-[1px]"
                        : "hover:border-primary"
                    }
                  `}
                >
                  {selectedJob?.id === job.id && (
                    <div className="absolute top-1/2 -right-[11px] transform -translate-y-1/2">
                      <Icon
                        icon="teenyicons:right-solid"
                        width="15"
                        height="15"
                        className="text-primary"
                      />
                    </div>
                  )}
                  {/* <Skeleton loading={loading} active> */}
                  <Row gutter={16}>
                    <Col span={4}>
                      <img
                        src={job.company.avatar}
                        alt=""
                        className={`p-2 bg-white object-cover rounded-xl border border-gray-300 shadow-inner ${
                          selectedJob === undefined
                            ? "w-[105px] h-[105px] "
                            : "w-[65px] h-[65px] p-2 bg-white"
                        }`}
                      />
                    </Col>
                    <Col span={20}>
                      {" "}
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-row justify-between">
                          <div
                            className={`w-[87%] flex flex-col gap-2 ${
                              selectedJob !== undefined ? "w-full" : ""
                            }`}
                          >
                            <p className="text-[15px] font-bold line-clamp-2">
                              {job.title}
                            </p>
                            <p className="text-gray-400 line-clamp-1">
                              {job.company.name}
                            </p>
                            <div>
                              <Tag className="bg-gray-200 rounded-2xl">
                                {job.province}
                              </Tag>
                              <Tag className="bg-gray-200 rounded-2xl">
                                {job.experience}
                              </Tag>
                            </div>
                            <div
                              className={`flex flex-row gap-2 items-center justify-between mt-2 ${
                                selectedJob === undefined ? "hidden" : ""
                              }`}
                            >
                              <p className="font-bold text-primary">
                                {job.salaryType == "Thỏa thuận"
                                  ? "Thỏa thuận"
                                  : `${job.salaryMin} - ${job.salaryMax} triệu`}
                              </p>
                              <div className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
                                <Button
                                  size="small"
                                  variant="soft"
                                  style={{
                                    fontSize: "12px",
                                    padding: "2px 8px",
                                  }}
                                  onClick={() => {
                                    if (containerRef.current) {
                                      containerRef.current.scrollTop = 0;
                                    }
                                    setIsScrolled(false);
                                    setSelectedJob(job);
                                  }}
                                >
                                  Xem
                                  <Icon
                                    icon="ant-design:double-right-outlined"
                                    width="14"
                                    height="14"
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`flex flex-col justify-between gap-2 items-center ${
                              selectedJob !== undefined ? "hidden" : "w-[20%] "
                            }`}
                          >
                            <p className="font-bold text-primary">
                              {job.salaryType == "Thỏa thuận"
                                ? "Thỏa thuận"
                                : `${job.salaryMin} - ${job.salaryMax} triệu`}
                            </p>
                            <div className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
                              <Button
                                size="small"
                                variant="soft"
                                style={{
                                  fontSize: "12px",
                                  padding: "8px 10px",
                                  borderRadius: "21px",
                                }}
                                onClick={() => setSelectedJob(job)}
                              >
                                Xem nhanh
                                <Icon
                                  icon="ant-design:double-right-outlined"
                                  width="14"
                                  height="14"
                                />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <Divider className="my-1" />
                        <div className="flex flex-row gap-2 items-center justify-between">
                          <p className="text-gray-400 text-[13px]">
                            {job.fieldName} | {job?.jobRoleName}
                          </p>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-gray-400 text-[13px] group-hover:hidden ${
                                selectedJob !== undefined ? "hidden" : ""
                              }`}
                            >
                              Đăng {job.postedTimeAgo}
                            </span>
                            <div
                              className={`${
                                selectedJob !== undefined ? "hidden" : ""
                              } h-[36px]`}
                            >
                              <div className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
                                <Button
                                  size="small"
                                  variant="filled"
                                  style={{
                                    fontSize: "12px",
                                    padding: "8px 13px",
                                  }}
                                  className="rounded-3xl hidden group-hover:block"
                                >
                                  Ứng tuyển
                                </Button>
                              </div>
                            </div>
                            <Button
                              size="small"
                              variant="outlined"
                              style={{
                                fontSize: "12px",
                                padding: "8px",
                                borderRadius: "21px",
                              }}
                            >
                              <Icon
                                icon="mdi:heart-outline"
                                width="14"
                                height="14"
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {/* </Skeleton> */}
                </div>
              ))}
            </div>
            {/* Xem nhanh việc làm */}
            {selectedJob !== undefined && (
              <div className="w-[60%] bg-white rounded-2xl  h-[84vh] overflow-hidden sticky top-[75px]">
                <div
                  className={`px-6 py-5 border border-b-gray-100 ${
                    !isScrolled ? "" : "shadow-md"
                  }`}
                >
                  <div className="flex flex-row gap-4 justify-between items-center mb-5 ">
                    <p
                      className={`font-bold text-[20px]  ${
                        !isScrolled ? "line-clamp-3" : "line-clamp-1"
                      }`}
                    >
                      {selectedJob?.title}
                    </p>
                    <Button
                      variant="softOutline"
                      onClick={() => {
                        if (containerRef.current) {
                          containerRef.current.scrollTop = 0;
                        }
                        setIsScrolled(false);
                        setSelectedJob(undefined);
                      }}
                      className="rounded-full p-3"
                    >
                      <Icon icon="iwwa:delete" width="17" height="17" />
                    </Button>
                  </div>
                  {!isScrolled && (
                    <div className="flex flex-row gap-4 items-center mb-5 justify-between">
                      <div>
                        <Tag className="bg-gray-100 rounded-md">
                          {selectedJob?.province}
                        </Tag>
                        <Tag className="bg-gray-100 rounded-md">
                          {selectedJob?.experience}
                        </Tag>
                      </div>
                      <div className="flex flex-row items-center">
                        <p className="hover:underline text-primary cursor-pointer text-[15px]">
                          Xem chi tiết
                        </p>
                        <Icon
                          icon="mingcute:right-fill"
                          width="17"
                          height="17"
                          className="text-primary"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-row justify-between items-center">
                    <div
                      className={`flex flex-row gap-2 items-center justify-center ${
                        isScrolled ? "w-[50%]" : "w-full"
                      }`}
                    >
                      <Button variant="filled" className="w-[90%]">
                        Ứng tuyển ngay
                      </Button>
                      <Button variant="softOutline">
                        <Icon icon="mdi:heart-outline" width="19" height="19" />
                      </Button>
                    </div>
                    {isScrolled && (
                      <div className="flex flex-row items-center">
                        <p className="hover:underline text-primary cursor-pointer text-[15px]">
                          Xem chi tiết
                        </p>
                        <Icon
                          icon="mingcute:right-fill"
                          width="17"
                          height="17"
                          className="text-primary"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  ref={containerRef}
                  className={`px-6 mt-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white h-[calc(73vh-160px)] overflow-y-auto flex flex-col justify-between gap-5 ${
                    isScrolled ? "h-[calc(73vh-100px)]" : ""
                  }`}
                >
                  <div className="flex flex-col gap-3 ">
                    <div>
                      <h3 className="body-lg text-24 font-semibold pb-1">
                        Mô tả công việc
                      </h3>
                      <ul className="list-disc pl-10 text-gray-700">
                        {selectedJob?.description
                          ?.split("\n")
                          .map((line: string, index: number) => (
                            <li key={index} className="list-disc ml-5">
                              {line}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="body-lg text-24 font-semibold pb-1">
                        Yêu cầu ứng viên
                      </h3>
                      <ul className="list-disc pl-10 text-gray-700">
                        {selectedJob?.requirement
                          .split("\n")
                          .map((line: string, index: number) => (
                            <li key={index} className="list-disc ml-5">
                              {line}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="body-lg text-24 font-semibold pb-1">
                        Quyền lợi
                      </h3>
                      <ul className="list-disc pl-10 text-gray-700">
                        {selectedJob?.benefit
                          .split("\n")
                          .map((line: string, index: number) => (
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
                        {selectedJob?.province} : {selectedJob?.address}
                        {", "}
                        {selectedJob?.district}
                        {", "}
                        {selectedJob?.province}
                      </li>
                    </div>
                    <div>
                      <h3 className="body-lg text-24 font-semibold pb-1">
                        Thời gian làm việc
                      </h3>
                      <ul className="list-disc pl-10 text-gray-700">
                        {selectedJob?.workingTime
                          .split("\n")
                          .map((line: string, index: number) => (
                            <li key={index} className="list-disc ml-5">
                              {line}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div className="px-5 py-4 bg-white rounded-lg border shadow-sd-12">
                    <Row gutter={[9, 16]}>
                      <Col span={4}>
                        <img
                          src={selectedJob?.company.avatar}
                          className="w-[70px] h-[70px] p-1 rounded-lg border border-gray-300 shadow-inner"
                        />
                      </Col>
                      <Col span={19}>
                        <Row gutter={[0, 16]}>
                          <Col span={24}>
                            <a className="body-lg font-bold line-clamp-1">
                              {selectedJob?.company.name}
                            </a>
                          </Col>
                          <Col span={1}>
                            <div className="text-slate-500">
                              <Icon
                                icon="rivet-icons:user-group-solid"
                                width="15"
                                height="15"
                              />
                            </div>
                          </Col>
                          <Col span={23}>
                            <p>{selectedJob?.company.companySize} nhân viên</p>
                          </Col>

                          <Col span={1}>
                            <div className="flex text-slate-500 gap-2 items-center">
                              <Icon
                                icon="mingcute:location-fill"
                                width="15"
                                height="15"
                              />
                            </div>
                          </Col>
                          <Col span={23}>
                            <p>{selectedJob?.company.address}</p>
                          </Col>
                        </Row>
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
