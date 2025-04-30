import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../store";
import { selectProvinces } from "../store/app/selectors";
import { selectIndustryList } from "../store/industry/selector";

export const useSearchFilters = () => {
    const location = useLocation();
    const industries = useAppSelector(selectIndustryList);
    const provinces = useAppSelector(selectProvinces);
    
  
    return useMemo(() => {
      const params = new URLSearchParams(location.search);
      const inds = params.get("industries")?.split(",").map(Number) || [];
      const pros = params.get("provinces")?.split(",").map(Number) || [];
      const kw = params.get("keyword") || "";

  
      const selectedIndustry = industries.find((ind) => ind.id === inds[0]);
      const selectedProvince = provinces.find((prov) => prov.code === pros[0]);
      const keyword = kw || undefined;
  
      return {keyword, selectedIndustry, selectedProvince };
    }, [location.search, industries, provinces]);
  };
