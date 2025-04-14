import bg from "/images/background.jpg";
import bg2 from "/images/bg2.png";
import bgSpotkight from "/images/bg-spotlight-banner-pc.png";
import SearchBox from "../../../components/Form/SearchBox";
import { Col, Row, Tag, Pagination, Card, Divider } from "antd";
import { Icon } from "../../../components/Icon";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { generatePath, Link } from "react-router-dom";
import { routes } from "../../../utils/routes";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectIndustryList } from "../../../store/industry/selector";
import { IField } from "../../../interfaces/industry";
import useHorizontalScroll from "../../../hooks/useHorizontalScroll";
import usePagination from "../../../hooks/usePagination";
import { selectCompanies } from "../../../store/company/selector";
import {
  getAllCompany,
  getCompaniesByIndustryId,
} from "../../../store/company/action";
import { getAllJobs, getJobsByIndustryId } from "../../../store/job/action";
import { selectJobs } from "../../../store/job/selector";

const Home = () => {
  const industries = useAppSelector(selectIndustryList);
  const companies = useAppSelector(selectCompanies);
  const jobs = useAppSelector(selectJobs);



  const dispatch = useAppDispatch();
  const [selectedIndustryC, setSelectedIndustryC] = useState(
    null as string | null
  );
  const [selectedIndustryJ, setSelectedIndustryJ] = useState(
    null as string | null
  );
  useEffect(() => {
    dispatch(getAllCompany());
    dispatch(getAllJobs());

  }, []);

  useEffect(() => {

    setJobPage(1);
    setCompanyPage(1);
  },[jobs,companies]);

  const [activeIndustry, setActiveIndustry] = useState<{
    name: string;
    fields: IField[];
  } | null>(null);

  const {
    paginatedItems: paginatedIndustries,
    currentPage,
    setCurrentPage,
  } = usePagination(industries, 5);

  const {
    paginatedItems: paginatedJobs,
    currentPage: jobPage,
    setCurrentPage: setJobPage,
  } = usePagination(jobs, 9);

  const {
    paginatedItems: paginatedCompanies,
    currentPage: companyPage,
    setCurrentPage: setCompanyPage,
  } = usePagination(companies, 9);

  const { containerRef: container1, handleScroll: scroll1 } =
    useHorizontalScroll();
  const { containerRef: container2, handleScroll: scroll2 } =
    useHorizontalScroll();
  return (
    <div>
      <div className="relative h-[15rem] w-auto overflow-hidden">
        <img src={bg} alt="Background" className="object-cover w-full h-full" />
      </div>
      <section className="px-3 lg:px-12 m-auto max-w-full relative ">
        <div className="wp-container search-container flex flex-col gap-5">
          <SearchBox />
          <div>
            {industries.slice(0, 7).map((industry) => (
              <Tag
                key={industry.name}
                color="blue"
                className="mx-2 px-5 rounded-full hover:bg-blue-100"
              >
                <a href="" className="flex flex-row gap-2">
                  <Icon icon="iconamoon:trend-up-thin" width="24" height="24" />
                  <span>{industry.name}</span>
                </a>
              </Tag>
            ))}
          </div>

          <div
            className="flex w-full gap-3 h-[17rem]"
            onMouseLeave={() => setActiveIndustry(null)}
          >
            {/* Menu Cha */}
            <div className="w-[29%] border p-4 bg-white shadow-md rounded-xl flex flex-col justify-between">
              <div>
                {paginatedIndustries.map((industry) => (
                  <div
                    key={industry.name}
                    onMouseEnter={() => setActiveIndustry(industry)}
                    className={`p-2 cursor-pointer rounded-md transition-all duration-200 ${
                      activeIndustry?.name === industry.name
                        ? "bg-blue-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex flex-row justify-between">
                      {industry.name}
                      <Icon icon="mingcute:right-line" width="14" height="14" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-end border-t-[1px]">
                {industries.length > 5 && (
                  <Pagination
                    current={currentPage}
                    pageSize={5}
                    total={industries.length}
                    onChange={setCurrentPage}
                    size="small"
                    className="mt-3 text-center"
                    simple={{ readOnly: true }}
                  />
                )}
              </div>
            </div>

            {/* Menu Con */}
            {activeIndustry ? (
              <div className="w-[70%] overflow-x-auto border p-7 bg-white shadow-md rounded-xl">
                {activeIndustry.fields.map((field, index) => (
                  <div>
                    <Row>
                      <Col span={6} className="font-bold">
                        {field.name}
                      </Col>
                      <Col span={18} className="flex flex-wrap gap-2 gap-y-4">
                        {field.jobRoles.map((jobrole) => (
                          <Tag
                            key={jobrole.id}
                            color="blue"
                            className="px-4 py-1"
                          >
                            {jobrole.name}
                          </Tag>
                        ))}
                      </Col>
                      {index !== activeIndustry.fields.length - 1 && (
                        <Divider />
                      )}
                    </Row>
                  </div>
                ))}
              </div>
            ) : (
              <img
                src={bg2}
                alt=""
                className="h-full object-cover w-[70%] border bg-white shadow-md rounded-xl"
              />
            )}
          </div>
        </div>
      </section>
      <section className="border-none bg-[#fbfdff] py-6 lg:px-12 max-w-full">
        <div className="wp-container px-3 lg:px-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col w-full gap-6">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2 min-w-max">
                  <Icon icon="emojione:fire" width="34" height="34" />
                  <p className="text-2xl leading-10 font-medium">
                    Việc làm tuyển gấp
                  </p>
                </div>
              </div>
              <div className="flex items-center w-full gap-2">
                <Button
                  onClick={() => {
                    scroll1(-100);
                  }}
                  className="rounded-full p-1"
                  variant="outlined"
                  color="primary"
                >
                  <Icon icon="bx:bx-chevron-left" width="24" height="24" />
                </Button>
                <div
                  className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth "
                  ref={container1}
                >
                  <Button
                    className="h-8 text-sm font-medium rounded-full transition-all min-w-max"
                    variant={
                      selectedIndustryJ === null ? "filled" : "softOutline"
                    }
                    onClick={() => {
                      setSelectedIndustryJ(null);
                      dispatch(getAllJobs());
                    }}
                  >
                    Tất cả
                  </Button>
                  {industries.map((industry, index) => (
                    <Button
                      key={index}
                      className="h-8 text-sm font-medium rounded-full transition-all min-w-max"
                      variant={
                        selectedIndustryJ === industry.name
                          ? "filled"
                          : "softOutline"
                      }
                      onClick={() => {
                        setSelectedIndustryJ(industry.name);
                        dispatch(getJobsByIndustryId(industry.id));
                      }}
                    >
                      {industry.name}
                    </Button>
                  ))}
                </div>
                <Button
                  className="rounded-full bg-[#F6F6F6] p-1"
                  onClick={() => {
                    scroll1(100);
                  }}
                  variant="outlined"
                  color="primary"
                >
                  <Icon icon="bx:bx-chevron-right" width="24" height="24" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-between relative min-h-[120px]">
              {/* Hiển thị danh sách công việc theo dạng Grid */}
              <div className="flex-grow">
                <Row gutter={[16, 16]}>
                  {paginatedJobs.map((job) => (
                    <Col key={job.id} xs={24} sm={12} md={8}>
                      <Link to={generatePath(routes.JOBSEEKER,{id:job.id})} target="_blank">
                        <Card className="h-full min-h-[160px] hover:border-primary cursor-pointer transition-transform duration-500 ease-in-out hover:shadow-lg transform hover:scale-105 will-change-transform">
                          <div className="flex flex-col gap-1 h-full min-h-[130px]">
                            <div className="flex gap-4 items-center">
                              <div className="flex flex-1 ">
                                <div className="inline-block relative group align-middle">
                                  <h3 className="font-medium text-base leading-6 line-clamp-2 overflow-hidden">
                                    {job?.title}
                                  </h3>
                                </div>
                              </div>
                              <Icon
                                icon="mdi:heart-outline"
                                className="text-primary"
                                width="24"
                                height="24"
                              />
                            </div>
                            <div className="flex gap-2 items-center">
                              <figure className="bg-white box-border rounded-md w-[64px] min-w-[64px] h-[64px] min-h-[64px]">
                                <img
                                  className="relative w-full h-full object-contain my-auto rounded-md p-1"
                                  src={job?.company?.avatar}
                                  alt=""
                                />
                              </figure>
                              <div className="flex flex-col gap-1">
                                <h3 className="text-[14px] leading-6 text-[#939295] line-clamp-1 ">
                                  {job?.company?.name}
                                </h3>
                                <div className="flex gap-1 pr-1 pl-[2px] items-center">
                                  <Icon
                                    icon="dashicons:money-alt"
                                    width="17"
                                    height="17"
                                  />
                                  <span className="text-[14px] leading-6 text-[#2C95FF]">
                                    {job.salaryType === "Thỏa thuận"
                                      ? "Thỏa thuận"
                                      : `${job.salaryMin} - ${job.salaryMax} triệu`}
                                  </span>
                                </div>
                                <div className="flex">
                                  <div className="flex gap-1 pr-1 pl-[2px] items-center relative province-tooltip">
                                    <Icon
                                      icon="mingcute:location-line"
                                      width="17"
                                      height="17"
                                    />
                                    <span className="text-se-neutral-80 text-14 leading-6 line-clamp-1 !whitespace-normal">
                                      {job.province}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Divider className="my-3" />
                          <div className="flex px-2">
                            <div className="flex flex-1 gap-[6px] items-center">
                              <div className="flex items-center gap-1">
                                <Icon icon="noto:fire" width="20" height="20" />
                                <span className="text-[12px] leading-[12px] mt-[2px] font-medium text-[#EF4444]">
                                  HOT
                                </span>
                              </div>
                            </div>
                            <div className="inline-block relative group align-middle">
                              <div className="flex pr-[2px] gap-1 items-center">
                                <Icon
                                  icon="material-symbols:history"
                                  width="20"
                                  height="20"
                                />
                                <span className="text-[12px] leading-6 text-[#414045]">
                                  {job.deadline}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Phân trang */}
              <div className="flex justify-center mt-6">
                <Pagination
                  current={jobPage}
                  pageSize={9}
                  total={jobs.length}
                  onChange={(page) => setJobPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-3 lg:px-12 m-auto max-w-full py-6">
        <div className="wp-container rounded-xl bg-white shadow-md ">
          <div
            className="px-4 h-[120px] w-auto bg-cover bg-center rounded-t-xl"
            style={{ backgroundImage: `url(${bgSpotkight})` }}
          >
            <div className="relative px-5 py-[13px] lg:px-[42px]">
              <div className="flex items-center gap-2">
                <span className="text-primary text-[17px] lg:text-[32px] font-bold">
                  Công ty nổi bật
                </span>
                <Icon
                  icon="mingcute:vip-2-fill"
                  width="27"
                  height="27"
                  className="text-[#FFD700]"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 mt-2">
                <div className="flex items-center gap-2 text-base">
                  <Icon
                    icon="fa-solid:money-check-alt"
                    width="22"
                    height="22"
                    className="text-[#28a745]"
                  />
                  <span className="text-sm">Chế độ phúc lợi hấp dẫn</span>
                </div>
                <div className="flex items-center gap-2 text-base">
                  <Icon
                    icon="fluent-color:ribbon-star-32"
                    width="22"
                    height="22"
                    className="text-[#28a745]"
                  />
                  <span className="text-sm">
                    Môi trường làm việc chuyên nghiệp
                  </span>
                </div>
                <div className="flex items-center gap-2 text-base">
                  <Icon
                    icon="fluent:clipboard-task-list-24-filled"
                    width="22"
                    height="22"
                    className="text-[#2d9fea]"
                  />
                  <span className="text-sm">
                    Doanh nghiệp uy tín, thông tin minh bạch
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center gap-1.5 overflow-hidden pt-[21px] px-7 ">
            <Button
              onClick={() => {
                scroll2(-200);
              }}
              className="rounded-full p-1"
              variant="outlined"
              color="primary"
            >
              <Icon icon="bx:bx-chevron-left" width="24" height="24" />
            </Button>
            <div
              className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth "
              ref={container2}
            >
              <Button
                className="h-8 text-sm font-medium rounded-full transition-all min-w-max"
                variant={selectedIndustryC === null ? "filled" : "softOutline"}
                onClick={() => {
                  setSelectedIndustryC(null);
                  dispatch(getAllCompany());
                }}
              >
                Tất cả
              </Button>
              {industries.map((industry) => (
                <Button
                  key={industry.id}
                  className="h-8 text-sm font-medium rounded-full transition-all min-w-max"
                  variant={
                    selectedIndustryC === industry.name
                      ? "filled"
                      : "softOutline"
                  }
                  onClick={() => {
                    setSelectedIndustryC(industry.name);
                    dispatch(getCompaniesByIndustryId(industry.id));
                  }}
                >
                  {industry.name}
                </Button>
              ))}
            </div>
            <Button
              className="rounded-full bg-[#F6F6F6] p-1"
              onClick={() => {
                scroll2(200);
              }}
              variant="outlined"
              color="primary"
            >
              <Icon icon="bx:bx-chevron-right" width="24" height="24" />
            </Button>
          </div>

          <div className="flex flex-col justify-between relative min-h-[120px] p-7 ">
            {/* Hiển thị danh sách công ty theo dạng Grid */}
            <div className="flex-grow">
              <Row gutter={[16, 16]}>
                {paginatedCompanies.map((company) => (
                  <Col key={company.id} xs={24} sm={12} md={8}>
                    <Card className="h-full min-h-[133px] hover:border-primary cursor-pointer transition-transform duration-500 ease-in-out hover:shadow-lg transform hover:scale-105 will-change-transform shadow-sm" size="small" >
                      <div className="flex gap-2">
                        <img
                          src={company?.avatar}
                          alt="spotlight employer"
                          className=" p-3 object-contain min-w-[64px] min-h-[64px] w-16 h-16"
                        />
                        <div className="flex-grow overflow-hidden">
                          <h3 className="font-medium text-sm leading-6 line-clamp-2 pb-2">
                            {company?.name}
                          </h3>
                          <div className="inline-flex items-center bg-[#F9F7FF] text-xs text-primary leading-4 font-medium rounded-full py-0.5 px-1 gap-1">
                            <Icon
                              icon="streamline:bag-suitcase-2-solid"
                              width="14"
                              height="14"
                            />
                            <span>{company?.jobCount} vị trí đang tuyển</span>
                          </div>
                          <div className="flex items-center text-xs leading-6 rounded-full py-0.5 px-1 gap-1">
                            <Icon
                              icon="mingcute:medal-line"
                              width="14"
                              height="14"
                            />
                            <span>{company?.companySize} nhân viên</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Phân trang */}
            <div className="flex justify-center mt-6">
              <Pagination
                current={companyPage}
                pageSize={9}
                total={companies.length}
                onChange={setCompanyPage}
                className="mt-6"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
