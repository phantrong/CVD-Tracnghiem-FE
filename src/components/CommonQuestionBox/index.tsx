import React from 'react';
import { Button, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './style.module.scss';
import { OPTION_QUESTION_TYPE, OPTION_QUESTION_TYPE_FILL_TEXTBOX, QUESTION_TYPE } from 'contants/constants';
import classNames from 'classnames';
import { getQuestionTypeText } from 'helper';

import iconAdd from 'assets/images/add-circle.svg';
import iconDelete from 'assets/images/icon-delete.svg';

interface CommonQuestionBoxProps {
  questionDetail: QuestionDetailInterface;
  handleAddQuestion?: (question: QuestionDetailInterface) => void;
  handleRemoveQuestion?: (question: QuestionDetailInterface) => void;
}

export default function CommonQuestionBox(props: CommonQuestionBoxProps) {
  const { t } = useTranslation();
  const { questionDetail, handleAddQuestion, handleRemoveQuestion } = props;

  return (
    <Row justify="center" className={styles.mainBox}>
      <div className={styles.actionQuestion}>
        <div className={styles.typeQuestion}>{getQuestionTypeText(questionDetail.type)}</div>
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
      <div className={styles.contentQuestion}>{questionDetail.content}</div>
      {questionDetail.type === QUESTION_TYPE.PICK_ONE && (
        <div className={styles.boxOption}>
          <div className={styles.textOption}>
            <span>{t('commonQuestionBox.pickOneOption')}</span>
          </div>
          <div className={styles.listOption}>
            {questionDetail.options.map((option: OptionQuestionDetailInterface) => (
              <Col span={12} className={styles.detailOption}>
                <div
                  className={classNames({
                    [styles.trueOption]: option.type === OPTION_QUESTION_TYPE.TRUE,
                    [styles.falseOption]: option.type === OPTION_QUESTION_TYPE.FALSE,
                  })}
                ></div>
                <div className={styles.contentOption}>{option.content}</div>
              </Col>
            ))}
          </div>
        </div>
      )}
      {questionDetail.type === QUESTION_TYPE.MULTI_PICK && (
        <div className={styles.boxOption}>
          <div className={styles.textOption}>
            <span>{t('commonQuestionBox.pickMultiOption')}</span>
          </div>
          <div className={styles.listOption}>
            {questionDetail.options.map((option: OptionQuestionDetailInterface) => (
              <Col span={12} className={styles.detailOption}>
                <div
                  className={classNames({
                    [styles.trueOption]: option.type === OPTION_QUESTION_TYPE.TRUE,
                    [styles.falseOption]: option.type === OPTION_QUESTION_TYPE.FALSE,
                  })}
                ></div>
                <div className={styles.contentOption}>{option.content}</div>
              </Col>
            ))}
          </div>
        </div>
      )}
      {questionDetail.type === QUESTION_TYPE.FILL_TEXTBOX && (
        <div className={styles.boxOption}>
          <div className={styles.textOption}>
            <span>{t('commonQuestionBox.trueOption')}</span>
          </div>
          <div className={styles.listOption}>
            {questionDetail.options.map(
              (option: OptionQuestionDetailInterface) =>
                option.type === OPTION_QUESTION_TYPE_FILL_TEXTBOX.EXACTLY && (
                  <Col span={24} className={styles.detailOption}>
                    <div className={styles.trueOption}></div>
                    <div className={styles.contentOption}>{option.content}</div>
                  </Col>
                )
            )}
          </div>
          <div className={styles.textOption}>
            <span>{t('commonQuestionBox.otherOption')}</span>
          </div>
          <div className={styles.listOption}>
            {questionDetail.options.map(
              (option: OptionQuestionDetailInterface) =>
                option.type === OPTION_QUESTION_TYPE_FILL_TEXTBOX.CONTAINS && (
                  <Col span={24} className={styles.detailOption}>
                    <div className={styles.otherOption}></div>
                    <div className={styles.contentOption}>{option.content}</div>
                  </Col>
                )
            )}
          </div>
        </div>
      )}
    </Row>
  );
}
