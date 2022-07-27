import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import _ from 'lodash';
import styles from './style.module.scss';
import { Card, Input, Button, Form, Row, Checkbox } from 'antd';
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
        expires: payload.rememberMe ? 999999 : undefined,
      });
      Cookies.set('refreshToken', refreshToken, {
        expires: payload.rememberMe ? 999999 : undefined,
      });
      navigate('/');
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const isAuthenticated = !!Cookies.get('token');
  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className={styles.loginContainer}>
      <Card bordered className={styles.loginForm}>
        <Form onFinish={handleSubmit}>
          <Row justify="center">
            <h2>{t('common.login')}</h2>
          </Row>
          <Form.Item
            label={t('common.username')}
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
            label={t('common.password')}
            name="password"
            rules={[{ required: true, message: t('validate.passwordRequired') }]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox> {t('common.rememberMe')}</Checkbox>
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
          <div>
            <p>Account: admin / 123456</p>
          </div>
        </Form>
      </Card>
    </div>
  );
}
