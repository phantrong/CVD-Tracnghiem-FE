import React, { useMemo, useState } from 'react';
import { Button, Col, Row, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import { TYPE_SHOW_QUESTION_BOX } from 'contants/constants';
import CommonQuestionBox from 'components/CommonQuestionBox';

import imageDefault from 'assets/images/image-default.svg';
import iconTime from 'assets/images/clock.svg';
import CountDownTime from 'components/CountDownTime';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useGetExamDetailPreview } from 'hooks/useActionExam';

export default function ExamAction() {
  const { t } = useTranslation();
  const params = useParams();
  const examId = Number(params.id);
  const [questionShowIndex, setQuestionShowIndex] = useState<number>(1);

  const { data: examDetail, isLoading: isLoadingExamDetail } = useGetExamDetailPreview({
    id: examId,
  });
  const listQuestion = examDetail?.examQuestionMappings?.map((questions: any) => {
    return questions?.question;
  });

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
          <h2>{examDetail?.name}</h2>
        </Col>
      </Row>
      {(isLoadingExamDetail || !examDetail) && <Spin size="large" />}
      {!isLoadingExamDetail && examDetail && (
        <Row justify="space-between" className={styles.formExam}>
          <Col span={16} className={styles.formAddExam}>
            <Row className={styles.listExamQuestion}>{questionShow}</Row>
          </Col>
          <Col span={8} className={styles.formInfoExam}>
            <Row className={styles.rowUploadAvatar}>
              <img src={examDetail?.image?.url || imageDefault} className={styles.avatar} alt="Avatar" />
            </Row>
            <Row className={styles.infoExam}>
              <div className={styles.nameExam}>{examDetail?.name}</div>
              <div className={styles.infoMore}>
                <div className={styles.countInfo}>
                  <img src={iconTime} className={styles.icon} alt="countQuestion" />{' '}
                  {examDetail?.time ? (
                    <CountDownTime startTime={examDetail?.time * 60} />
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
      )}
    </div>
  );
}
