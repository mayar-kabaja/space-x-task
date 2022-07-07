import { Transfer as AntdTransfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useRootStore } from '../../RootStateContext';

interface RecordType {
  key: string;
  title: string;
  description: string;
}
const titles = [
  'Mission Icon',
  'Launch Site',
  'Rockect',
  'Rocket Country',
  'Launch date',
  'Mission name',
  'Reddit',
  'Wikipedia',
  'Youtube',
  'Is upcoming',
];
const mockData: RecordType[] = Array.from({ length: 10 }).map((_, i) => ({
  key: i.toString(),
  title: titles[i],
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

const Transfer: React.FC = () => {
  const { launchsStore } = useRootStore();
  const { addHiddenColumns } = launchsStore;
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
    addHiddenColumns(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  return (
    <AntdTransfer
      dataSource={mockData}
      titles={['Show', 'Hidden']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={(item) => item.title}
    />
  );
};
export default observer(Transfer);
