import React, { useEffect, useMemo, useState } from 'react';
import { RedditOutlined, LinkOutlined, YoutubeOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Col, Modal, Row, Space, Spin, Divider,
} from 'antd';
import { Column } from '../../utils';
import { Select, Table, Trancfer } from '../../components';
import { useRootStore } from '../../RootStateContext';
import { DragAndDrop } from '../../drag&drop';

const arrayOfFlrightNumber: any[] = [];
for (let i = 1; i <= 110; i += 1) {
  if (i === 1) arrayOfFlrightNumber.push('All');
  arrayOfFlrightNumber.push(i);
}
const arrayOfLaunchYear: any[] = [];
for (let i = 2006; i <= 2020; i += 1) {
  if (i === 2006) arrayOfLaunchYear.push('All');
  arrayOfLaunchYear.push(i);
}
const Launchs = () => {
  const { launchsStore } = useRootStore();

  const {
    getLaunch, isLoading, filters, filteredLaunchs, hiddenColumns,
  } = launchsStore;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [columns, setColumns] = useState<Column[]>([
    {
      title: 'Mission Icon',
      dataIndex: 'missionIcon',
      render: (link: string) => <img src={link} alt="" style={{ width: '30px' }} />,
      id: '0',
    },
    {
      title: 'Launch Site',
      dataIndex: 'launchSite',
      id: '1',

    },
    {
      title: 'Rockect',
      dataIndex: 'rocket',
      id: '2',

    },
    {
      title: 'Rocket Country',
      dataIndex: 'rocketCountry',
      id: '3',

    },
    {
      title: 'Launch date',
      dataIndex: 'launchDate',
      render: (date: string) => date.split('T')[0],
      id: '4',

    },
    {
      title: 'Mission name',
      dataIndex: 'missionName',
      id: '5',

    },
    {
      title: 'Is upcoming',
      dataIndex: 'isUpcoming',
      render: (value: boolean) => (value ? 'Yes' : 'No'),
      id: '6',

    },
    {
      title: 'Reddit',
      dataIndex: 'reddit',
      render: (link: string) => (
        <a href={link}>
          <RedditOutlined />
        </a>
      ),
      id: '7',
    },
    {
      title: 'Wikipedia',
      dataIndex: 'wikipedia',
      render: (link: string) => (
        <a href={link}>
          <LinkOutlined />
        </a>
      ),
      id: '8',
    },
    {
      title: 'Youtube',
      dataIndex: 'youtube',
      render: (link: string) => (
        <a href={link}>
          <YoutubeOutlined />
        </a>
      ),
      id: '9',
    },
  ]);

  const data = useMemo(() => filteredLaunchs.map(({
    links, launch_site, launch_date_utc, mission_name, rocket, upcoming,
  }) => {
    return {
      missionIcon: links.mission_patch_small,
      reddit: links.reddit_media,
      wikipedia: links.wikipedia,
      youtube: links.video_link,
      launchSite: launch_site.site_name,
      launchDate: launch_date_utc,
      missionName: mission_name,
      rocket: rocket.rocket_name,
      rocketCountry: rocket.second_stage.payloads[0].nationality,
      isUpcoming: upcoming.toString(),
    };
  }), [filteredLaunchs]);

  useEffect(() => {
    getLaunch();
  }, []);
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row>
        <Col span={4}>
          <Col className="flright-number" span={24}>
            <p>Flright Number</p>
            <Select defaultValue="All" handleChange={(value) => filters.flightNumber = value} values={arrayOfFlrightNumber} />
          </Col>
          <Col className="launch-year" span={24}>
            <p>Launch Year</p>
            <Select defaultValue="All" handleChange={(value) => filters.launchYear = value} values={arrayOfLaunchYear} />
          </Col>
          <Col className="rocket-name'" span={24}>
            <p>Rocet Name</p>
            <Select defaultValue="All" handleChange={(value) => filters.rocketName = value} values={['All', 'Falcon Heavy', 'Falcon 9', 'Falcon 1']} />
          </Col>
          <Col className="rocket-core" span={24}>
            <p>Rocet Core</p>
            <Select defaultValue="All" handleChange={(value) => filters.rocketCore = value} values={['All', 'reused', 'not reused']} />
          </Col>
          <Col className="rocket-firing'" span={24}>
            <p>Rocket Firing</p>
            <Select defaultValue="All" handleChange={(value) => filters.rocketFiring = value} values={['All', 'reused', 'not reused']} />
          </Col>
          <Col className="landing'" span={24}>
            <p>Landing</p>
            <Select defaultValue="All" handleChange={(value) => filters.landing = value} values={['All', 'success', 'fail']} />
          </Col>
          <Col className="lanching'" span={24}>
            <p>Lanching</p>
            <Select defaultValue="All" handleChange={(value) => filters.lanching = value} values={['All', 'success', 'fail']} />
          </Col>
        </Col>
        <Col span={16}>
          {isLoading ? <Table
            data={data}
            columns={columns.filter((column:Column) => hiddenColumns.indexOf(column.id) === -1)}
          /> : <Spin />}
        </Col>
        <Col span={4}>
          <Button onClick={() => setIsModalVisible(true)}>Setting</Button>
          <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer="" width="1100px">
            <Space direction="vertical" size="middle">
              <Divider orientation="left"> Show And Hidden Columns </Divider>
              <Trancfer />
              <Divider orientation="left"> Drag And Drop Columns </Divider>
              <DragAndDrop
                items={columns.filter((column:Column) => hiddenColumns.indexOf(column.id) === -1)}
                setItems={setColumns}
              />
            </Space>
          </Modal>
        </Col>
      </Row>
    </Space>
  );
};

export default observer(Launchs);
