import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SettingOutlined, RocketOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../RootStateContext';

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

const NavigationMenu: React.FC<IMyProps> = ({ setLang }: IMyProps) => {
  const { t } = useTranslation();
  const { launchsStore } = useRootStore();
  const { filters } = launchsStore;

  const onClick = ({ key, keyPath }: any) => {
    if (keyPath[1] === 'flight-number') {
      filters.flightNumber = +key;
    } else if (key === 'ar' || key === 'en') {
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

    getItem(t('launch'), 'launch', <RocketOutlined />),
    getItem(t('missions'), 'missions', null),
  ];
  return (
    <Menu onClick={onClick} style={{ width: 340 }} mode="horizontal" items={items} />
  );
};

export default observer(NavigationMenu);
