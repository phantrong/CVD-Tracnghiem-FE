import { sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getListPublicExam = (params: any) => sendPost('/rpc/tracnghiem/exam/public-list', params);
export const getListSubjectExam = (params: any) => sendPost('/rpc/tracnghiem/exam/filter-list-subject', params);
export const getListGradeExam = (params: any) => sendPost('/rpc/tracnghiem/exam/filter-list-grade', params);
export const getListLevelExam = (params: any) => sendPost('/rpc/tracnghiem/exam/filter-list-exam-level', params);
export const getListStatusExam = (params: any) => sendPost('/rpc/tracnghiem/exam/single-list-exam-status', params);
export const getListStatus = (params: any) => sendPost('/rpc/tracnghiem/exam/single-list-status', params);
export const uploadImageExam = (params: any) => sendPost('/rpc/tracnghiem/exam/upload-image', params);
export const getListAllQuestion = (params: any) => sendPost('/rpc/tracnghiem/exam/list-question', params);
export const getMyListExam = (params: any) => sendPost('/rpc/tracnghiem/exam/list', params);
