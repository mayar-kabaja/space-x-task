import React from 'react';
import { Table as AntdTable } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { observer } from 'mobx-react-lite';
import { Columns } from '../../utils';

interface DateTable {
    data : any;
    columns : ColumnsType<Columns>;
}

const Table: React.FC<DateTable> = ({ columns, data } : DateTable) => {
  return (
    <AntdTable columns={columns} dataSource={data} />
  );
};

export default observer(Table);
