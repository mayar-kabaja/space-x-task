import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SettingOutlined, RocketOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

interface IMyProps {
    setLang: Function;
}

function getItem(
  label: any,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const arrayOfFlrightNumber: ItemType[] = [];
for (let i = 1; i <= 110; i += 1) {
  const obj = getItem(i, i);
  arrayOfFlrightNumber.push(obj);
}

const NavigationMenu: React.FC<IMyProps> = ({ setLang }: IMyProps) => {
  const { t } = useTranslation();
  const onClick = ({ key }: any) => {
    if (key === 'ar' || key === 'en') {
      setLang(key);
    } else if (key === 'kg' || key === 'lbs') {
      localStorage.setItem('weight', key);
    } else if (key === 'feet' || key === 'meters') {
      localStorage.setItem('distance', key);
    }
  };
  const items = [
    getItem(t('setting'), 'setting', <SettingOutlined />, [
      getItem(t('language'), 'language', null, [
        getItem(t('arabic'), 'ar'),
        getItem(t('english'), 'en'),
      ]),
      getItem(t('weight'), 'weight', null, [getItem(t('kg'), 'kg'), getItem(t('lbs'), 'lbs')]),
      getItem(t('distance'), 'distance', null, [
        getItem(t('feet'), 'feet'),
        getItem(t('meters'), 'meters'),
      ]),
    ]),

    getItem(t('launch'), 'launch', <RocketOutlined />, [
      getItem(t('launch year'), 'launch-year', null, [
        getItem('2006', '2006'),
        getItem('2007', '2007'),
        getItem('2008', '2008'),
        getItem('2009', '2009'),
        getItem('2010', '2010'),
        getItem('2011', '2011'),
        getItem('2012', '2012'),
        getItem('2013', '2013'),
        getItem('2014', '2014'),
        getItem('2015', '2015'),
        getItem('2016', '2016'),
        getItem('2017', '2017'),
        getItem('2018', '2018'),
        getItem('2019', '2019'),
        getItem('2020', '2020'),
        getItem('2021', '2021'),
        getItem('2022', '2022'),
      ]),
      getItem(t('rocket core'), 'rocket-core', null, [
        getItem(t('rused'), 'rocket-core-rused'),
        getItem(t('not rused'), 'rocket-core-not-rused'),
      ]),
      getItem(t('flight number'), 'flight-number', null, [...arrayOfFlrightNumber]),
      getItem(t('rocket firing'), 'rocket-firing', null, [
        getItem(t('rused'), 'rocket-firing-rused'),
        getItem(t('not rused'), 'rocket-firing-not-rused'),
      ]),
      getItem(t('rocket name'), 'rocket-name', null, [
        getItem('Falcon Heavy', 'falcon-heavy'),
        getItem('Falcon 9', 'falcon-9'),
        getItem('Falcon 1', 'falcon-1'),
      ]),
      getItem(t('lanching'), 'lanching', null, [
        getItem(t('success'), 'lanching-success'),
        getItem(t('fail'), 'lanching-fail'),
      ]),
      getItem(t('landing'), 'Landing', null, [
        getItem(t('success'), 'landing-success'),
        getItem(t('fail'), 'landing-fail'),
      ]),
    ]),
    getItem(t('missions'), 'missions', null),
  ];
  return (
    <Menu
      onClick={onClick}
      style={{ width: 300 }}
      mode="horizontal"
      items={items}
    />
  );
};

export default NavigationMenu;
