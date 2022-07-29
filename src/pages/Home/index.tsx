import React, { useState } from 'react';
import { Button, Input, Row } from 'antd';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

import iconSearch from 'assets/images/SearchFilled.svg';

export default function Home() {
  const { t } = useTranslation();

  const onSearch = (value: string) => console.log(value);

  return (
    <div className={styles.container}>
      <Row justify="space-between" className={styles.home}>
        <div className={styles.titleAppName}>
          <span className={styles.appName}>{t('home.mainAppName')}</span>
          {t('home.subAppName')}
        </div>
        <div className={styles.desAppName}>{t('home.appDes')}</div>
        <div className={styles.divFindTest}>
          <Input
            className={styles.inputFind}
            prefix={<img src={iconSearch} alt="search" />}
            suffix={
              <Button htmlType="button" className={styles.btnFind}>
                {t('common.find')}
              </Button>
            }
          />
        </div>
      </Row>
    </div>
  );
}
