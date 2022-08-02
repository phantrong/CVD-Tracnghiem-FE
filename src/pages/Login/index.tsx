import React, { useState } from 'react';
import Cookies from 'js-cookie';
import _ from 'lodash';
import styles from './style.module.scss';
import { Input, Button, Form, Row, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import { login } from 'api/authentication';
import { handleErrorMessage } from 'helper';
import { AxiosError } from 'axios';
import { ERROR_RESPONSE } from 'contants/constants';

interface LoginProps {
  handleShowSignUp: () => void;
  handleShowForgotPassword: () => void;
}

export default function Login(props: LoginProps) {
  const { handleShowSignUp, handleShowForgotPassword } = props;
  const { t } = useTranslation();
  const [form]: FormInstance<any>[] = Form.useForm();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const removeErrorOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFields([
      {
        name: e.target.name,
        errors: [],
      },
    ]);
  };

  const handleSubmit = async (payload: any) => {
    setIsLoadingSubmit(true);
    const params = _.pick(payload, ['username', 'password']);
    try {
      const data = await login(params);
      const { token, refreshToken } = data.data;
      Cookies.set('token', token, {
        expires: undefined,
      });
      Cookies.set('refreshToken', refreshToken, {
        expires: undefined,
      });
      setIsLoadingSubmit(false);
    } catch (error) {
      const errorMessage = error as AxiosError;
      if (errorMessage.response?.status === ERROR_RESPONSE) {
        form.setFields([
          {
            name: 'username',
            errors: errorMessage.response?.data?.errors?.username
              ? [errorMessage.response?.data?.errors?.username]
              : [],
          },
          {
            name: 'password',
            errors: errorMessage.response?.data?.errors?.password
              ? [errorMessage.response?.data?.errors?.password]
              : [],
          },
        ]);
      } else {
        handleErrorMessage(error);
      }
      setIsLoadingSubmit(false);
    }
  };

  return (
    <Form onFinish={handleSubmit} form={form} hideRequiredMark className={styles.loginForm}>
      <Row justify="center">
        <h2>{t('modalLogin.title')}</h2>
      </Row>
      <Form.Item label={t('modalLogin.username')} name="username" className={styles.form} labelCol={{ span: 24 }}>
        <Input
          name="username"
          onChange={(e) => removeErrorOnChange(e)}
          placeholder={t('modalLogin.username')}
          className={styles.input}
        />
      </Form.Item>
      <Form.Item label={t('modalLogin.password')} name="password" className={styles.form} labelCol={{ span: 24 }}>
        <Input.Password
          name="password"
          onChange={(e) => removeErrorOnChange(e)}
          placeholder={t('modalLogin.password')}
          className={styles.input}
        />
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }} className={styles.form}>
        <Button block type="primary" htmlType="submit" className={styles.btnSubmit} loading={isLoadingSubmit}>
          {t('common.login').toUpperCase()}
        </Button>
      </Form.Item>
      <Row className={styles.cantLogin}>
        <div className={styles.notHaveAccount}>
          {t('modalLogin.notHaveAccount')}
          <span className={styles.showPopup} onClick={handleShowSignUp}>
            {t('common.signUp')}
          </span>
        </div>
        <div className={styles.forgotPassword}>
          <span className={styles.showPopup} onClick={handleShowForgotPassword}>
            {t('modalLogin.forgotPassword')}
          </span>
        </div>
      </Row>
    </Form>
  );
}
