import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Input, Pagination, Row, Select, Spin } from 'antd';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

import filterIcon from 'assets/images/filter.svg';
import iconSearch from 'assets/images/SearchFilled.svg';
import iconQuestion from 'assets/images/question.svg';
import iconPeople from 'assets/images/people.svg';
import { ESort, IBodyListExam, useGetCategory, useGetListExam } from 'hooks/home';
import { useMutation } from 'react-query';
import { sendPost } from 'api/axios';

interface IBodySearchTest {
  subjectId?: {equal: number};
  search?: string;
}

const { Option } = Select;

const SORT_BY = {
  NEW: 'new',
  OLD: 'old',
};

export default function SearchExam() {
  const { t } = useTranslation();
  const { state }: any = useLocation();
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState<string>(state?.keyWord);
  const [categorySelected, setCategorySelected] = useState<number>();
  const [sortBy, setSortBy] = useState<string>(SORT_BY.NEW);
  const [page, setPage] = useState<number>(1);
  const listCategory: CategoryInterface[] = useGetCategory();

  const [bodyListExam, setBodyListExam] = useState<IBodyListExam>({take: 10, skip: 1, orderBy: 50, orderType: sortBy === SORT_BY.NEW ? ESort.DESC : ESort.ASC})

  const listExams = useGetListExam(bodyListExam);

  console.log(listExams, 'listExamslistExams');
  

  // const { data: listCategory, isLoading: isLoadingCategory }: any = {}

  const isLoadingListCategory = false;


  const isLoadingExam = false;

  const handleChangeCategory = (value: number) => {
    setCategorySelected(value);
  };

  const handleChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const handleChangePage = (value: number) => {
    setPage(value);
  };

  const listExamBox = useMemo(
    () =>
    listExams?.map((exam: ExamInterface) => (
        <div className={styles.boxExam}>
          <img src={exam?.image?.url} className={styles.imageExam} alt="Exam" />
          <div className={styles.infoExam}>
            <div className={styles.listCategory}>
              {/* {exam?.subjects?.map((category: CategoryInterface) => ( */}
                <div className={styles.category}>{exam?.subject?.name}</div>
              {/* // ))} */}
            </div>
            <div className={styles.nameExam}>{exam.name}</div>
            <div className={styles.countInfoExam}>
              <div className={styles.countInfo}>
                <img src={iconQuestion} className={styles.imageExam} alt="countQuestion" />{' '}
                {t('searchExam.countQuestion', { count: exam.totalQuestion })}
              </div>
              <div className={styles.countInfo}>
                <img src={iconPeople} className={styles.imageExam} alt="countExam" />{' '}
                {t('searchExam.countExam', { count: exam.totalNumberTest })}
              </div>
              <Button
                block
                type="primary"
                htmlType="button"
                className={styles.btnExam}
                onClick={() => navigate('/exam/preview')}
              >
                {t('searchExam.examNow').toUpperCase()}
              </Button>
            </div>
          </div>
        </div>
      )),
    [listExams, t]
  );

  const optionSelectCategory = useMemo(() => {
    return listCategory?.map((category: CategoryInterface) => (
      <Option key={'category' + category.id} value={category.id} selected={category.id === categorySelected}>
        {category.name}
      </Option>
    ));
  }, [categorySelected, listCategory]);

  const { mutate: searchTest } = useMutation(
    async (body: IBodySearchTest) => {
      return sendPost('rpc/tracnghiem/exam/public-list', body)
    },
    {
      onSuccess: (response: any) => {
        
      },
      onError: (error) => {
       
      },
    }
  );
  
  const handleSearchTestByEnter = (e?: React.KeyboardEvent<HTMLInputElement>) =>  {
    if(e?.keyCode === 13) {
      searchTest({subjectId: categorySelected ? {equal: categorySelected } : undefined, search: keyWord})
    }
  };

  const handleSearchByButton = () => {
    searchTest({subjectId: categorySelected ? {equal: categorySelected } : undefined, search: keyWord})
  }

  return (
    <div className={styles.searchExam}>
      <Row className={styles.containerExam}>
        <Col className={styles.filterSearch}>
          <div className={styles.divFilterSearch}>
            <div className={styles.title}>
              <img src={filterIcon} alt="filter" /> {t('searchExam.filterSearch')}
            </div>
            <Input
              className={styles.inputFind}
              prefix={<img src={iconSearch} alt="search" />}
              placeholder={t('home.findTest')}
              value={keyWord}
              onChange={(e) => setKeyWord(e.currentTarget.value)}
              onKeyDown={handleSearchTestByEnter}
            />
            <Select
              value={categorySelected}
              className={styles.select}
              bordered={false}
              onChange={handleChangeCategory}
              loading={isLoadingListCategory}
              placeholder={t('searchExam.category')}
            >
              {optionSelectCategory}
            </Select> 
            <Button block type="primary" onClick={handleSearchByButton} htmlType="button" className={styles.btnFind}>
              {t('common.find').toUpperCase()}
            </Button>
          </div>
        </Col>
        <Col span={6}></Col>
        <Col className={styles.listExam} span={18}>
          <div className={styles.divListExam}>
            <div className={styles.showAndSort}>
              <div className={styles.showText}>
                {t('searchExam.showCountExam', {
                  from: 1,
                  to: 10,
                  total: 100,
                })}
              </div>
              <div className={styles.sortDiv}>
                <div className={styles.sortText}>{t('searchExam.sortBy')}</div>
                <Select
                  value={sortBy}
                  className={styles.select}
                  bordered={false}
                  onChange={handleChangeSortBy}
                  loading={isLoadingListCategory}
                  placeholder={t('searchExam.category')}
                >
                  <Option key="sortByNew" value={SORT_BY.NEW} selected={SORT_BY.NEW === sortBy}>
                    {t('searchExam.newMost')}
                  </Option>
                  <Option key="sortByOld" value={SORT_BY.OLD} selected={SORT_BY.OLD === sortBy}>
                    {t('searchExam.oldMost')}
                  </Option>
                </Select>
              </div>
            </div>
            {isLoadingExam && <Spin size="large" />}
            {!isLoadingExam && <div className={styles.listExam}>{listExamBox}</div>}
            <div className={styles.pagination}>
              <Pagination onChange={handleChangePage} total={100} current={page} pageSize={10} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
