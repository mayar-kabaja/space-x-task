import React from 'react';
import { Card as AntdCard } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = AntdCard;

interface IMyProps {
  name: string;
  description: string;
  manufacturers: string;
  wikipedia: string;
  website: string;
  twitter: string;
}

const Card = ({
  name, description, manufacturers, wikipedia, website, twitter,
}: IMyProps) => {
  return (
    <AntdCard
      style={{
        width: 300,
      }}
      actions={[
        <Link to={wikipedia}>wikipedia</Link>,
        <Link to={website}>website</Link>,
        <Link to={twitter}>twitter</Link>,
      ]}
    >
      <Meta title={name} description={description} />
      <span>{manufacturers}</span>
    </AntdCard>
  );
};

export default Card;
