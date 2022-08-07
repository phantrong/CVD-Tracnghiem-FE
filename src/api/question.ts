import { sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getListGradeQuestion = (params: any) => sendPost('/rpc/tracnghiem/question/single-list-grade', params);
export const getListGroupQuestion = (params: any) =>
  sendPost('/rpc/tracnghiem/question/single-list-question-group', params);
export const getListStatusQuestion = (params: any) => sendPost('/rpc/tracnghiem/question/single-list-status', params);
export const getListSubjectQuestion = (params: any) => sendPost('/rpc/tracnghiem/question/single-list-subject', params);
export const getListContentQuestion = (params: any) =>
  sendPost('/rpc/tracnghiem/question/single-list-question-content', params);
export const getListTypeQuestion = (params: any) =>
  sendPost('/rpc/tracnghiem/question/single-list-question-type', params);
