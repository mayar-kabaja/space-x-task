import React from 'react';

export type Columns = {
  [key: string]: any;
  'Mission icon': string;
  reddit: string;
  wikipedia: string;
  youtube: string;
  'Launch site': string;
  'Launch date': string;
  'Mission name': string;
  Rocket: string;
  'Rocket country': string;
  'Is upcoming': string;
};

export type Column = {
  title: string,
  dataIndex: string,
  render ?: any,
  id: string,
}
