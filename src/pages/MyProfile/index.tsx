import React, { useCallback, useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, FormInstance, Select, Upload, message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { RuleObject } from 'antd/lib/form';
import Cookies from 'js-cookie';
import { useMutation, useQueryClient, useIsFetching } from 'react-query';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import styles from './style.module.scss';
import { updateProfile } from 'api/profile';
import {validateSizeImg,validateTypeImg,  handleErrorMessage, compressionHeicImageFile, trimSpaceInput } from 'helper';
import SideNav from 'components/SideNav';

import AvatarDefault from '../../assets/images/avatar-default.svg';
import { GET_CUSTOMER_PROFILE } from 'contants/keyQuery';
import { TOKEN_CUSTOMER, TYPE_IMAGE } from 'contants/constants';

interface IDataResponseprofile {
  message: string;
  success: boolean;
}

const { Option } = Select;
const { confirm } = Modal;

export default function MyPageProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get(TOKEN_CUSTOMER);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({
    queryKey: GET_CUSTOMER_PROFILE,
  });
  const [profile, setProfile] = useState<any>();
  const [profileForm, setProfileForm] = useState<any>({
    name: profile?.name || ''
  });
  const [form]: FormInstance<any>[] = Form.useForm();
  const [isLoadingBtnSubmitProfile, setIsLoadingBtnSubmitProfile] = useState<boolean>(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);
  const [avatarURL, setAvatarURL] = useState<string>(AvatarDefault);
  const [fileAvatar, setFileAvatar] = useState<string | Blob>();

  // const { mutate: postUpdateProfile } = useMutation((params: FormData) => updateProfile(params), {
  //   onSuccess: (response: IDataResponseprofile) => {
  //     if (response.success) {
  //       message.success(t('myPageProfile.msgSuccessSubmit'));
  //     }
  //     setIsLoadingBtnSubmitProfile(false);
  //     queryClient.refetchQueries(GET_PROFILE_USER);
  //   },
  //   onError: (error) => {
  //     handleErrorMessage(error);
  //     setIsLoadingBtnSubmitProfile(false);
  //   },
  // });

  const handleChangeAvatar = useCallback(
    (info: UploadChangeParam<any>) => {
      setIsLoadingAvatar(true);
      if (!validateTypeImg(info.file.type, TYPE_IMAGE)) {
        message.error(t('myPageProfile.avatar.errorType'));
      } else if (!validateSizeImg(info.file.size)) {
        message.error(t('myPageProfile.avatar.errorSize'));
      } else {
        compressionHeicImageFile(info, setAvatarURL, setFileAvatar, setIsLoadingAvatar);
      }
    },
    [t]
  );

  const handleDeleteAvatar = () => {
    setAvatarURL(AvatarDefault);
    setFileAvatar('');
  };

  const handleTrimSpaceInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    form.setFieldsValue({
      [e.target.name]: trimSpaceInput(e.target.value),
    });
  };

  const handleClickBtnUpgradeShop = () => {
    if (profile?.is_staff) {
      confirm({
        title: (
          <div>
            <div>{t('myPageProfile.isStaff')}</div>
            <div>{t('myPageProfile.cantUpgradeShop')}</div>
          </div>
        ),
        okText: t('common.confirmation'),
        okCancel: false,
        icon: <></>,
        className: 'modal-confirm-normal',
        centered: true,
        okButtonProps: {
          className: 'only-ok-btn',
        },
      });
    } else {
      navigate('/my-page/upgrade-shop');
    }
  };

  const handleSubmitForm = (payload: any) => {
    setIsLoadingBtnSubmitProfile(true);
    const formData: FormData = new FormData();
    formData.append('name', payload.name);
    if (fileAvatar) {
      formData.append('avatar', fileAvatar);
    } else if (avatarURL === AvatarDefault) {
      formData.append('avatar', '');
    }
    // postUpdateProfile(formData);
    console.log(formData);

  };

  useEffect(() => {
    if (isFetching) return;
    const profileResponse: any = queryClient.getQueryData([
      GET_CUSTOMER_PROFILE,
      isAuthenticated,
    ]);
    setProfile(profileResponse);
  }, [isFetching, queryClient, isAuthenticated]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile?.name || '',
      });
      setAvatarURL(profile?.avatar || AvatarDefault);
    }
  }, [profile]);

  useEffect(() => {
    form.resetFields();
  }, [profileForm, form]);

  return (
    <div className={styles.myPageProfile}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <h2>{t('myPageProfile.titlePage')}</h2>
      </Row>
      <Form
        className={styles.formProfile}
        form={form}
        initialValues={profileForm}
        onFinish={handleSubmitForm}
        scrollToFirstError={true}
      >
        <Row className={styles.rowForm}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.colAvatar}>
            <h3>
              <strong>{t('myPageProfile.avatar.title')}</strong>
            </h3>
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
                    accept=".jpg,.jpeg,.png,.heic,.jfif,.gif"
                    className={styles.uploadAvatar}
                  >
                    <Button type="primary" htmlType="button" className={styles.btnUpload} loading={isLoadingAvatar}>
                      {t('myPageProfile.avatar.btnUpload')}
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
                    {t('myPageProfile.avatar.btnDelete')}
                  </Button>
                </Col>
              </Row>
              <div className={styles.textValidate}>{t('myPageProfile.avatar.textMb')}</div>
              <div className={styles.textValidate}>{t('myPageProfile.avatar.textType')}</div>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.colFormProfile}>
            <Row className={styles.rowName}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  className={styles.inputFormProfile}
                  colon={false}
                  name="name"
                >
                  <Input
                    placeholder={t('signUp.form.placeholderLastName')}
                    className={styles.inputProfile}
                    name="name"
                    onBlur={handleTrimSpaceInput}
                  />
                </Form.Item>
            </Row>
          </Col>
        </Row>
        <Row className={styles.rowButton}>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item labelCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.btnSubmitProfile}
                loading={isLoadingBtnSubmitProfile}
              >
                {t('myPageProfile.btnSubmit')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
