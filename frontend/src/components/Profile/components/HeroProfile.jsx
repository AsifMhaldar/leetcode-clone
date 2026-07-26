import React from 'react';
import {
  Edit3, Save, Github, Linkedin, Globe, Mail,
  CalendarDays, Flame, Trophy, Code2, Target,
} from 'lucide-react';
import {
  FORM_LABELS, FORM_PLACEHOLDERS, EDIT_BUTTON, SAVE_BUTTON,
  SAVING_BUTTON, CANCEL_BUTTON,
} from '../constants';
import './HeroProfile.scss';

const HeroProfile = ({
  user, editForm, userStats, streak, isEditing, saveLoading,
  onEdit, onSave, onCancel, onInputChange,
}) => {
  const rank = userStats?.rank ?? null;
  const totalUsers = userStats?.totalUsers ?? null;
  const rankDisplay = rank ? `#${rank.toLocaleString()}` : '—';
  const solved = userStats?.totalSolved ?? 0;
  const acceptance = userStats?.acceptanceRate ?? 0;
  const currentStreak = streak?.current ?? 0;
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null;

  const initials = `${user?.firstName?.charAt(0) || ''}${user?.lastName?.charAt(0) || ''}`;

  const hasSocials = user?.github || user?.linkedin || user?.website;

  return (
    <div className="hero">
      {/* ── Decorative Banner ──────────────────────────────── */}
      <div className="hero__banner">
        <div className="hero__banner-glow hero__banner-glow--1" />
        <div className="hero__banner-glow hero__banner-glow--2" />
        <div className="hero__banner-glow hero__banner-glow--3" />
      </div>

      <div className="hero__body">
        {isEditing ? (
          <div className="hero__editing">
            {/* ── Edit Mode: Avatar + Form ──────────────────── */}
            <div className="hero__edit-top">
              <div className="hero__avatar-wrap">
                <div className="hero__avatar-ring">
                  <div className="hero__avatar">{initials}</div>
                </div>
                <span className="hero__status" title="Online" />
              </div>

              <div className="hero__edit-actions">
                <button onClick={onSave} disabled={saveLoading} className="hero__btn hero__btn--save">
                  {saveLoading ? <div className="hero__btn-spinner" /> : <Save size={14} />}
                  <span>{saveLoading ? SAVING_BUTTON : SAVE_BUTTON}</span>
                </button>
                <button onClick={onCancel} className="hero__btn hero__btn--cancel">{CANCEL_BUTTON}</button>
              </div>
            </div>

            <div className="hero__form">
              <div className="hero__form-row">
                <div>
                  <label className="hero__label">{FORM_LABELS.firstName}</label>
                  <input type="text" name="firstName" value={editForm.firstName || ''} onChange={onInputChange} className="hero__input" placeholder={FORM_PLACEHOLDERS.firstName} />
                </div>
                <div>
                  <label className="hero__label">{FORM_LABELS.lastName}</label>
                  <input type="text" name="lastName" value={editForm.lastName || ''} onChange={onInputChange} className="hero__input" placeholder={FORM_PLACEHOLDERS.lastName} />
                </div>
              </div>
              <div>
                <label className="hero__label">{FORM_LABELS.bio}</label>
                <textarea name="bio" value={editForm.bio || ''} onChange={onInputChange} rows="2" className="hero__textarea" placeholder={FORM_PLACEHOLDERS.bio} />
              </div>
              <div className="hero__form-row hero__form-row--3">
                <div>
                  <label className="hero__label">{FORM_LABELS.github}</label>
                  <input type="url" name="github" value={editForm.github || ''} onChange={onInputChange} className="hero__input" placeholder={FORM_PLACEHOLDERS.github} />
                </div>
                <div>
                  <label className="hero__label">{FORM_LABELS.linkedin}</label>
                  <input type="url" name="linkedin" value={editForm.linkedin || ''} onChange={onInputChange} className="hero__input" placeholder={FORM_PLACEHOLDERS.linkedin} />
                </div>
                <div>
                  <label className="hero__label">{FORM_LABELS.website}</label>
                  <input type="url" name="website" value={editForm.website || ''} onChange={onInputChange} className="hero__input" placeholder={FORM_PLACEHOLDERS.website} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* ── Row 1: Avatar + Identity + Edit ──────────── */}
            <div className="hero__identity-row">
              <div className="hero__avatar-wrap">
                <div className="hero__avatar-ring">
                  <div className="hero__avatar">{initials}</div>
                </div>
                <span className="hero__status" title="Online" />
              </div>

              <div className="hero__user-info">
                <h1 className="hero__name">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="hero__email">
                  <Mail size={12} />{user?.emailId}
                </p>
                <p className="hero__bio">
                  {user?.bio || 'Passionate coder solving challenges one problem at a time.'}
                </p>
                <div className="hero__meta">
                  {joinedDate && (
                    <span className="hero__meta-item">
                      <CalendarDays size={12} />Joined {joinedDate}
                    </span>
                  )}
                </div>
              </div>

              <button onClick={onEdit} className="hero__btn hero__btn--edit">
                <Edit3 size={14} /><span>{EDIT_BUTTON}</span>
              </button>
            </div>

            {/* ── Divider ──────────────────────────────────── */}
            <div className="hero__divider" />

            {/* ── Row 2: Premium KPI Stat Cards ────────────── */}
            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-icon hero__stat-icon--blue">
                  <Code2 size={16} />
                </div>
                <div className="hero__stat-content">
                  <span className="hero__stat-value">{solved}</span>
                  <span className="hero__stat-label">Solved</span>
                </div>
              </div>

              <div className="hero__stat">
                <div className="hero__stat-icon hero__stat-icon--green">
                  <Target size={16} />
                </div>
                <div className="hero__stat-content">
                  <span className="hero__stat-value">{acceptance}%</span>
                  <span className="hero__stat-label">Acceptance</span>
                </div>
              </div>

              <div className="hero__stat hero__stat--streak">
                <div className="hero__stat-icon hero__stat-icon--fire">
                  <Flame size={16} />
                </div>
                <div className="hero__stat-content">
                  <span className="hero__stat-value">{currentStreak}</span>
                  <span className="hero__stat-label">Day Streak</span>
                </div>
              </div>

              <div className="hero__stat">
                <div className="hero__stat-icon hero__stat-icon--gold">
                  <Trophy size={16} />
                </div>
                <div className="hero__stat-content">
                  <span className="hero__stat-value">{rankDisplay}</span>
                  <span className="hero__stat-label">Global Rank</span>
                </div>
              </div>
            </div>

            {/* ── Row 3: Social Links ──────────────────────── */}
            {hasSocials && (
              <div className="hero__socials">
                {user?.github && (
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="hero__social-pill">
                    <Github size={14} />GitHub
                  </a>
                )}
                {user?.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="hero__social-pill">
                    <Linkedin size={14} />LinkedIn
                  </a>
                )}
                {user?.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="hero__social-pill">
                    <Globe size={14} />Portfolio
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HeroProfile;
