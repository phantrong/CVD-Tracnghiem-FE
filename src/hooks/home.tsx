import { sendPost } from 'api/axios';
import { GET_CATEGORY, GET_LIST_EXAM, GET_SINGLE_LIST } from 'contants/keyQuery';
import { useQuery } from 'react-query';

export const useGetCategory = () => {
  const { data } = useQuery(
    [GET_CATEGORY],
    async () => {
      const response = await sendPost('rpc/tracnghiem/exam/filter-list-subject', {});
      return response;
    },
  );
  return data;
};

export const useGetSingleSubject = () => {
  const { data } = useQuery(
    [GET_SINGLE_LIST],
    async () => {
      const response = await sendPost('rpc/tracnghiem/subject/list', {});
      return response;
    },
  );
  return data;
};


export enum ESort {
  DESC = 0,
  ASC,
}
export interface IBodyListExam {
  search?: string;
  subjectId?: {equal: number};
  orderBy?: number;
  orderType?: ESort;
  skip?: number;
  take?: number;
}
export const useGetListExam = (body: IBodyListExam) => {
  const { data } = useQuery(
    [GET_LIST_EXAM],
    async () => {
      const response = await sendPost('rpc/tracnghiem/public-exam/list', body);
      return response;
    },
  );
  return data;
};

