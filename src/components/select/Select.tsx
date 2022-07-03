import React from 'react';
import { Select as AntdSelect } from 'antd';
import { observer } from 'mobx-react-lite';

const { Option } = AntdSelect;
interface IMyProps {
    defaultValue: string;
    handleChange(e:any) : any;
    values : any[];
}

function Select({ handleChange, values, defaultValue } : IMyProps) {
  return (
    <AntdSelect
      defaultValue={defaultValue}
      style={{
        width: 120,
      }}
      onChange={handleChange}
    >
      {
          values.map((value) => <Option value={value}>{value}</Option>)
      }
    </AntdSelect>
  );
}

export default observer(Select);
