import React from 'react';
// import Cookies from 'js-cookie';
import { Menu, Dropdown } from 'antd';
// import { useQueryClient } from 'react-query';
// import classNames from 'classnames';

import avatarImg from 'assets/images/avatar.svg';
import styles from './styles.module.scss';
// import useProfile from 'hooks/useProfile';
// import useToggleSideNav from 'hooks/useToggleSideNav';
import logoHeader from 'assets/images/logo-header.svg';

export default function PageHeader() {
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();
  // const profile = useProfile();
  // const collapsed = useToggleSideNav();

  // const routes = [
  //   {
  //     key: '1',
  //     text: 'ホーム',
  //     url: '/',
  //   },
  //   {
  //     key: '2',
  //     text: 'イベント一覧',
  //     url: '/',
  //   },
  //   {
  //     key: '3',
  //     text: '配信中のイベント',
  //     url: '/',
  //   },
  //   {
  //     key: '4',
  //     text: 'マイページ',
  //     url: '/',
  //   },
  // ];

  // const handleLogout = () => {
  //   Cookies.remove('token');
  //   Cookies.remove('refreshToken');
  //   navigate('/login');
  // };

  const menu = (
    <Menu style={{ minWidth: 200 }}>
      {/* <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Change Password</Menu.Item>
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item> */}
    </Menu>
  );

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.menuWrapper}>
        <div className={styles.logoHeader}>
          <img src={logoHeader} alt="logo top" />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className={styles.menuContent}>
          {/* {routes.map((route) => (
            <Menu.Item key={route.key}>
              <Link to={route.url}>{route.text}</Link>
            </Menu.Item>
          ))} */}
        </Menu>
        <div className={styles.searchBox}></div>
        {/* <div className={styles.cartBox}>
          <img src={cart} alt="cart" />
        </div> */}
        <div className={styles.menuItem}>
          <Dropdown overlay={menu} trigger={['click']}>
            <div className={styles.dropdownToggle}>
              <img className={styles.icon} src={avatarImg} alt="avatar user" />
              <span className={styles.userName}>Kanaye Naoko</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
