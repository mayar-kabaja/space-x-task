/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { RedditOutlined, LinkOutlined, YoutubeOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import {
  Col, Divider, Row, Space, Spin,
} from 'antd';
import { Link } from 'react-router-dom';
import { Select, Table } from '../../components';
import { useRootStore } from '../../RootStateContext';

const columns = [
  {
    title: 'Mission Icon',
    dataIndex: 'missionIcon',
    // eslint-disable-next-line jsx-a11y/alt-text
    render: (link: string) => <img src={link} style={{ width: '30px' }} />,
  },
  {
    title: 'Launch Site',
    dataIndex: 'launchSite',
  },
  {
    title: 'Rockect',
    dataIndex: 'rocket',
  },
  {
    title: 'Rocket Country',
    dataIndex: 'rocketCountry',
  },
  {
    title: 'Launch date',
    dataIndex: 'launchDate',
    render: (date: string) => date.split('T')[0],
  },
  {
    title: 'Mission name',
    dataIndex: 'missionName',
  },
  {
    title: 'Is upcoming',
    dataIndex: 'isUpcoming',
    render: (value: boolean) => (value ? 'Yes' : 'No'),
  },
  {
    title: 'Reddit',
    dataIndex: 'reddit',
    render: (link: string) => (
      <a href={link}>
        <RedditOutlined />
      </a>
    ),
  },
  {
    title: 'Wikipedia',
    dataIndex: 'wikipedia',
    render: (link: string) => (
      <a href={link}>
        <LinkOutlined />
      </a>
    ),
  },
  {
    title: 'Youtube',
    dataIndex: 'youtube',
    render: (link: string) => (
      <a href={link}>
        <YoutubeOutlined />
      </a>
    ),
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
    launchs, getLaunch, isLoading, filters, filteredLaunchs,
  } = launchsStore;

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
        <Divider orientation="left">Filters</Divider>
        <Row gutter={16} justify="space-around" align="middle">
          <Col className="flright-number" span={3}>
            <p>Flright Number</p>
            <Select defaultValue="All" handleChange={(value) => filters.flightNumber = value} values={arrayOfFlrightNumber} />
          </Col>
          <Col className="launch-year" span={3}>
            <p>Launch Year</p>
            <Select defaultValue="All" handleChange={(value) => filters.launchYear = value} values={arrayOfLaunchYear} />
          </Col>
          <Col className="rocket-name'" span={3}>
            <p>Rocet Name</p>
            <Select defaultValue="All" handleChange={(value) => filters.rocketName = value} values={['All', 'Falcon Heavy', 'Falcon 9', 'Falcon 1']} />
          </Col>
          <Col className="rocket-core" span={3}>
            <p>Rocet Core</p>
            <Select defaultValue="All" handleChange={(value) => filters.rocketCore = value} values={['All', 'reused', 'not reused']} />
          </Col>
          <Col className="rocket-firing'" span={3}>
            <p>Rocket Firing</p>
            <Select defaultValue="All" handleChange={(value) => filters.rocketFiring = value} values={['All', 'reused', 'not reused']} />
          </Col>
          <Col className="landing'" span={3}>
            <p>Landing</p>
            <Select defaultValue="All" handleChange={(value) => filters.landing = value} values={['All', 'success', 'fail']} />
          </Col>
          <Col className="lanching'" span={3}>
            <p>Lanching</p>
            <Select defaultValue="All" handleChange={(value) => filters.lanching = value} values={['All', 'success', 'fail']} />
          </Col>
        </Row>
        {isLoading ? <Table data={data} columns={columns} /> : <Spin />}
      </Space>
    </>
  );
};

export default observer(Launchs);
