import React from 'react';
import { Card as AntdCard } from 'antd';

const { Meta } = AntdCard;

interface IMyProps {
  name: string;
  description: string;
  manufacturers: string;
  wikipedia: string;
  website: string;
  twitter: string;
  isHoverable: boolean;
  payload_id: string;
  handleClick: (e:any) => any
  key: string;
}

const Card = ({
  name,
  description,
  manufacturers,
  wikipedia,
  website,
  twitter,
  isHoverable,
  payload_id,
  handleClick,
  key,
}: IMyProps) => {
  return (
    <AntdCard
      hoverable={isHoverable}
      onClick={handleClick}
      key={key}
      style={{
        width: 430,
        marginBottom: 10,
      }}
      actions={[
        <a href={wikipedia}>wikipedia</a>,
        <a href={website}>website</a>,
        <a href={twitter}>twitter</a>,
      ]}
    >
      <Meta title={name} description={description} />
      <p style={{ marginTop: '1rem' }}>
        Manufacturers :
        {' '}
        {manufacturers}
      </p>
      <p>
        payload id :
        {' '}
        {`${payload_id}...`}
      </p>
    </AntdCard>
  );
};

export default Card;
