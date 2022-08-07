import React, { useMemo } from 'react';
import { Button, Col, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import SideNav from 'components/SideNav';
import {
  OPTION_QUESTION_TYPE,
  OPTION_QUESTION_TYPE_FILL_TEXTBOX,
  QUESTION_TYPE,
  TYPE_SHOW_QUESTION_BOX,
} from 'contants/constants';
import CommonQuestionBox from 'components/CommonQuestionBox';

import imageDefault from 'assets/images/image-default.svg';
import iconQuestion from 'assets/images/question.svg';
import iconPeople from 'assets/images/people.svg';
import iconTime from 'assets/images/clock.svg';

export default function PreviewExam() {
  const { t } = useTranslation();

  const isLoadingExamDetail = false;
  const examDetail: ExamInterface = {
    id: 1,
    name: 'Bài thi thử nghiệm',
    countQuestion: 30,
    countExam: 11,
    time: 30,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
  };

  const isLoadingListQuetion = false;
  const listQuestion: QuestionDetailInterface[] = [
    {
      id: 1,
      type: QUESTION_TYPE.PICK_ONE,
      content: 'áhdkjahsdkjadjkashdklahd',
      options: [
        {
          id: 11,
          type: OPTION_QUESTION_TYPE.TRUE,
          content: 'ádasdsad',
        },
        {
          id: 12,
          type: OPTION_QUESTION_TYPE.FALSE,
          content: 'ádasdsad',
        },
        {
          id: 13,
          type: OPTION_QUESTION_TYPE.FALSE,
          content: 'ádasdsad',
        },
        {
          id: 14,
          type: OPTION_QUESTION_TYPE.FALSE,
          content: 'ádasdsad',
        },
      ],
    },
    {
      id: 2,
      type: QUESTION_TYPE.MULTI_PICK,
      content: 'áhdkjahsdkjadjkashdklahd',
      options: [
        {
          id: 11,
          type: OPTION_QUESTION_TYPE.TRUE,
          content: 'ádasdsad',
        },
        {
          id: 12,
          type: OPTION_QUESTION_TYPE.FALSE,
          content: 'ádasdsad',
        },
        {
          id: 13,
          type: OPTION_QUESTION_TYPE.TRUE,
          content: 'ádasdsad',
        },
        {
          id: 14,
          type: OPTION_QUESTION_TYPE.FALSE,
          content: 'ádasdsad',
        },
      ],
    },
    {
      id: 3,
      type: QUESTION_TYPE.FILL_TEXTBOX,
      content: 'áhdkjahsdkjadjkashdklahd',
      options: [
        {
          id: 11,
          type: OPTION_QUESTION_TYPE_FILL_TEXTBOX.EXACTLY,
          content: 'ádasdsad',
        },
        {
          id: 12,
          type: OPTION_QUESTION_TYPE_FILL_TEXTBOX.CONTAINS,
          content: 'ádasdsad',
        },
        {
          id: 13,
          type: OPTION_QUESTION_TYPE_FILL_TEXTBOX.CONTAINS,
          content: 'ádasdsad',
        },
      ],
    },
  ];

  const listQuestionShow = useMemo(() => {
    return listQuestion.map((question: QuestionDetailInterface, index: number) => (
      <CommonQuestionBox
        questionDetail={question}
        numberQuestion={index + 1}
        typeShow={TYPE_SHOW_QUESTION_BOX.PREVIEW}
      />
    ));
  }, [listQuestion]);

  return (
    <div className={styles.previewExam}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{t('previewExam.title')}</h2>
        </Col>
      </Row>
      <Row justify="space-between" className={styles.formExam}>
        <Col span={16} className={styles.formAddExam}>
          <Row className={styles.listExamQuestion}>{listQuestionShow}</Row>
        </Col>
        <Col span={8} className={styles.formInfoExam}>
          <Row className={styles.rowUploadAvatar}>
            <img src={examDetail.image || imageDefault} className={styles.avatar} alt="Avatar" />
          </Row>
          <Row className={styles.infoExam}>
            <div className={styles.nameExam}>{examDetail.name}</div>
            <div className={styles.infoMore}>
              <div className={styles.countInfo}>
                <img src={iconTime} className={styles.icon} alt="countQuestion" />{' '}
                {examDetail.time
                  ? t('previewExam.timeExamLimit', { time: examDetail.time })
                  : t('previewExam.timeExamNoLimit')}
              </div>
              <div className={styles.countInfo}>
                <img src={iconQuestion} className={styles.icon} alt="countQuestion" />{' '}
                {t('searchExam.countQuestion', { count: examDetail.countQuestion })}
              </div>
              <div className={styles.countInfo}>
                <img src={iconPeople} className={styles.icon} alt="countExam" />{' '}
                {t('searchExam.countExam', { count: examDetail.countExam })}
              </div>
            </div>
          </Row>
          <Button type="primary" htmlType="submit" className={styles.btnSubmit}>
            {t('previewExam.start').toUpperCase()}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
