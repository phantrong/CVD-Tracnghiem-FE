import React, { useEffect, useMemo } from 'react';
import { Form, Row, Select, FormInstance, Input, Button, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './style.module.scss';
import { MAX_LENGTH_INPUT, QUESTION_STATUS, QUESTION_TYPE } from 'contants/constants';
import TextArea from 'antd/lib/input/TextArea';

import IconAdd from '../../assets/images/icon-add.svg';
import IconDelete from '../../assets/images/icon-delete.svg';

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

interface CommonQuestionFormProps {
  handleShowSignUp: () => void;
}

export default function CommonQuestionForm() {
  const { t } = useTranslation();
  const [form]: FormInstance<any>[] = Form.useForm();

  const isLoadingListType = false;
  const listType: TypeQuestionInterface[] = [
    {
      id: 1,
      name: 'Chọn phương án đúng nhất',
    },
    {
      id: 2,
      name: 'Chọn nhiều phương án',
    },
    {
      id: 3,
      name: 'Điền vào chỗ trống',
    },
  ];

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

  const isLoadingListGrade = false;
  const listGrade: GradeInterface[] = [
    {
      id: 1,
      name: 'Lớp 10',
    },
    {
      id: 2,
      name: 'Lớp 11',
    },
  ];

  const isLoadingListGroup = false;
  const listGroup: GroupQuestionInterface[] = [
    {
      id: 1,
      name: 'Câu hỏi hiểu biết',
    },
    {
      id: 2,
      name: 'Câu hỏi nâng cao',
    },
  ];

  const handleSubmitAddQuestion = () => {
    console.log(form.getFieldsValue());
  };

  const optionSelectType = useMemo(() => {
    return listType.map((type: TypeQuestionInterface) => (
      <Option key={'type' + type.id} value={type.id}>
        {type.name}
      </Option>
    ));
  }, [listType]);

  const optionSelectCategory = useMemo(() => {
    return listCategory.map((category: CategoryInterface) => (
      <Option key={'category' + category.id} value={category.id}>
        {category.name}
      </Option>
    ));
  }, [listCategory]);

  const optionSelectGrade = useMemo(() => {
    return listGrade.map((grade: GradeInterface) => (
      <Option key={'grade' + grade.id} value={grade.id}>
        {grade.name}
      </Option>
    ));
  }, [listGrade]);

  const optionSelectGroup = useMemo(() => {
    return listGroup.map((group: GroupQuestionInterface) => (
      <Option key={'group' + group.id} value={group.id}>
        {group.name}
      </Option>
    ));
  }, [listGroup]);

  useEffect(() => {
    console.log(form.getFieldsValue());
  }, [form]);

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
              loading={isLoadingListCategory}
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
                    <Form.Item
                      name={[field.name, 'checkOption']}
                      className={styles.formCheck}
                      style={{ width: '10%' }}
                      {...resetField}
                      fieldKey={[field.key, 'checkOption']}
                    >
                      <Input
                        onChange={(e) => console.log(e.currentTarget.value)}
                        className={styles.radioBtn}
                        value={index}
                        type="radio"
                        name="checkOption"
                        id={`${field.key}`}
                      />
                    </Form.Item>
                    <Form.Item {...formItemLayout} className={styles.formInput} style={{ width: '90%' }}>
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
        <Form.Item name="status" label={t('question.status')} className={styles.form} labelCol={{ span: 24 }}>
          <Select placeholder={t('question.status')} className={styles.select} bordered={false}>
            <Option value={QUESTION_STATUS.ACTIVE} key={'optionStatus' + QUESTION_STATUS.ACTIVE}>
              {t('question.active')}
            </Option>
            <Option value={QUESTION_STATUS.INACTIVE} key={'optionStatus' + QUESTION_STATUS.INACTIVE}>
              {t('question.inactive')}
            </Option>
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
