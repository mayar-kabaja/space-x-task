import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SettingOutlined, RocketOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

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
  const navigate = useNavigate();

  const onClick = ({ key } : any) => {
    switch (key) {
      case 'ar':
      case 'en':
        setLang(key);
        break;
      case 'kg':
      case 'lbs':
        localStorage.setItem('weight', key);
        break;
      case 'kg':
      case 'lbs':
        localStorage.setItem('distance', key);
        break;
      case 'missions':
        navigate('/missions');
        break;
      case 'launchs':
        navigate('/');
        break;
      default:
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

    getItem(t('launchs'), 'launchs', <RocketOutlined />),
    getItem(t('missions'), 'missions', null),
  ];
  return (
    <Menu onClick={onClick} style={{ width: 340 }} mode="horizontal" items={items} />
  );
};

export default observer(NavigationMenu);
