import { sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getListPublicExam = (params: any) => sendPost('/rpc/tracnghiem/exam/public-list', params);
export const getListSubjectExam = (params: any) => sendPost('/rpc/tracnghiem/exam/filter-list-subject', params);
export const getListGradeExam = (params: any) => sendPost('/rpc/tracnghiem/exam/filter-list-grade', params);
export const getListLevelExam = (params: any) => sendPost('/rpc/tracnghiem/exam/filter-list-exam-level', params);
