import {
  Col, List, Modal, Row, Space, Spin, Divider,
} from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Card } from '../../components';
import { useRootStore } from '../../RootStateContext';
import { Mission, Payload } from '../../utils';

function Missions() {
  const {
    missionsStore: { addMissions, missions, isLoading },
  } = useRootStore();
  const [oneMission, setOneMission] = useState<Mission[]>();
  const [payload, setPayload] = useState<Payload[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    addMissions();
  }, [isLoading, Missions]);

  const handleClick = async (mission:any) => {
    setOneMission([mission]);
    const { payload_ids } = mission;
    const urls = payload_ids.reduce((axiosCalls: string[], url: any) => {
      axiosCalls.push(`https://api.spacexdata.com/v3/payloads/${url}`);
      return axiosCalls;
    }, []);

    const Datapayload = await Promise.all(
      urls.map(async (url: string) => {
        const resp = await fetch(url);
        return resp.json();
      }),
    );

    setPayload(Datapayload);
    setIsModalVisible(true);
  };
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer="">
        <Row>
          {
          oneMission?.map(({
            description,
            mission_name,
            manufacturers,
            twitter,
            website,
            wikipedia,
          }) => (
            <Col>
              <h2>{mission_name}</h2>
              <p>{description}</p>
              <h3>manufacturers:</h3>
              {manufacturers.map((element) => <p>{element}</p>)}
              <Space>
                <a href={twitter}>Twitter</a>
                <a href={website}>Website</a>
                <a href={wikipedia}>Wikipedia</a>
              </Space>
            </Col>
          ))
        }
        </Row>
        <Row>
          {
            payload?.map(({
              customers,
              manufacturer,
              nationality,
              orbit,
              payload_id,
              payload_mass_kg,
              payload_mass_lbs,
              reused,
            }) => (
              <Col span={24}>
                <Divider orientation="left">{payload_id}</Divider>
                <div>
                  <strong>customers:</strong>
                  {customers}
                </div>
                <div>
                  <strong>manufacturer:</strong>
                  {manufacturer}
                </div>
                <div>
                  <strong>nationality:</strong>
                  {nationality}
                </div>
                <div>
                  <strong>orbit:</strong>
                  {orbit}
                </div>
                <div>
                  <strong>payload mass kg:</strong>
                  {payload_mass_kg}
                </div>
                <div>
                  <strong>payload mass lbs:</strong>
                  {payload_mass_lbs}
                </div>
                <div>
                  <strong>reused:</strong>
                  {reused ? 'reused' : ' not reused'}
                </div>
              </Col>
            ))
          }
        </Row>
      </Modal>
      {
        isLoading ? (
          <Row>
            {missions.map(
              ({
                mission_name,
                description,
                manufacturers,
                twitter,
                website,
                wikipedia,
                payload_ids,
                mission_id,
              }) => (
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  xl={8}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Card
                    name={mission_name}
                    description={`${description.split(' ').slice(0, 40).join(' ')}....`}
                    manufacturers={manufacturers[0]}
                    website={website ?? '#'}
                    wikipedia={wikipedia ?? '#'}
                    twitter={twitter ?? '#'}
                    payload_id={payload_ids[0]}
                    isHoverable
                    handleClick={() => handleClick({
                      mission_id,
                      mission_name,
                      description,
                      manufacturers,
                      website,
                      wikipedia,
                      twitter,
                      payload_ids,
                    })}
                    key={mission_id}
                  />
                </Col>
              ),
            )}
          </Row>
        )
          : <Spin />
      }
    </div>
  );
}

export default observer(Missions);
