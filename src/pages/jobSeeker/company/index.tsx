import { Breadcrumb } from "antd";
import { routes } from "../../../utils/routes";
import bg_image from "/images/generic_2.jpg";
import { Icon } from "../../../components/Icon";

const CompanyDetail = () => {
  return (
    <div className="wp-container pt-0">
      <div className="w-full px-12 py-5">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <span className="font-bold text-primary">Trang chủ</span>,
              href: routes.HOME,
            },
            {
              title:
                "Thông tin công ty & tin tuyển dụng từ CÔNG TY CỔ PHẦN LUKLAK",
            },
          ]}
        />
      </div>
      <div className=" bg-white w-full">
        <div
          style={{ backgroundImage: `url(${bg_image})` }}
          className=" relative bg-no-repeat bg-center bg-cover m-auto w-full h-[192px] sm:rounded-b-2xl banner:w-[1376px] lg:h-[256px]"
        ></div>
      </div>
      <div className="w-full bg-white sm:pb-3">
        <div className="m-auto px-4 bg-no-repeat bg-white w-full h-auto pt-16 sm:h-[110px] sm:px-20 sm:pt-0 xl:px-0 xl:w-[1036px]">
          <div className="w-[120px] h-[120px] absolute right-1/2 top-[190px] select-none sm:rounded-2xl sm:right-auto sm:top-[260px] sm:bg-white lg:top-[300px]">
            <div className="relative rounded-2xl bg-white -right-1/2 sm:bg-transparent sm:left-0">
              <img
                className="w-[120px] h-[120px] p-[5px] rounded-2xl object-contain shadow-lg"
                src="https://cdn1.vieclam24h.vn/tvn/images/old_employer_avatar/images/bc5ddb0ec144952db46eee92d32c25fc_5f83f577b9037_1602483575.png"
              />
            </div>
          </div>
          <div className="sm:ml-32 sm:flex  sm:justify-between pb-6 flex-col p-3">
            <div className="text-center mb-2 max-w-[99%] xs:max-w-full sm:text-left sm:max-w-[85%]">
              <h1 className="text-xl font-bold text-se-neutral-80 break-words overflow-hidden Info_titleCompany__ZTGFZ">
                Công Ty Cổ Phần Dược Hậu Giang
              </h1>
            </div>
            <div className="sm:flex sm:items-center sm:h-6 lg:space-y-0 space-y-2">
              <div className="flex gap-2 items-center justify-center whitespace-nowrap sm:justify-start sm:max-w-[25%] sm:mr-2 sm:min-w-[120px] md:min-w-[150px]">
                <Icon icon="mdi:company" width="21" height="21" />
                <p className="text-sm text-se-neutral-100-n font-light">
                  20-10 nhân viên
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
