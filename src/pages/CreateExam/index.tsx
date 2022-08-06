import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Select, Upload } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import SideNav from 'components/SideNav';
import {
  EXAM_STATUS,
  OPTION_QUESTION_TYPE,
  OPTION_QUESTION_TYPE_FILL_TEXTBOX,
  QUESTION_TYPE,
  TYPE_IMAGE,
} from 'contants/constants';
import CommonQuestionBox from 'components/CommonQuestionBox';

import iconSearch from 'assets/images/SearchFilled.svg';
import iconAdd from 'assets/images/add-white.svg';
import imageDefault from 'assets/images/image-default.svg';
import { validateSizeImg, validateTypeImg } from 'helper';
import { UploadChangeParam } from 'antd/lib/upload';

const { Option } = Select;

const defaultFilter: IFilterListQuestion = {
  typeQuestion: undefined,
  category: undefined,
  grade: undefined,
  group: undefined,
  keyWord: '',
  page: 1,
  per_page: 10,
};

export default function CreateExam() {
  const { t } = useTranslation();

  const [filter, setFilter] = useState<IFilterListQuestion>(defaultFilter);
  const [isModalFindQuestion, setIsModalFindQuestion] = useState<boolean>(false);
  const [listQuestionSelected, setListQuestionSelected] = useState<QuestionDetailInterface[]>([]);
  const [avatarURL, setAvatarURL] = useState<string>(imageDefault);
  const [fileAvatar, setFileAvatar] = useState<string>();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  // const { data: listCategory, isLoading: isLoadingCategory }: any = {}

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

  const isLoadingExam = false;
  const listExam: FindExamInterface[] = [
    {
      id: 1,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 1',
      totalQuestion: 30,
    },
    {
      id: 2,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 2',
      totalQuestion: 30,
    },
    {
      id: 3,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 3',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
      name: 'bài thi 4',
      totalQuestion: 30,
    },
  ];

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

  const isLoadingQuetionsSelected = false;
  const questionsSelected: QuestionDetailInterface[] = [];

  const handleChangeAvatar = useCallback(
    (info: UploadChangeParam<any>) => {
      if (!validateTypeImg(info.file.type, TYPE_IMAGE)) {
        message.error(t('myPageProfile.avatar.errorType'));
      } else if (!validateSizeImg(info.file.size)) {
        message.error(t('myPageProfile.avatar.errorSize'));
      } else {
        setAvatarURL(URL.createObjectURL(info.file));
        URL.revokeObjectURL(info.file);
        setFileAvatar(info.file);
      }
    },
    [t]
  );

  const handleDeleteAvatar = () => {
    setAvatarURL(imageDefault);
    setFileAvatar('');
  };

  const handleChangeTypeQuestion = useCallback(
    (value: number) => {
      setFilter({
        ...filter,
        page: 1,
        typeQuestion: value,
      });
    },
    [filter]
  );

  const handleChangeGrade = useCallback(
    (value: number) => {
      setFilter({
        ...filter,
        page: 1,
        grade: value,
      });
    },
    [filter]
  );

  const handleChangeGroup = useCallback(
    (value: number) => {
      setFilter({
        ...filter,
        page: 1,
        group: value,
      });
    },
    [filter]
  );

  const handleChangeCategory = useCallback(
    (value: number) => {
      setFilter({
        ...filter,
        page: 1,
        category: value,
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

  const handleAddQuestion = useCallback(
    (question: QuestionDetailInterface) => {
      let addQuestion = question;
      addQuestion.uuid = new Date().toISOString();
      setListQuestionSelected([...listQuestionSelected, question]);
      message.success(t('createExam.addQuestionSuccess'));
    },
    [listQuestionSelected]
  );

  const handleRemoveQuestion = useCallback(
    (question: QuestionDetailInterface) => {
      setListQuestionSelected(() =>
        listQuestionSelected.filter((item: QuestionDetailInterface) => {
          return item.uuid !== question.uuid;
        })
      );
      message.success(t('createExam.removeQuestionSuccess'));
    },
    [listQuestionSelected]
  );

  const handleSubmit = (payload: any) => {
    console.log(payload);
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

  const listExamShow = useMemo(() => {
    return listExam.map((exam: FindExamInterface) => (
      <div className={styles.boxExam}>
        <img src={exam.image} alt="exam" />
        <div>{`${exam.name} (${exam.totalQuestion} câu hỏi)`}</div>
      </div>
    ));
  }, [listExam]);

  const listQuestionShow = useMemo(() => {
    return listQuestion.map((question: QuestionDetailInterface) => (
      <CommonQuestionBox questionDetail={question} handleAddQuestion={() => handleAddQuestion(question)} />
    ));
  }, [listQuestion, handleAddQuestion]);

  const listQuestionSelectedShow = useMemo(() => {
    return listQuestionSelected.map((question: QuestionDetailInterface) => (
      <CommonQuestionBox questionDetail={question} handleRemoveQuestion={() => handleRemoveQuestion(question)} />
    ));
  }, [listQuestionSelected, handleRemoveQuestion]);

  useEffect(() => {
    setListQuestionSelected(questionsSelected);
  }, []);

  return (
    <div className={styles.createExam}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{t('createExam.title')}</h2>
        </Col>
      </Row>
      <Row justify="space-between" className={styles.formExam}>
        <Col span={16} className={styles.formAddExam}>
          <Button
            block
            type="primary"
            htmlType="button"
            className={styles.btnAdd}
            onClick={() => setIsModalFindQuestion(true)}
          >
            {t('createExam.addQuestionNew').toUpperCase()} <img height={16} width={16} src={iconAdd} alt="Add" />
          </Button>
          <Row className={styles.listExamQuestion}>{listQuestionSelectedShow}</Row>
        </Col>
        <Col span={8} className={styles.formInfoExam}>
          <Row className={styles.rowUploadAvatar}>
            <img src={avatarURL} className={styles.avatar} alt="Avatar" />
            <Row className={styles.rowBtnUpload}>
              <Col span={12} className={styles.colBtnUpload}>
                <Upload
                  listType="picture"
                  showUploadList={false}
                  onChange={handleChangeAvatar}
                  beforeUpload={() => {
                    return false;
                  }}
                  multiple={false}
                  maxCount={1}
                  accept=".jpg,.jpeg,.png,.heic,.jfif"
                  className={styles.uploadAvatar}
                >
                  <Button type="primary" htmlType="button" className={styles.btnUpload}>
                    {t('createExam.addImage')}
                  </Button>
                </Upload>
              </Col>
              <Col span={12} className={styles.colBtnDelete}>
                <Button
                  type="primary"
                  htmlType="button"
                  className={styles.btnDeleteAvatar}
                  onClick={handleDeleteAvatar}
                >
                  {t('createExam.removeImage')}
                </Button>
              </Col>
            </Row>
          </Row>
          <Form onFinish={handleSubmit} className={styles.examForm}>
            <Form.Item labelCol={{ span: 24 }} name="examName" label={t('createExam.examName')} className={styles.form}>
              <Input className={styles.input} placeholder={t('createExam.examName')} />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label={t('createExam.examStatus')}
              name="statusExam"
              className={styles.form}
              initialValue={EXAM_STATUS.DRAFT}
            >
              <Select placeholder={t('createExam.examStatus')} className={styles.select} bordered={false}>
                <Option value={EXAM_STATUS.DRAFT} key={'optionStatus' + EXAM_STATUS.DRAFT}>
                  {t('createExam.draft')}
                </Option>
                <Option value={EXAM_STATUS.ACTIVE} key={'optionStatus' + EXAM_STATUS.ACTIVE}>
                  {t('createExam.active')}
                </Option>
                <Option value={EXAM_STATUS.INACTIVE} key={'optionStatus' + EXAM_STATUS.INACTIVE}>
                  {t('createExam.inactive')}
                </Option>
              </Select>
            </Form.Item>
            <Button block type="primary" htmlType="submit" className={styles.btnSubmit} loading={isLoadingSubmit}>
              {t('createExam.create').toUpperCase()}
            </Button>
          </Form>
        </Col>
      </Row>
      <Modal
        className={styles.modalQuestion}
        visible={isModalFindQuestion}
        onCancel={() => setIsModalFindQuestion(false)}
        closable={true}
        footer={false}
        centered
      >
        <Row className={styles.formSearchQuestion}>
          <Col span={24} className={styles.colKeyWord}>
            <Input
              className={styles.input}
              prefix={<img src={iconSearch} alt="search" />}
              placeholder={t('common.find')}
              value={filter.keyWord}
              onChange={(e) => handleChangeKeyWord(e.currentTarget.value)}
            />
          </Col>
          <Col span={24} className={styles.colFilterSelect}>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingListType}
              placeholder={t('questionForm.typeQuestion')}
              onChange={handleChangeTypeQuestion}
            >
              {optionSelectType}
            </Select>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingListCategory}
              placeholder={t('questionForm.category')}
              onChange={handleChangeCategory}
            >
              {optionSelectCategory}
            </Select>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingListGrade}
              placeholder={t('questionForm.grade')}
              onChange={handleChangeGrade}
            >
              {optionSelectGrade}
            </Select>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingListGroup}
              placeholder={t('questionForm.groupQuestion')}
              onChange={handleChangeGroup}
            >
              {optionSelectGroup}
            </Select>
          </Col>
          <Col span={8} className={styles.showExam}>
            <Col span={24} className={styles.showResultFindExam}>
              {t('createExam.showResultFindExam', { keyWord: filter.keyWord })}
            </Col>
            <Col span={24} className={styles.listExam}>
              {listExamShow}
            </Col>
          </Col>
          <Col span={16} className={styles.showQuestion}>
            {listQuestionShow}
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
