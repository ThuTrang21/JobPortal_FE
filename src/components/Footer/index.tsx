import { Icon } from "../Icon";

export const Footer = () => {
  return (
    <div className="relative flex flex-col justify-between w-full bg-[#0D47A1] text-white opacity-[90%] md:pb-0 pb-0">
      <div className="wp-container !max-w-[1320px] px-4">
        <div className="w-full pt-8 lg:pt-6 pb-4 lg:pb-6 px-4 lg:px-0 m-auto grid lg:grid-cols-2 grid-cols-1 lg:gap-x-24 select-none">
          <div>
            <div className="text-sm font-semibold lg:mb-3.5 mb-1">
              Về chúng tôi
            </div>
            <div className="text-xs leading-6 font-light text-small-footer select-text">
              <div className="font-semibold">
                ExampleCorp - Công Ty Cổ Phần Example Phòng 101, Tòa nhà 123
                Example Street, Phường Example, Quận Example, Hà Nội
                <br />
                Chi nhánh: Tầng 5, tòa nhà Example Tower, 456 Example Road,
                Thanh Xuân, Hà Nội.
                <br />
                Giấy phép hoạt động dịch vụ việc làm số:
                1234/2024/19/SLĐTBXH-VLATLĐ do Sở Lao Động Thương Binh & Xã Hội
                TP.HN cấp ngày 01/01/2024
                <br />
                Điện thoại: (028) 1234 5678 | (024) 8765 4321
                <br />
                Email hỗ trợ người tìm việc: support@example.com
                <br />
                Email hỗ trợ nhà tuyển dụng: hr@example.com
              </div>
            </div>
          </div>
          <div className="select-none w-full mt-6 lg:mt-0">
            <div className="flex text-xs lg:flex-row flex-col">
              <div className="lg:w-6/12 w-full leading-6 text-small-footer">
                <div className="text-sm font-semibold lg:mb-3.5 mb-1">
                  Thông tin
                </div>
                <div>
                  <a href="">Cẩm nang nghề nghiệp</a>
                  <br />
                  <a href="">Báo giá dịch vụ</a>
                  <br />
                  <a href="">Điều khoản và sử dụng</a>
                  <br />
                  <a href="">Quy định và bảo mật</a>
                  <br />
                  <a href="">Sơ đồ trang web</a>
                  <br />
                  <a href="">Chính sách dữ liệu cá nhân</a>
                  <br />
                  <a href="">Tuân thủ và sự đồng ý của khách hàng</a>
                </div>
              </div>
              <div className="lg:w-6/12 w-full mt-6 lg:mt-0">
                <div className="flex items-end">
                  <div className="flex-col w-full">
                    <div className="text-sm font-semibold mb-4">
                      Kết nối với chúng tôi
                    </div>
                    <div className="flex gap-3">
                      <a href="">
                        <Icon
                          icon="ic:baseline-facebook"
                          width="24"
                          height="24"
                        />
                      </a>
                      <a href="">
                        <Icon
                          icon="ic:baseline-tiktok"
                          width="24"
                          height="24"
                        />
                      </a>
                      <a href="">
                        <Icon icon="mdi:instagram" width="24" height="24" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-se-deluge w-11/12 lg:w-full m-auto"></div>
      <div className="flex w-full m-auto pb-6 pt-5 px-3 lg:px-0 !max-w-[1320px]">
        <span className="px-4 text-[#d3d8dd] my-auto text-10 h-3.5 font-semibold">
          © 2025 - Bản quyền thuộc về ThuTrang Group
        </span>
      </div>
    </div>
  );
};
