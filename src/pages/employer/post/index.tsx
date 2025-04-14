import { Tooltip } from "antd";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { useMemo } from "react";
import { times } from "lodash";
import { faker } from "@faker-js/faker";
import { ColumnType } from "antd/es/table";
import Table from "../../../components/Table";
import { formatDate } from "../../../utils/date";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../utils/routes";

const ManagePost = () => {
  const navigate=useNavigate();
  const data = useMemo<any>(() => {
    return times(20, (index) => ({
      id: faker.string.uuid(),
      numerical: index + 1,
      name: faker.person.fullName(),
      expiredAt: faker.date.recent().toISOString(),
      view: faker.number.int({ min: 1000000, max: 10000000 }),
      apply: faker.number.int({ min: 1000000, max: 10000000 }),
    }));
  }, []);
  const columns = useMemo<ColumnType<typeof data>[]>(
    () => [
      {
        title: "Hiển thị",
        key: "numerical",
        dataIndex: "numerical",
      },
      {
        title: "Tên tin đăng",
        key: "name",
        dataIndex: "name",
      },

      {
        title: "Thời hạn",
        key: "expiredAt",
        dataIndex: "expiredAt",
        render: (createdAt) => formatDate(createdAt),
      },
      {
        title: "Lượt xem",
        key: "view",
        dataIndex: "view",
      },
      {
        title: "Lượt ứng tuyển",
        key: "apply",
        dataIndex: "apply",
      },
      {
        title: "Hành động",
        key: "action",
        dataIndex: "action",
        render: () => (
          <div className="flex items-center gap-2">
            <Tooltip title="Ẩn">
              <Button size="small" iconOnly variant="soft">
                <Icon icon="mdi:eye" />
              </Button>
            </Tooltip>
            <Tooltip title="Xem mặt vé">
              <Button size="small" iconOnly variant="soft">
                <Icon icon="mdi:ticket" />
              </Button>
            </Tooltip>
            <Tooltip title="Tin nhắn">
              <Button size="small" iconOnly variant="soft">
                <Icon icon="mdi:message-text" />
              </Button>
            </Tooltip>
            <Tooltip title="Gửi E-Mail">
              <Button size="small" iconOnly variant="soft">
                <Icon icon="mdi:email" />
              </Button>
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div>
      <Button size="small" 
      onClick={()=>navigate(routes.EMPLOYER_CREATEPOST)}
      >
        <Icon icon="mingcute:add-line" width="15" height="15" />
        Đăng tin ngay
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        filterItems={[
          
          {
            type: 'select',
            span: 4,
            key: 'display',
            props: {
              options: times(2, (index) => ({
                label: faker.helpers.arrayElement([
                  'Hiển thị',
                  'Ẩn',
                ]),
                value: index,
              })),
              placeholder: 'Hiển thị',
            },
          },
          {
            type: "textField",
            span: 8,
            key: "name",
            props: {
              placeholder: "Tìm kiếm tên tin đăng,...",
            },
          },
          {
            type: "select",
            span: 4,
            key: "status",
            props: {
              options: [
                { label: "Tất cả trạng thái", value: 0 },
                { label: "Chờ duyệt", value: 1 },
                { label: "Đã duyệt", value: 2 },
                { label: "Không duyệt", value: 3 },
                { label: "Đã hủy", value: 4 },
              ],
              placeholder: "Tất cả trạng thái",
            },
          },
          
          {
            type: 'select',
            span: 4,
            key: 'limit',
            props: {
              options: times(2, (index) => ({
                label: faker.helpers.arrayElement([
                  'Hết hạn',
                  'Còn hạn',
                ]),
                value: index,
              })),
              placeholder: 'Thời hạn',
            },
          },
          {
            type: 'blank',
            span: 4,
            key: 'actions',
            children: (
              <div className="-mt-6 ">
                <Tooltip title="Xuất Excel">
                  <Button size="small" variant="filled" color="primary">
                    <span>Tải xuống</span>
                    <Icon icon="mdi:file-excel" />
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
