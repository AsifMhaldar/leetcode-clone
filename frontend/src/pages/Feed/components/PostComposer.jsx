import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Globe, Users, Lock, ChevronDown,
  ImagePlus, Video as VideoIcon, Code2, BarChart3,
  Smile, AtSign, Hash, Send, Loader2, Plus, Trash2
} from 'lucide-react';
import { usePostMediaUpload } from '../hooks/usePostMediaUpload';
import { CODE_LANGUAGES, VISIBILITY_OPTIONS, POST_MAX_LENGTH } from '../constants';
import EmojiPicker from './EmojiPicker';
import DropdownMenu from '../../../components/DropdownMenu/DropdownMenu';
import './PostComposer.scss';

const DRAFT_KEY = (userId) => `post-draft-${userId}`;

const visibilityIconMap = { public: Globe, followers: Users, private: Lock };
const VALID_VISIBILITY = Object.keys(visibilityIconMap);
const getVisibilityIcon = (visibility) => visibilityIconMap[visibility] || Globe;

const PostComposer = ({ open, onClose, onPost, isPosting, isError, error, onReset, user }) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [showCode, setShowCode] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [visibility, setVisibility] = useState('public');
  const [visibilityOpen, setVisibilityOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const textareaRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const visibilityBtnRef = useRef(null);
  const emojiBtnRef = useRef(null);
  const draftTimerRef = useRef(null);

  const { uploadMedia, uploading, progress, error: uploadError, setError: setUploadError } = usePostMediaUpload();

  useEffect(() => {
    if (!open || !user?._id) return;
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY(user._id)) || 'null');
      if (saved) {
        setContent(saved.content || '');
        setImageUrl(saved.image || '');
        setVideoUrl(saved.video || '');
        setCodeSnippet(saved.codeSnippet || '');
        setCodeLanguage(saved.codeLanguage || 'javascript');
        setShowCode(!!saved.codeSnippet);
        setShowPoll(!!saved.poll?.length);
        setPollOptions(saved.poll?.length ? saved.poll : ['', '']);
        setVisibility(VALID_VISIBILITY.includes(saved.visibility) ? saved.visibility : 'public');
      }
    } catch {
      // ignore malformed draft
    }
    return () => setShowEmojiPicker(false);
  }, [open, user?._id]);

  const persistDraft = useCallback(() => {
    if (!user?._id) return;
    clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(() => {
      const draft = {
        content,
        image: imageUrl,
        video: videoUrl,
        codeSnippet,
        codeLanguage,
        poll: pollOptions.map(o => o.trim()).filter(Boolean),
        visibility
      };
      if (draft.content || draft.image || draft.video || draft.codeSnippet || draft.poll.length) {
        localStorage.setItem(DRAFT_KEY(user._id), JSON.stringify(draft));
      } else {
        localStorage.removeItem(DRAFT_KEY(user._id));
      }
    }, 300);
  }, [content, imageUrl, videoUrl, codeSnippet, codeLanguage, pollOptions, visibility, user?._id]);

  useEffect(() => {
    persistDraft();
  }, [persistDraft]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const resetComposer = () => {
    setContent('');
    setImageUrl('');
    setVideoUrl('');
    setCodeSnippet('');
    setCodeLanguage('javascript');
    setShowCode(false);
    setShowPoll(false);
    setPollOptions(['', '']);
    setVisibility('public');
    setShowEmojiPicker(false);
    setUploadError('');
    onReset?.();
  };

  const handleClose = () => {
    if (isPosting || uploading) return;
    onClose();
    resetComposer();
  };

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 320)}px`;
  };

  const insertText = (text) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = content.slice(0, start) + text + content.slice(end);
    setContent(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + text.length, start + text.length);
    });
  };

  const handleEmojiSelect = (emoji) => {
    insertText(emoji);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const url = await uploadMedia(file, 'image');
      setImageUrl(url);
    } catch {
      // error surfaced via uploadError
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const url = await uploadMedia(file, 'video');
      setVideoUrl(url);
    } catch {
      // error surfaced via uploadError
    }
  };

  const handlePollOptionChange = (index, value) => {
    setPollOptions(prev => prev.map((o, i) => (i === index ? value : o)));
  };

  const addPollOption = () => {
    setPollOptions(prev => (prev.length < 5 ? [...prev, ''] : prev));
  };

  const removePollOption = (index) => {
    setPollOptions(prev => (prev.length > 2 ? prev.filter((_, i) => i !== index) : prev));
  };

  const canPost =
    !isPosting &&
    !uploading &&
    (content.trim() || imageUrl || videoUrl || codeSnippet.trim() ||
      pollOptions.filter(o => o.trim()).length >= 2);

  const handlePost = () => {
    if (!canPost) return;
    const poll = pollOptions.map(o => o.trim()).filter(Boolean);
    onPost({
      type: 'shared',
      content: content.trim(),
      image: imageUrl,
      video: videoUrl,
      codeSnippet: codeSnippet.trim(),
      codeLanguage: codeSnippet.trim() ? codeLanguage : '',
      visibility,
      poll: poll.length >= 2 ? poll : undefined
    });
    if (user?._id) localStorage.removeItem(DRAFT_KEY(user._id));
    resetComposer();
    onClose();
  };

  const VisibilityIcon = getVisibilityIcon(visibility);

  const charCount = content.length;
  const remaining = POST_MAX_LENGTH - charCount;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="post-composer__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            className="post-composer"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Create a post"
          >
            <div className="post-composer__header">
              <h2 className="post-composer__title">Create a post</h2>
              <button className="post-composer__close" onClick={handleClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="post-composer__body">
              <div className="post-composer__user">
                <div className="post-composer__avatar">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <div className="post-composer__user-meta">
                  <span className="post-composer__user-name">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <div className="post-composer__visibility-wrap">
                    <button
                      ref={visibilityBtnRef}
                      className="post-composer__visibility-btn"
                      onClick={() => setVisibilityOpen(v => !v)}
                    >
                      <VisibilityIcon size={12} />
                      <span>{VISIBILITY_OPTIONS.find(o => o.id === visibility)?.label}</span>
                      <ChevronDown size={12} />
                    </button>
                    <DropdownMenu
                      anchorRef={visibilityBtnRef}
                      open={visibilityOpen}
                      onClose={() => setVisibilityOpen(false)}
                      width={260}
                      align="start"
                    >
                      {VISIBILITY_OPTIONS.map(option => {
                        const Icon = getVisibilityIcon(option.id);
                        return (
                          <button
                            key={option.id}
                            className={`post-composer__visibility-option ${option.id === visibility ? 'post-composer__visibility-option--active' : ''}`}
                            onClick={() => {
                              setVisibility(option.id);
                              setVisibilityOpen(false);
                            }}
                          >
                            <Icon size={16} />
                            <span>
                              <strong>{option.label}</strong>
                              <small>{option.hint}</small>
                            </span>
                          </button>
                        );
                      })}
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <div className="post-composer__editor">
                <textarea
                  ref={textareaRef}
                  className="post-composer__textarea"
                  placeholder="What do you want to talk about?"
                  value={content}
                  maxLength={POST_MAX_LENGTH}
                  onChange={(e) => { setContent(e.target.value); resizeTextarea(); }}
                  onFocus={() => resizeTextarea()}
                />

                <div className="post-composer__editor-footer">
                  <div className="post-composer__editor-actions">
                    <div className="post-composer__emoji-wrap">
                      <button
                        ref={emojiBtnRef}
                        className="post-composer__tool-btn"
                        title="Emoji"
                        onClick={() => setShowEmojiPicker(v => !v)}
                      >
                        <Smile size={18} />
                      </button>
                      <EmojiPicker
                        anchorRef={emojiBtnRef}
                        open={showEmojiPicker}
                        onSelect={handleEmojiSelect}
                        onClose={() => setShowEmojiPicker(false)}
                      />
                    </div>
                    <button
                      className="post-composer__tool-btn"
                      title="Mention someone"
                      onClick={() => insertText('@')}
                    >
                      <AtSign size={18} />
                    </button>
                    <button
                      className="post-composer__tool-btn"
                      title="Add hashtag"
                      onClick={() => insertText('#')}
                    >
                      <Hash size={18} />
                    </button>
                  </div>
                  <span className={`post-composer__counter ${remaining <= 100 ? 'post-composer__counter--warn' : ''}`}>
                    {remaining}
                  </span>
                </div>
              </div>

              {uploadError && (
                <div className="post-composer__error">
                  {uploadError}
                </div>
              )}
              {isError && (
                <div className="post-composer__error">
                  {error?.message || 'Failed to post. Please try again.'}
                </div>
              )}

              {imageUrl && (
                <div className="post-composer__preview post-composer__preview--image">
                  <img src={imageUrl} alt="Preview" />
                  <button className="post-composer__preview-remove" onClick={() => setImageUrl('')}>
                    <X size={16} />
                  </button>
                </div>
              )}

              {videoUrl && (
                <div className="post-composer__preview post-composer__preview--video">
                  <video src={videoUrl} controls />
                  <button className="post-composer__preview-remove" onClick={() => setVideoUrl('')}>
                    <X size={16} />
                  </button>
                </div>
              )}

              {uploading && (
                <div className="post-composer__uploading">
                  <Loader2 size={16} className="spin" />
                  <span>Uploading to Cloudinary...</span>
                  <span className="post-composer__uploading-progress">{progress}%</span>
                </div>
              )}

              {showCode && (
                <div className="post-composer__code-panel">
                  <div className="post-composer__code-header">
                    <Code2 size={16} />
                    <span>Code snippet</span>
                    <select
                      className="post-composer__lang-select"
                      value={codeLanguage}
                      onChange={(e) => setCodeLanguage(e.target.value)}
                    >
                      {CODE_LANGUAGES.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    className="post-composer__code-input"
                    placeholder="Paste your code here..."
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    rows={6}
                  />
                </div>
              )}

              {showPoll && (
                <div className="post-composer__poll-panel">
                  <div className="post-composer__poll-header">
                    <BarChart3 size={16} />
                    <span>Poll</span>
                  </div>
                  {pollOptions.map((option, index) => (
                    <div key={index} className="post-composer__poll-row">
                      <input
                        className="post-composer__poll-input"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        maxLength={120}
                        onChange={(e) => handlePollOptionChange(index, e.target.value)}
                      />
                      <button
                        className="post-composer__poll-remove"
                        onClick={() => removePollOption(index)}
                        disabled={pollOptions.length <= 2}
                        title="Remove option"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  {pollOptions.length < 5 && (
                    <button className="post-composer__poll-add" onClick={addPollOption}>
                      <Plus size={15} /> Add option
                    </button>
                  )}
                </div>
              )}

              <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />

              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/quicktime"
                style={{ display: 'none' }}
                onChange={handleVideoUpload}
              />
            </div>

            <div className="post-composer__footer">
              <div className="post-composer__toolbar">
                <button
                  className="post-composer__tool-btn post-composer__tool-btn--media"
                  title="Add image"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <ImagePlus size={20} />
                </button>
                <button
                  className="post-composer__tool-btn post-composer__tool-btn--media"
                  title="Add video"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <VideoIcon size={20} />
                </button>
                <button
                  className="post-composer__tool-btn"
                  title="Add code"
                  onClick={() => setShowCode(v => !v)}
                >
                  <Code2 size={20} />
                </button>
                <button
                  className="post-composer__tool-btn"
                  title="Create a poll"
                  onClick={() => setShowPoll(v => !v)}
                >
                  <BarChart3 size={20} />
                </button>
              </div>
              <div className="post-composer__footer-actions">
                <button
                  className="post-composer__cancel-btn"
                  onClick={handleClose}
                  disabled={isPosting || uploading}
                >
                  Cancel
                </button>
                <button
                  className="post-composer__post-btn"
                  onClick={handlePost}
                  disabled={!canPost}
                >
                  {isPosting ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                  {isPosting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostComposer;
