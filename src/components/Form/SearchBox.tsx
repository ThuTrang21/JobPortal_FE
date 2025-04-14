import { Button, Select } from "antd";
import { Icon } from "../Icon";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store";

import { selectIndustryList } from "../../store/industry/selector";
import { selectProvinces } from "../../store/app/selectors";
import { getProvince } from "../../store/app/actions";

const SearchBox = () => {

  const dispatch = useAppDispatch();
  const industries = useAppSelector(selectIndustryList);
    const provinces=useAppSelector(selectProvinces);

  const industryOptions = industries.map((industry) => ({
    value: industry.id,
    label: industry.name,
  }));
  const provinceOptions = provinces.map((province) => ({
    value: province.name,
    label: province.name,
  }));

    useEffect(() => {

      dispatch(getProvince());
    }, []);

  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);

  return (
    <div className="search-box-version2" style={{ zIndex: 1 }}>
      <form className="" autoComplete="off">
        <div className="w-full flex items-center text-sm relative bg-white p-2 rounded-md shadow-md">
          <div className="w-[30%] bg-white h-5 text-grey-50 relative">
            <div className="w-full h-full flex items-center justify-center relative pl-2">
              <Icon icon="material-symbols:search" width="24" height="24" />
              <input
                type="text"
                name="q"
                className="w-full focus:outline-none focus:text-black p-4"
                placeholder="Nhập vị trí muốn ứng tuyển"
              ></input>
            </div>
          </div>
          <div className="w-[30%] bg-white text-black border-r border-l p-3">
            <div className="w-full h-full flex items-center justify-center relative gap-2">
              <Icon icon="uil:bag" width="24" height="24" />
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                options={industryOptions}
                placeholder="Lọc theo nghề nghiệp..."
                maxTagCount={1}
                value={selectedIndustries}
                onChange={setSelectedIndustries}
                variant="borderless"
              />
            </div>
          </div>
          <div className="w-[30%] bg-white text-black border-r border-l p-3">
            <div className="w-full h-full flex items-center justify-center relative gap-2">
              <Icon icon="icon-park-outline:local" width="24" height="24" />
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                options={provinceOptions}
                placeholder="Lọc theo vị trí..."
                maxTagCount={1}
                value={selectedProvince}
                onChange={setSelectedProvince}
                variant="borderless"
              />
            </div>
          </div>
          <div className="w-[180px] bg-pri-100 !h-10 cursor-pointer top-0 flex rounded-[6px] btn-box px-2">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="text-white font-medium flex items-center justify-center w-full"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
