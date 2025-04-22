import {
  Table as AntTable,
  Card,
  Col,
  ColProps,
  Divider,
  Row,
  RowProps,
} from "antd";
import { ColumnType, TableProps } from "antd/es/table";
import { isEmpty, map, noop } from "lodash";
import TextField from "../Form/TextField";
import Select from "../Form/Select";
import DateRangePicker from "../Form/DateRangePicker";
import DatePicker from "../Form/DatePicker";
import { cn } from "../../utils/helpers";

type FilterItemType = "textField" | "select" | "date" | "dateRange" | "blank";

const filterComponents: {
  [x in FilterItemType]: React.FC<any> | any;
} = {
  textField: TextField,
  select: Select,
  date: DatePicker,
  dateRange: DateRangePicker,
  blank: noop,
};

interface ITableProps<T>
  extends Partial<
    Omit<
      TableProps,
      "columns" | "dataSource" | "pagination" | "className" | "title"
    >
  > {
  title?: string;
  filterWrapperProps?: Partial<Omit<RowProps, "children">>;
  columns?: ColumnType<T>[];
  dataSource?: T[];
  className?: string;
  filterItems?: ({
    type: FilterItemType;
    span: number;
    key: string;
    props?: any;
    children?: React.ReactNode;
  } & Partial<Omit<ColProps, "span" | "key" | "type" | "children">>)[];
}

const Table = <T,>({
  title,
  filterItems,
  filterWrapperProps,
  columns,
  dataSource,
  className,
  ...rest
}: ITableProps<T>) => {
  return (
    <div>
      <Card
        title={title}
        className="mt-3 !rounded-lg [&_.ant-card-body]:!p-3"
        size="small"
      >
        {/* #region filter */}
        <Row gutter={[12, 12]} {...filterWrapperProps} align="middle">
        
          {map(filterItems, ({ key, span, type, props, children, ...rest }) => {
            if (type === "blank")
              return (
                <Col key={key} span={span} {...rest}>
                  {children}
                </Col>
              );

            return (
              <Col key={key} span={span} {...rest}>
                {filterComponents[type](props)}
              </Col>
            );
          })}
          
        </Row>
      
        {/* #endregion */}
        <AntTable
          {...(rest as any)}
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: true }}
          className={cn(
            " [&_.ant-table-tbody_.ant-table-row:last-child_.ant-table-cell:first-child]:!rounded-bl-md [&_.ant-table-tbody_.ant-table-row:last-child_.ant-table-cell:last-child]:!rounded-br-md [&_.ant-table-thead_.ant-table-cell:first-child]:!rounded-tl-md [&_.ant-table-thead_.ant-table-cell:last-child]:!rounded-tl-md [&_.ant-table-thead_.ant-table-cell]:!text-xs [&_.ant-table-thead_th]:uppercase",
            className
          )}
          size="small"
          pagination={{
            pageSizeOptions: [10, 20, 50, 100],
            showSizeChanger: true,
          }}
        />
      </Card>
    </div>
  );
};

export default Table;
