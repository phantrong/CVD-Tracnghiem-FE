import {
  getListContentQuestion,
  getListGradeQuestion,
  getListGroupQuestion,
  getListStatusQuestion,
  getListSubjectQuestion,
  getListTypeQuestion,
} from 'api/question';
import {
  GET_LIST_CONTENT_QUESTION,
  GET_LIST_GRADE_QUESTION,
  GET_LIST_GROUP_QUESTION,
  GET_LIST_STATUS_QUESTION,
  GET_LIST_SUBJECT_QUESTION,
  GET_LIST_TYPE_QUESTION,
} from 'contants/keyQuery';
import { useQuery } from 'react-query';

export const useGetListGradeQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_GRADE_QUESTION], async () => {
    const response = await getListGradeQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListSubjectQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_SUBJECT_QUESTION], async () => {
    const response = await getListSubjectQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListGroupQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_GROUP_QUESTION], async () => {
    const response = await getListGroupQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListContentQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_CONTENT_QUESTION], async () => {
    const response = await getListContentQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListStatustQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_STATUS_QUESTION], async () => {
    const response = await getListStatusQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListTypeQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_TYPE_QUESTION], async () => {
    const response = await getListTypeQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};
