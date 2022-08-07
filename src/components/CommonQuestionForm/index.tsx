import React, { useCallback, useMemo, useState } from 'react';
import { Form, Row, Select, FormInstance, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './style.module.scss';
import {
  MAX_LENGTH_INPUT,
  QUESTION_STATUS,
  QUESTION_TYPE,
  OPTION_QUESTION_TYPE_FILL_TEXTBOX,
} from 'contants/constants';
import TextArea from 'antd/lib/input/TextArea';

import IconAdd from '../../assets/images/icon-add.svg';
import IconDelete from '../../assets/images/icon-delete.svg';
import {
  useGetListContentQuestion,
  useGetListGradeQuestion,
  useGetListGroupQuestion,
  useGetListStatustQuestion,
  useGetListSubjectQuestion,
  useGetListTypeQuestion,
} from 'hooks/useQuestion';
import { isConstructorDeclaration } from 'typescript';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const listFillTextBox: TypeFillTextBoxInterface[] = [
  {
    id: OPTION_QUESTION_TYPE_FILL_TEXTBOX.EXACTLY,
    name: 'Chính xác',
  },
  {
    id: OPTION_QUESTION_TYPE_FILL_TEXTBOX.CONTAINS,
    name: 'Chứa đựng',
  },
];

const defaultFormValue: InitialValueQuestionFormInterface = {
  type: QUESTION_TYPE.PICK_ONE,
  category: undefined,
  grade: undefined,
  group: undefined,
  status: QUESTION_STATUS.ACTIVE,
  content: '',
  checkOptions: [undefined, undefined, undefined, undefined],
  options: [undefined, undefined, undefined, undefined],
};

export default function CommonQuestionForm() {
  const { t } = useTranslation();
  const [form]: FormInstance<any>[] = Form.useForm();
  const [checkedOptions, setCheckOptions] = useState<number[]>([]);
  const [typeOption, setTypeOption] = useState<number>(QUESTION_TYPE.PICK_ONE);

  const { data: listType, isLoading: isLoadingListType } = useGetListTypeQuestion({});
  const { data: listSubject, isLoading: isLoadingListSubject } = useGetListSubjectQuestion({});
  const { data: listGrade, isLoading: isLoadingListGrade } = useGetListGradeQuestion({});
  const { data: listGroup, isLoading: isLoadingListGroup } = useGetListGroupQuestion({});
  const { data: listStatus, isLoading: isLoadingListStatus } = useGetListStatustQuestion({});
  const { data: listQuestionContent, isLoading: isLoadingListQuestionContent } = useGetListContentQuestion({});
  console.log('listQuestionContent', listQuestionContent);

  const handleChangeTypeQuestion = (value: number) => {
    setTypeOption(value);
  };

  const handleChangeCheckOptions = useCallback(
    (index: number) => {
      if (typeOption === QUESTION_TYPE.PICK_ONE) {
        setCheckOptions([index]);
      } else if (typeOption === QUESTION_TYPE.MULTI_PICK) {
        setCheckOptions([...checkedOptions, index]);
      }
    },
    [typeOption, checkedOptions]
  );

  const handleSubmitAddQuestion = () => {
    console.log(form.getFieldsValue(), checkedOptions);
  };

  const optionSelectType = useMemo(() => {
    return listType?.map((type: TypeQuestionInterface) => (
      <Option key={'type' + type.id} value={type.id}>
        {type.name}
      </Option>
    ));
  }, [listType]);

  const optionSelectCategory = useMemo(() => {
    return listSubject?.map((category: CategoryInterface) => (
      <Option key={'category' + category.id} value={category.id}>
        {category.name}
      </Option>
    ));
  }, [listSubject]);

  const optionSelectGrade = useMemo(() => {
    return listGrade?.map((grade: GradeInterface) => (
      <Option key={'grade' + grade.id} value={grade.id}>
        {grade.name}
      </Option>
    ));
  }, [listGrade]);

  const optionSelectTypeFillText = useMemo(() => {
    return listFillTextBox?.map((type: TypeFillTextBoxInterface) => (
      <Option key={'fill' + type.id} value={type.id}>
        {type.name}
      </Option>
    ));
  }, [listFillTextBox]);

  const optionSelectGroup = useMemo(() => {
    return listGroup?.map((group: GroupQuestionInterface) => (
      <Option key={'group' + group.id} value={group.id}>
        {group.name}
      </Option>
    ));
  }, [listGroup]);

  const optionSelectStatus = useMemo(() => {
    return listStatus?.map((group: GroupQuestionInterface) => (
      <Option key={'status' + group.id} value={group.id}>
        {group.name}
      </Option>
    ));
  }, [listStatus]);

  return (
    <Row justify="center" className={styles.mainForm}>
      <Row justify="center">
        <h2>{t('questionForm.addQuestion')}</h2>
      </Row>
      <Form
        form={form}
        initialValues={defaultFormValue}
        onFinish={handleSubmitAddQuestion}
        hideRequiredMark
        className={styles.groupForm}
      >
        <Row className={styles.formSelect}>
          <Form.Item name="type" label={t('questionForm.typeQuestion')} className={styles.form} labelCol={{ span: 24 }}>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingListType}
              placeholder={t('questionForm.typeQuestion')}
              onChange={handleChangeTypeQuestion}
            >
              {optionSelectType}
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label={t('questionForm.category')}
            className={styles.form2}
            labelCol={{ span: 24 }}
          >
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingListSubject}
              placeholder={t('questionForm.category')}
            >
              {optionSelectCategory}
            </Select>
          </Form.Item>
        </Row>
        <Row className={styles.formSelect}>
          <Form.Item name="grade" label={t('questionForm.grade')} className={styles.form} labelCol={{ span: 24 }}>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingListGrade}
              placeholder={t('questionForm.grade')}
            >
              {optionSelectGrade}
            </Select>
          </Form.Item>
          <Form.Item
            name="group"
            label={t('questionForm.groupQuestion')}
            className={styles.form2}
            labelCol={{ span: 24 }}
          >
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingListGroup}
              placeholder={t('questionForm.groupQuestion')}
            >
              {optionSelectGroup}
            </Select>
          </Form.Item>
        </Row>
        <Form.Item name="content" label={t('questionForm.content')} className={styles.form} labelCol={{ span: 24 }}>
          <TextArea
            placeholder={t('questionForm.hereQuestionContent')}
            autoSize={{ minRows: 5, maxRows: 5 }}
            maxLength={MAX_LENGTH_INPUT}
            className={styles.input}
          />
        </Form.Item>
        <Row className={styles.formListOption}>
          <Form.List
            name="options"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 2) {
                    return Promise.reject(new Error('Phải có ít nhất 2 phương án.'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index, ...resetField) => (
                  <div key={field.key} className={styles.formOption}>
                    {typeOption === QUESTION_TYPE.PICK_ONE && (
                      <Form.Item
                        name={[field.name, 'checkOption']}
                        className={styles.formCheck}
                        style={{ width: '10%' }}
                        {...resetField}
                        fieldKey={[field.key, 'checkOption']}
                      >
                        <Input
                          onChange={() => handleChangeCheckOptions(index)}
                          className={styles.radioBtn}
                          value={index}
                          type="radio"
                          name="checkOption"
                          id={`${field.key}`}
                        />
                      </Form.Item>
                    )}
                    {typeOption === QUESTION_TYPE.MULTI_PICK && (
                      <Form.Item
                        name={[field.name, 'checkOption']}
                        className={styles.formCheck}
                        style={{ width: '10%' }}
                        {...resetField}
                        fieldKey={[field.key, 'checkOption']}
                      >
                        <Input
                          onChange={() => handleChangeCheckOptions(index)}
                          className={styles.radioBtn}
                          value={index}
                          type="checkbox"
                          name="checkOption"
                          id={`${field.key}`}
                        />
                      </Form.Item>
                    )}
                    {typeOption === QUESTION_TYPE.FILL_TEXTBOX && (
                      <Form.Item
                        name={[field.name, 'checkOption']}
                        className={styles.formCheck}
                        style={{ width: '30%', marginRight: '10px' }}
                        {...resetField}
                        fieldKey={[field.key, 'checkOption']}
                      >
                        <Select
                          className={styles.select}
                          bordered={false}
                          defaultValue={OPTION_QUESTION_TYPE_FILL_TEXTBOX.EXACTLY}
                        >
                          {optionSelectTypeFillText}
                        </Select>
                      </Form.Item>
                    )}
                    <Form.Item
                      {...formItemLayout}
                      className={styles.formInput}
                      style={{ width: `${typeOption === QUESTION_TYPE.FILL_TEXTBOX ? '70%' : '90%'}` }}
                    >
                      <Form.Item {...field} name={[field.name, 'option']} {...resetField} className={styles.form}>
                        <Input placeholder={t('questionForm.option', { number: index + 1 })} className={styles.input} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <img height={24} width={24} src={IconDelete} alt="delete" onClick={() => remove(field.name)} />
                      ) : null}
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    onClick={() => add()}
                    className={styles.btnAddOption}
                    icon={<img height={16} width={16} src={IconAdd} alt="add" />}
                  >
                    {t('questionForm.addOption')}
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Row>
        <Form.Item name="status" label={t('myQuestion.status')} className={styles.form} labelCol={{ span: 24 }}>
          <Select
            placeholder={t('myQuestion.status')}
            loading={isLoadingListStatus}
            className={styles.select}
            bordered={false}
          >
            {optionSelectStatus}
          </Select>
        </Form.Item>
        <Form.Item labelCol={{ span: 24 }} className={styles.form}>
          <Button block type="primary" htmlType="submit" className={styles.btnSubmit}>
            {t('common.save').toUpperCase()}
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
}
