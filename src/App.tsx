import React, { useEffect, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { ConfigProvider } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { Card, NavigationMenu } from './components';
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
        {/* <Launchs /> */}
        <Routes>
          <Route path="/" element={<Card name="Hi" description="hi" manufacturers="hi" website="m" twitter="l" wikipedia="l" />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
};
export default App;
