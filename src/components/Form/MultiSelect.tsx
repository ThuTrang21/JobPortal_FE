import { useMemo } from "react";
import Select, { MultiValue, components } from "react-select";
import { useAppSelector } from "../../store";
import { selectIndustryList } from "../../store/industry/selector";
import { MultiSelectProps, OptionType } from "../../interfaces/common";

const MultiSelect = ({ value, onChange }: MultiSelectProps) => {
  const industries = useAppSelector(selectIndustryList);

  // Chuyển đổi danh sách ngành thành format của react-select
  const options = useMemo(
    () =>
      industries.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      })),
    [industries]
  );

  // Chuyển đổi value từ props sang format của react-select
  const selectedOptions = useMemo(
    () =>
      options.filter((opt) => (value ?? []).some((v) => v.id === Number(opt.value))),
    [value, options]
  );

  // Xử lý khi thay đổi lựa chọn
  const handleChange = (selected: MultiValue<OptionType>) => {
    const newValues = selected.map((item) => ({ id: Number(item.value) , name: item.label }));
    onChange(newValues);
  };

  // Hiển thị số lượng lĩnh vực đã chọn trong ô select
  const CustomValueContainer = ({ children, getValue, ...props }: any) => {
    const selectedCount = getValue().length;
    return (
      <components.ValueContainer {...props}>
        {selectedCount > 0 ? `${selectedCount} lĩnh vực` : children}
      </components.ValueContainer>
    );
  };

  // Ẩn các tag trong hộp select
  const CustomMultiValue = () => null;

  return (
    <div>
      {/* Select Component */}
      <Select
        isMulti
        options={options}
        value={selectedOptions} // Sử dụng selectedOptions đã convert từ value props
        onChange={handleChange}
        placeholder="Chọn lĩnh vực"
        isClearable={false}
        closeMenuOnSelect={false}
        className="border border-gray-300 rounded-md"
        components={{
          ValueContainer: CustomValueContainer,
          MultiValue: CustomMultiValue,
        }}
      />

      {/* Danh sách các lĩnh vực đã chọn hiển thị dạng tag */}
      <div className="mt-2 flex flex-col gap-2">
        {selectedOptions.map((item) => (
          <div
            key={item.value}
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm flex items-center justify-between"
          >
            {item.label}
            <button
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() =>
                onChange(value.filter((v) => v.id !== Number(item.value)))
              }
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
