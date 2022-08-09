import React from 'react';
import { Button, Col, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './style.module.scss';
import { QUESTION_TYPE, TEXT_SHOW_INDEX_OPTION, TYPE_SHOW_QUESTION_BOX } from 'contants/constants';
import classNames from 'classnames';
import { getQuestionTypeText } from 'helper';

import iconAdd from 'assets/images/add-circle.svg';
import iconDelete from 'assets/images/icon-delete.svg';

interface CommonQuestionBoxProps {
  questionDetail: any;
  handleAddQuestion?: (question: QuestionDetailInterface) => void;
  handleRemoveQuestion?: (question: QuestionDetailInterface) => void;
  numberQuestion?: number;
  typeShow?: number;
}

export default function CommonQuestionBox(props: CommonQuestionBoxProps) {
  const { t } = useTranslation();
  const {
    questionDetail,
    handleAddQuestion,
    handleRemoveQuestion,
    numberQuestion,
    typeShow = TYPE_SHOW_QUESTION_BOX.SEARCH,
  } = props;

  return (
    <Row justify="center" className={styles.mainBox}>
      <div className={styles.actionQuestion}>
        <div className={styles.typeQuestion}>{getQuestionTypeText(questionDetail?.questionTypeId)}</div>
        {handleAddQuestion && (
          <Button
            block
            type="primary"
            htmlType="button"
            className={styles.btnAdd}
            onClick={() => handleAddQuestion(questionDetail)}
          >
            <img height={16} width={16} src={iconAdd} alt="Add" />
            {t('commonQuestionBox.addOption')}
          </Button>
        )}
        {handleRemoveQuestion && (
          <Button
            block
            type="primary"
            htmlType="button"
            className={styles.btnDelete}
            onClick={() => handleRemoveQuestion(questionDetail)}
          >
            <img height={16} width={16} src={iconDelete} alt="Delete" />
          </Button>
        )}
      </div>
      <div className={styles.contentQuestion}>{`${
        numberQuestion ? t('commonQuestionBox.numberQuestion', { number: numberQuestion }) : ''
      } ${questionDetail?.content}`}</div>
      {questionDetail?.questionTypeId === QUESTION_TYPE.PICK_ONE && (
        <div className={styles.boxOption}>
          <div className={styles.textOption}>
            <span>{t('commonQuestionBox.pickOneOption')}</span>
          </div>
          <div
            className={classNames({
              [styles.listOption]: true,
              [styles.listOptionExam]: typeShow === TYPE_SHOW_QUESTION_BOX.EXAM,
            })}
          >
            {questionDetail?.questionContents?.map((option: any, indexOption: number) => (
              <Col span={12} className={styles.detailOption}>
                {typeShow === TYPE_SHOW_QUESTION_BOX.SEARCH && (
                  <div
                    className={classNames({
                      [styles.trueOption]: option?.isRight,
                      [styles.falseOption]: !option?.isRight,
                    })}
                  ></div>
                )}
                {typeShow === TYPE_SHOW_QUESTION_BOX.PREVIEW && (
                  <div className={styles.previewOption}>{TEXT_SHOW_INDEX_OPTION[indexOption]}</div>
                )}
                {typeShow === TYPE_SHOW_QUESTION_BOX.EXAM && (
                  <Input
                    // onChange={() => handleChangeCheckOptions(index)}
                    className={styles.radioBtn}
                    value={indexOption}
                    type="radio"
                    name={`checkOption${numberQuestion}`}
                    id={`question${numberQuestion}-option${indexOption}`}
                  />
                )}
                <div className={styles.contentOption}>{option?.answerContent}</div>
              </Col>
            ))}
          </div>
        </div>
      )}
      {questionDetail?.questionTypeId === QUESTION_TYPE.MULTI_PICK && (
        <div className={styles.boxOption}>
          <div className={styles.textOption}>
            <span>{t('commonQuestionBox.pickMultiOption')}</span>
          </div>
          <div
            className={classNames({
              [styles.listOption]: true,
              [styles.listOptionExam]: typeShow === TYPE_SHOW_QUESTION_BOX.EXAM,
            })}
          >
            {questionDetail?.questionContents?.map((option: any, indexOption: number) => (
              <Col span={12} className={styles.detailOption}>
                {typeShow === TYPE_SHOW_QUESTION_BOX.SEARCH && (
                  <div
                    className={classNames({
                      [styles.trueOption]: option?.isRight,
                      [styles.falseOption]: !option?.isRight,
                    })}
                  ></div>
                )}
                {typeShow === TYPE_SHOW_QUESTION_BOX.PREVIEW && (
                  <div className={styles.previewOption}>{TEXT_SHOW_INDEX_OPTION[indexOption]}</div>
                )}
                {typeShow === TYPE_SHOW_QUESTION_BOX.EXAM && (
                  <Input
                    // onChange={() => handleChangeCheckOptions(index)}
                    className={styles.radioBtn}
                    value={indexOption}
                    type="checkbox"
                    name={`checkOption${numberQuestion}`}
                    id={`question${numberQuestion}-option${indexOption}`}
                  />
                )}
                <div className={styles.contentOption}>{option?.answerContent}</div>
              </Col>
            ))}
          </div>
        </div>
      )}
    </Row>
  );
}
