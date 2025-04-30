import { Modal, Switch, Tooltip } from "antd";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { useEffect, useMemo, useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { ColumnType } from "antd/es/table";
import Table from "../../../components/Table";
import { formatDate } from "../../../utils/date";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../utils/routes";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectJobs } from "../../../store/job/selector";
import { IJob } from "../../../interfaces/job";
import { deleteJob, getJobsByCompanyId, updateStatusJob } from "../../../store/job/action";
import dayjs from "dayjs";

const ManagePost = () => {
  const navigate = useNavigate();
  const jobs = useAppSelector(selectJobs);
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState({
    active: undefined,
    title: "",
    limit: undefined,
  });
  useEffect(() => {
dispatch(getJobsByCompanyId());
  },[]);
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchActive =
        filters.active === undefined ? true : job.active === filters.active;
      // Lọc theo tên tin đăng
      const matchTitle = filters.title
        ? job.title?.toLowerCase().includes(filters.title.toLowerCase())
        : true;
      // Lọc theo trạng thái hết hạn / còn hạn
      let matchLimit = true;
      if (filters.limit !== undefined) {
        const isExpired = job.expiredAt
          ? dayjs(job.expiredAt).isBefore(dayjs(), "day")
          : false;
        matchLimit = filters.limit === 0 ? isExpired : !isExpired;
      }
      return matchActive && matchTitle && matchLimit;
    });
  }, [jobs, filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const columns = useMemo<ColumnType<IJob>[]>(
    () => [
      {
        title: "Hiển thị",
        key: "active",
        dataIndex: "active",
        render: (active: boolean, record: IJob) => (
          <Switch
            size="small"
            checked={active}
            onChange={() => {
              dispatch(updateStatusJob(record.id));
            }}
            disabled={
              record.expiredAt
                ? dayjs(record.expiredAt).isBefore(dayjs(), "day")
                : false
            }
          />
        ),
        align: "center",
        className: "w-[80px]",
      },
      {
        title: "Tên tin đăng",
        key: "title",
        dataIndex: "title",
        className: "w-[300px]",
      },

      {
        title: "Thời hạn",
        key: "expiredAt",
        dataIndex: "expiredAt",
        render: (createdAt) => formatDate(createdAt),
      },
      {
        title: "Lượt xem",
        key: "viewCount",
        dataIndex: "viewCount",
        align: "center",
      },
      {
        title: "Lượt ứng tuyển",
        key: "countApplication",
        dataIndex: "countApplication",
        align: "center",
      },
      {
        title: "Hành động",
        key: "action",
        dataIndex: "action",
        align: "center",
        render: (_: any, record: IJob) => (
          <div className="flex items-center justify-center gap-2">
        
            <Tooltip title="Xóa tin đăng">
              <Button
                size="small"
                iconOnly
                variant="soft"
                className="hover:bg-red-100"
                onClick={() => showDeleteConfirm(record.id)}
              >
                <Icon icon="material-symbols:delete" className="text-red-500" />
              </Button>
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );

  const showDeleteConfirm = (jobId: number) => {
    Modal.confirm({
      title: "Xác nhận xóa tin đăng?",
      content: "Bạn có chắc chắn muốn xóa tin đăng này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        dispatch(deleteJob(jobId));
      },
      centered: true,
    });
  };

  const handleExport = () => {
    exportToExcel(filteredJobs);
  };

  const exportToExcel = async (data: IJob[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách tin đăng");

    worksheet.columns = [
      { header: "#", key: "numerical", width: 5 },
      { header: "Tên tin đăng", key: "title", width: 30 },
      { header: "Thời hạn", key: "expiredAt", width: 20 },
      { header: "Lượt xem", key: "viewCount", width: 20 },
      { header: "Lượt ứng tuyển", key: "countApplication", width: 20 },
    ];

    data.forEach((item, index) => {
      worksheet.addRow({
        numerical: index + 1,
        title: item.title,
        expiredAt: item.expiredAt ? formatDate(item.expiredAt) : "Chưa có",
        viewCount: item.viewCount,
        countApplication: item.countApplication,
      });
    });

    worksheet.getRow(1).font = { bold: true };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "DanhSachTinDang.xlsx");
  };
  return (
    <div>
      <Button size="small" onClick={() => navigate(routes.EMPLOYER_CREATEPOST)}>
        <Icon icon="mingcute:add-line" width="15" height="15" />
        Đăng tin ngay
      </Button>
      <Table
        title="Danh sách tin đăng"
        dataSource={filteredJobs}
        columns={columns}
        rowKey="id"
        filterItems={[
          {
            type: "select",
            span: 4,
            key: "active",
            props: {
              options: [
                { label: "Hiển thị", value: true },
                { label: "Ẩn", value: false },
              ],
              placeholder: "Hiển thị",
              onChange: (value: boolean) => handleFilterChange("active", value),
              allowClear: true,
            },
          },
          {
            type: "textField",
            span: 12,
            key: "title",
            props: {
              placeholder: "Tìm kiếm tên tin đăng,...",
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange("title", e.target.value),
            },
          },

          {
            type: "select",
            span: 4,
            key: "limit",
            props: {
              options: [
                { label: "Hết hạn", value: 0 },
                { label: "Còn hạn", value: 1 },
              ],
              placeholder: "Thời hạn",
              onChange: (value: number) => handleFilterChange("limit", value),
              allowClear: true,
            },
          },
          {
            type: "blank",
            span: 4,
            key: "actions",
            children: (
              <div className="-mt-6 ">
                <Tooltip title="Tải danh sách">
                  <Button
                    size="small"
                    variant="filled"
                    color="primary"
                    onClick={() => handleExport()}
                  >
                    <Icon
                      icon="material-symbols:download"
                      width="15"
                      height="15"
                    />
                    <span>Tải xuống</span>
                  </Button>
                </Tooltip>
              </div>
            ),
          },
        ]}
      ></Table>
    </div>
  );
};

export default ManagePost;
