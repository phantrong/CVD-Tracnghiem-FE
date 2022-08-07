import React, { useMemo, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import {
  OPTION_QUESTION_TYPE,
  OPTION_QUESTION_TYPE_FILL_TEXTBOX,
  QUESTION_TYPE,
  TYPE_SHOW_QUESTION_BOX,
} from 'contants/constants';
import CommonQuestionBox from 'components/CommonQuestionBox';

import imageDefault from 'assets/images/image-default.svg';
import iconTime from 'assets/images/clock.svg';
import CountDownTime from 'components/CountDownTime';
import classNames from 'classnames';

export default function ExamAction() {
  const { t } = useTranslation();

  const [questionShowIndex, setQuestionShowIndex] = useState<number>(1);

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
  ];

  const questionNumberShow = useMemo(() => {
    return listQuestion.map((question: QuestionDetailInterface, index: number) => (
      <div
        className={classNames({
          [styles.questionNumber]: true,
          [styles.questionNumberActive]: index + 1 === questionShowIndex,
        })}
        onClick={() => setQuestionShowIndex(index + 1)}
      >
        {index + 1}
      </div>
    ));
  }, [listQuestion, questionShowIndex]);

  const questionShow = useMemo(() => {
    return listQuestion.map(
      (question: QuestionDetailInterface, index: number) =>
        questionShowIndex === index + 1 && (
          <CommonQuestionBox
            questionDetail={question}
            numberQuestion={index + 1}
            typeShow={TYPE_SHOW_QUESTION_BOX.EXAM}
          />
        )
    );
  }, [listQuestion, questionShowIndex]);

  return (
    <div className={styles.examAction}>
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{examDetail.name}</h2>
        </Col>
      </Row>
      <Row justify="space-between" className={styles.formExam}>
        <Col span={16} className={styles.formAddExam}>
          <Row className={styles.listExamQuestion}>{questionShow}</Row>
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
                {examDetail.time ? (
                  <CountDownTime startTime={examDetail.time * 60} />
                ) : (
                  t('previewExam.timeExamNoLimit')
                )}
              </div>
            </div>
          </Row>
          <Row className={styles.listQuestionNumber}>{questionNumberShow}</Row>
          <Button type="primary" htmlType="submit" className={styles.btnSubmit}>
            {t('examAction.btnSubmit').toUpperCase()}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
