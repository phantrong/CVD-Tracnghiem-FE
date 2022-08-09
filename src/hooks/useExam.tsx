
import { getListGradeExam, getListLevelExam, getListPublicExam, getListSubjectExam } from 'api/exam';
import { GET_LIST_GRADE_EXAM, GET_LIST_LEVEL_EXAM, GET_LIST_PUBLIC_EXAM, GET_LIST_SUBJECT_EXAM } from 'contants/keyQuery';
import { useQuery } from 'react-query';

export const useGetListPublicExam = (params: any) => {
  const { data, isLoading } = useQuery(
    [GET_LIST_PUBLIC_EXAM, params],
    async () => {
      const response = await getListPublicExam(params);
      return response;
    }
  );
  return { data: data, isLoading };
};

export const useGetListSubjectExam = (params: any) => {
  const { data, isLoading } = useQuery(
    [GET_LIST_SUBJECT_EXAM, params],
    async () => {
      const response = await getListSubjectExam(params);
      return response;
    }
  );
  return { data: data, isLoading };
};

export const useGetListGradeExam = (params: any) => {
  const { data, isLoading } = useQuery(
    [GET_LIST_GRADE_EXAM, params],
    async () => {
      const response = await getListGradeExam(params);
      return response;
    }
  );
  return { data: data, isLoading };
};

export const useGetListLevelExam = (params: any) => {
  const { data, isLoading } = useQuery(
    [GET_LIST_LEVEL_EXAM, params],
    async () => {
      const response = await getListLevelExam(params);
      return response;
    }
  );
  return { data: data, isLoading };
};
