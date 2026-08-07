import { useState } from 'react';
import axios from 'axios';
import { fetchPostUploadSignature } from '../../../api/activity';

export const usePostMediaUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const uploadMedia = async (file, resourceType = 'image') => {
    setError('');
    setUploading(true);
    try {
      const creds = await fetchPostUploadSignature(resourceType);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', creds.signature);
      formData.append('timestamp', creds.timestamp);
      formData.append('public_id', creds.public_id);
      formData.append('api_key', creds.api_key);

      const { data } = await axios.post(creds.upload_url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
        }
      });

      return data.secure_url;
    } catch (err) {
      const message = err.response?.data?.error?.message || 'Upload failed. Please try again.';
      setError(message);
      throw new Error(message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return { uploadMedia, uploading, progress, error, setError };
};
