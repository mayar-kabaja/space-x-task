/* eslint-disable react/button-has-type */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { RedditOutlined, LinkOutlined, YoutubeOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Col, Modal, Row, Space, Spin,
} from 'antd';
import { Select, Table, Trancfer } from '../../components';
import { useRootStore } from '../../RootStateContext';

const columns = [
  {
    title: 'Mission Icon',
    dataIndex: 'missionIcon',
    render: (link: string) => <img src={link} style={{ width: '30px' }} />,
    typeof: '0',
  },
  {
    title: 'Launch Site',
    dataIndex: 'launchSite',
    typeof: '1',

  },
  {
    title: 'Rockect',
    dataIndex: 'rocket',
    typeof: '2',

  },
  {
    title: 'Rocket Country',
    dataIndex: 'rocketCountry',
    typeof: '3',

  },
  {
    title: 'Launch date',
    dataIndex: 'launchDate',
    render: (date: string) => date.split('T')[0],
    typeof: '4',

  },
  {
    title: 'Mission name',
    dataIndex: 'missionName',
    typeof: '5',

  },
  {
    title: 'Is upcoming',
    dataIndex: 'isUpcoming',
    render: (value: boolean) => (value ? 'Yes' : 'No'),
    typeof: '6',

  },
  {
    title: 'Reddit',
    dataIndex: 'reddit',
    render: (link: string) => (
      <a href={link}>
        <RedditOutlined />
      </a>
    ),
    typeof: '7',
  },
  {
    title: 'Wikipedia',
    dataIndex: 'wikipedia',
    render: (link: string) => (
      <a href={link}>
        <LinkOutlined />
      </a>
    ),
    typeof: '8',
  },
  {
    title: 'Youtube',
    dataIndex: 'youtube',
    render: (link: string) => (
      <a href={link}>
        <YoutubeOutlined />
      </a>
    ),
    typeof: '9',
  },
];
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
    <>
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
            {isLoading ? <Table data={data}
              columns={columns.filter((column) => hiddenColumns.indexOf(column.typeof) == -1)}
            /> : <Spin />}
          </Col>
          <Col span={4}>
            <Button onClick={() => setIsModalVisible(true)}>Setting</Button>
            <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer="">
              <Trancfer />
            </Modal>
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default observer(Launchs);
