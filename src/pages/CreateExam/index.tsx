import React, { useCallback, useMemo, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import SideNav from 'components/SideNav';

import iconSearch from 'assets/images/SearchFilled.svg';
import iconAdd from 'assets/images/add-white.svg';

const { Option } = Select;

const defaultFilter: IFilterListQuestion = {
  status: undefined,
  category: undefined,
  keyWord: '',
  page: 1,
  per_page: 10,
};

export default function CreateExam() {
  const { t } = useTranslation();

  const [filter, setFilter] = useState<IFilterListQuestion>(defaultFilter);
  const [isModalFindQuestion, setIsModalFindQuestion] = useState<boolean>(false);

  // const { data: listCategory, isLoading: isLoadingCategory }: any = {}

  const isLoadingListCategory = false;
  const listCategory: CategoryInterface[] = [
    {
      id: 1,
      name: 'Tin học',
    },
    {
      id: 2,
      name: 'Tin học',
    },
    {
      id: 3,
      name: 'Tin học',
    },
    {
      id: 4,
      name: 'Tin học',
    },
    {
      id: 5,
      name: 'Tin học',
    },
  ];

  const handleChangeCategory = useCallback(
    (selectedValue: number) => {
      setFilter({
        ...filter,
        page: 1,
        category: selectedValue,
      });
    },
    [filter]
  );

  const handleChangeKeyWord = useCallback(
    (value: string) => {
      setFilter({
        ...filter,
        page: 1,
        keyWord: value,
      });
    },
    [filter]
  );

  const optionSelectCategory = useMemo(() => {
    return listCategory.map((category: CategoryInterface) => (
      <Option key={'category' + category.id} value={category.id} selected={category.id === filter.category}>
        {category.name}
      </Option>
    ));
  }, [filter.category, listCategory]);

  return (
    <div className={styles.createExam}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{t('createExam.title')}</h2>
        </Col>
      </Row>
      <Row justify="space-between" className={styles.formExam}>
        <Button
          block
          type="primary"
          htmlType="button"
          className={styles.btnAdd}
          onClick={() => setIsModalFindQuestion(true)}
        >
          {t('common.addNew').toUpperCase()} <img height={16} width={16} src={iconAdd} alt="Add" />
        </Button>
      </Row>
      <Modal
        className={styles.modalQuestion}
        visible={isModalFindQuestion}
        onCancel={() => setIsModalFindQuestion(false)}
        closable={true}
        centered={true}
        footer={false}
      >
        <Row>
          <Col>
            <Input
              className={styles.input}
              prefix={<img src={iconSearch} alt="search" />}
              placeholder={t('common.find')}
              value={filter.keyWord}
              onChange={(e) => handleChangeKeyWord(e.currentTarget.value)}
            />
          </Col>
          <Col>
            <Select
              value={filter.category}
              className={styles.select}
              bordered={false}
              onChange={handleChangeCategory}
              loading={isLoadingListCategory}
              placeholder={t('myListExam.category')}
            >
              {optionSelectCategory}
            </Select>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
