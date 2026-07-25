import { useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import axiosClient from '../../../utils/axiosClient';

export const useAdminUpload = () => {
  const { problemId } = useParams();

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
    clearErrors
  } = useForm();

  const selectedFile = watch('videoFile')?.[0];

  const onSubmit = async (data) => {
    const file = data.videoFile[0];

    setUploading(true);
    setUploadProgress(0);
    clearErrors();

    try {
      const signatureResponse = await axiosClient.get(`/video/create/${problemId}`);
      const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureResponse.data;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('public_id', public_id);
      formData.append('api_key', api_key);

      const uploadResponse = await axios.post(upload_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      const cloudinaryResult = uploadResponse.data;

      const metadataResponse = await axiosClient.post('/video/save', {
        problemId: problemId,
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
      });

      setUploadedVideo(metadataResponse.data.videoSolution);
      reset();
    } catch (err) {
      console.error('Upload error:', err);
      setError('root', {
        type: 'manual',
        message: err.response?.data?.message || 'Upload failed. Please try again.'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    register,
    handleSubmit,
    errors,
    selectedFile,
    uploading,
    uploadProgress,
    uploadedVideo,
    onSubmit,
    formatFileSize,
    formatDuration
  };
};
