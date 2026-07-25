import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import axiosClient from '../../../utils/axiosClient';
import { problemSchema } from '../utils/schema';

export const useAdminPanel = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibleTestCases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddenTestCases'
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!');
      navigate('/admin');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    isSubmitting,
    visibleFields,
    appendVisible,
    removeVisible,
    hiddenFields,
    appendHidden,
    removeHidden,
    onSubmit,
    navigate
  };
};
