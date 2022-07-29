import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import _ from 'lodash';
import styles from './style.module.scss';
import { Input, Button, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { login } from 'api/authentication';
import { handleErrorMessage } from 'helper';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToSignUp = () => navigate('/sign-up');
  const handleSubmit = async (payload: any) => {
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
      navigate('/');
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const isAuthenticated = !!Cookies.get('token');
  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <Form onFinish={handleSubmit} className={styles.loginForm}>
      <Row justify="center">
        <h2>{t('modalLogin.title')}</h2>
      </Row>
      <Form.Item
        label={t('modalLogin.username')}
        name="username"
        rules={[
          {
            required: true,
            message: t('validate.usernameRequired'),
          },
        ]}
        labelAlign="left"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t('modalLogin.password')}
        name="password"
        rules={[{ required: true, message: t('validate.passwordRequired') }]}
        labelAlign="left"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }}>
        <Button block type="primary" htmlType="submit">
          {t('common.login').toUpperCase()}
        </Button>
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }}>
        <Button block type="dashed" htmlType="button" onClick={navigateToSignUp}>
          {t('common.signUp').toUpperCase()}
        </Button>
      </Form.Item>
    </Form>
  );
}
