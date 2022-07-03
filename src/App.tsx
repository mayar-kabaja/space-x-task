import React, { useEffect, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { ConfigProvider } from 'antd';
import { NavigationMenu } from './components';
import { Launchs } from './pages';

const App = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <div className="App">
      <ConfigProvider direction={lang === 'ar' ? 'rtl' : 'ltr'}>
        <NavigationMenu setLang={setLang} />
        <Launchs />
      </ConfigProvider>
    </div>
  );
};
export default App;
