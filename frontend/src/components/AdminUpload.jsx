import { useParams } from 'react-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import axiosClient from '../utils/axiosClient';
import { Upload, Video, FileVideo, Clock, CheckCircle, AlertCircle, ArrowLeft, Cloud } from 'lucide-react';
import { NavLink } from 'react-router';

function AdminUpload() {
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

    // Upload video to Cloudinary
    const onSubmit = async (data) => {
        const file = data.videoFile[0];
        
        setUploading(true);
        setUploadProgress(0);
        clearErrors();

        try {
            // Step 1: Get upload signature from backend
            const signatureResponse = await axiosClient.get(`/video/create/${problemId}`);
            const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureResponse.data;

            // Step 2: Create FormData for Cloudinary upload
            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('public_id', public_id);
            formData.append('api_key', api_key);

            // Step 3: Upload directly to Cloudinary
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

            // Step 4: Save video metadata to backend
            const metadataResponse = await axiosClient.post('/video/save', {
                problemId: problemId,
                cloudinaryPublicId: cloudinaryResult.public_id,
                secureUrl: cloudinaryResult.secure_url,
                duration: cloudinaryResult.duration,
            });

            setUploadedVideo(metadataResponse.data.videoSolution);
            reset(); // Reset form after successful upload
            
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

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Format duration
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation Header */}
            <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Upload Video Solution</h1>
                                {/* <p className="text-sm text-gray-400">Problem ID: {problemId}</p> */}
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <NavLink 
                                to="/admin" 
                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                            >
                                <ArrowLeft size={20} />
                                <span>Back to Admin</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        Upload Video Solution
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Add a video explanation for this coding problem to help users understand the solution better
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Upload Card */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <Cloud className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Video Upload</h2>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* File Upload Area */}
                            <div className="form-group">
                                <label className="block text-white/80 text-sm font-medium mb-3">
                                    Select Video File
                                </label>
                                
                                <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 hover:border-blue-400/50 hover:bg-white/5 ${
                                    errors.videoFile 
                                        ? 'border-red-500/50 bg-red-500/5 animate-shake' 
                                        : 'border-white/20'
                                }`}>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        {...register('videoFile', {
                                            required: 'Please select a video file',
                                            validate: {
                                                isVideo: (files) => {
                                                    if (!files || !files[0]) return 'Please select a video file';
                                                    const file = files[0];
                                                    return file.type.startsWith('video/') || 'Please select a valid video file';
                                                },
                                                fileSize: (files) => {
                                                    if (!files || !files[0]) return true;
                                                    const file = files[0];
                                                    const maxSize = 100 * 1024 * 1024; // 100MB
                                                    return file.size <= maxSize || 'File size must be less than 100MB';
                                                }
                                            }
                                        })}
                                        className="hidden"
                                        id="video-upload"
                                        disabled={uploading}
                                    />
                                    
                                    <label htmlFor="video-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                                <Upload className="w-8 h-8 text-white" />
                                            </div>
                                            
                                            <div>
                                                <p className="text-white font-medium mb-1">Choose video file</p>
                                                <p className="text-gray-400 text-sm">
                                                    MP4, MOV, AVI up to 100MB
                                                </p>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                
                                {errors.videoFile && (
                                    <div className="flex items-center space-x-2 text-red-400 text-sm mt-2 animate-fade-in">
                                        <AlertCircle size={16} />
                                        <span>{errors.videoFile.message}</span>
                                    </div>
                                )}
                            </div>

                            {/* Selected File Info */}
                            {selectedFile && (
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                                    <div className="flex items-center space-x-3">
                                        <FileVideo className="w-8 h-8 text-blue-400" />
                                        <div className="flex-1">
                                            <h4 className="text-white font-medium">{selectedFile.name}</h4>
                                            <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                                                <span>Size: {formatFileSize(selectedFile.size)}</span>
                                                <span>Type: {selectedFile.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Upload Progress */}
                            {uploading && (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white">Uploading to Cloudinary...</span>
                                        <span className="text-blue-400 font-medium">{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-3">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="text-gray-400 text-sm">
                                            Please don't close this page during upload
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {errors.root && (
                                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                                    <div className="flex items-center space-x-3">
                                        <AlertCircle className="w-6 h-6 text-red-400" />
                                        <div>
                                            <h4 className="text-red-400 font-medium mb-1">Upload Failed</h4>
                                            <p className="text-red-300/80 text-sm">{errors.root.message}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Success Message */}
                            {uploadedVideo && (
                                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-8 h-8 text-green-400" />
                                        <div className="flex-1">
                                            <h4 className="text-green-400 font-medium text-lg mb-2">Upload Successful!</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div className="flex items-center space-x-2 text-green-300/80">
                                                    <Clock size={16} />
                                                    <span>Duration: {formatDuration(uploadedVideo.duration)}</span>
                                                </div>
                                                <div className="text-green-300/80">
                                                    Uploaded: {new Date(uploadedVideo.uploadedAt).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="mt-3 p-3 bg-black/20 rounded-lg">
                                                <p className="text-green-300/70 text-sm font-mono break-all">
                                                    {uploadedVideo.secureUrl}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Upload Button */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    disabled={uploading || !selectedFile}
                                    className={`flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                                        uploading ? 'animate-pulse' : ''
                                    }`}
                                >
                                    {uploading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={20} />
                                            <span>Upload Video Solution</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Instructions */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mt-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Upload Guidelines</h3>
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Supported formats: MP4, MOV, AVI, WebM</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Maximum file size: 100MB</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Recommended resolution: 1080p or 720p</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Keep videos focused on explaining the solution clearly</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                
                @keyframes fade-in {
                    from { 
                        opacity: 0; 
                        transform: translateY(-10px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}

export default AdminUpload;