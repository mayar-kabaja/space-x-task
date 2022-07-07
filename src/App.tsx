import React, { useEffect, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { ConfigProvider, Layout, Space } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { NavigationMenu } from './components';
import { Launchs, Mission } from './pages';
import { DragAndDrop } from './drag&drop';

const { Header, Content } = Layout;

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
        <Layout>
          <Header><NavigationMenu setLang={setLang} /></Header>
          <Content>
            <Routes>
              <Route
                path="/"
                element={(
                  <Launchs />
)}
              />
              <Route path="/missions" element={<Mission />} />
            </Routes>
          </Content>
        </Layout>
      </ConfigProvider>
    </div>
  );
};
export default App;
