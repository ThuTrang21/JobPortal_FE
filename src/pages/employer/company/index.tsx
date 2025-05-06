import { Card, Col, Input, Row, Select } from "antd";
import { Button } from "../../../components/Button";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "../../../store";
import MultiSelect from "../../../components/Form/MultiSelect";
import { selectCompanyInfo } from "../../../store/company/selector";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateCompany } from "../../../store/company/action";

const companySizes = [
  { value: "1-9", label: "1-9 nhân viên" },
  { value: "10-24", label: "10-24 nhân viên" },
  { value: "25-99", label: "25-99 nhân viên" },
  { value: "100-499", label: "100-499 nhân viên" },
  { value: "500-1000", label: "500-1000 nhân viên" },
  { value: "1000+", label: "1000+ nhân viên" },
];

const CompanyInfor = () => {
  const company = useAppSelector(selectCompanyInfo);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: company?.name || "",
      taxCode: company?.taxCode || "",
      companySize: company?.companySize || "",
      address: company?.address || "",
      phone: company?.phone || "",
      industries: company?.industries || [],
      description: company?.description || "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Tên công ty không được bỏ trống"),
      taxCode: yup.string().required("Mã số thuế không được bỏ trống"),
      companySize: yup.string().required("Quy mô nhân sự không được bỏ trống"),
      address: yup.string().required("Địa chỉ không được bỏ trống"),
      industries: yup.array().min(1, "Lĩnh vực hoạt động không được bỏ trống"),
    }),
    onSubmit: (values) => {
      dispatch(updateCompany({data: values, id: company?.id}));
    
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <h3 className="body-xl font-bold mb-5">Thông tin công ty</h3>
        <Row gutter={[0, 16]}>
          <Col span={15}>
            <div>
              <h2 className="body-md font-bold text-gray-400 mb-4">
                Thông tin liên hệ
              </h2>
              <Row gutter={[0, 16]}>
                <Col span={6} className="flex items-center">
                  Mã số thuế<span className="text-red-500">*</span>
                </Col>
                <Col span={15}>
                  <Input
                    style={{ width: "100%" }}
                    name="taxCode"
                    value={formik.values.taxCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Col>

                <Col span={6} className="flex items-center">
                  Tên công ty <span className="text-red-500">*</span>
                </Col>
                <Col span={15}>
                  <Input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Col>

                <Col span={6} className="flex items-center">
                  Quy mô nhân sự<span className="text-red-500">*</span>
                </Col>
                <Col span={15}>
                  <Select
                    placeholder="Chọn"
                    style={{ width: "100%" }}
                    options={companySizes}
                    value={formik.values.companySize}
                    onChange={(value) =>
                      formik.setFieldValue("companySize", value)
                    }
                    onBlur={() => formik.setFieldTouched("companySize", true)}
                  />
                </Col>

                <Col span={6} className="flex items-center">
                  Địa chỉ<span className="text-red-500">*</span>
                </Col>
                <Col span={15}>
                  <TextArea
                    style={{ width: "100%" }}
                    rows={2}
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Col>

                <Col span={6} className="flex items-center">
                  Điện thoại cố định
                </Col>
                <Col span={15}>
                  <Input
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Col>

                <Col span={6} className="pt-2">
                  Lĩnh vực hoạt động
                </Col>
                <Col span={15}>
                  <MultiSelect
                    value={formik.values.industries}
                    onChange={(selectedValues) =>
                      formik.setFieldValue("industries", selectedValues)
                    }
                  />
                  {formik.errors.industries && formik.touched.industries && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.industries as string}
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={9} className="mt-1 flex flex-col gap-3">
          <h2 className="body-md font-bold text-gray-400">
                Giới thiệu công ty</h2>
                  <TextArea
                    style={{ width: "100%" }}
                    rows={14}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
          </Col>

        </Row>
        <Button className="mt-7 px-20 py-2" type="submit">
          Cập nhật
        </Button>
      </Card>
    </form>
  );
};

export default CompanyInfor;
