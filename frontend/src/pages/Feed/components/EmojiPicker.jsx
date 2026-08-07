import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import DropdownMenu from '../../../components/DropdownMenu/DropdownMenu';
import './EmojiPicker.scss';

const EMOJI_GROUPS = [
  {
    label: 'Faces',
    emojis: ['😀', '😁', '😂', '🤣', '😊', '😇', '🙂', '😉', '😍', '🤩', '😘', '😎', '🤓', '🧐', '🤔', '😴', '😅', '🥳', '🙃', '😭']
  },
  {
    label: 'Hands',
    emojis: ['👍', '👎', '👏', '🙌', '🤝', '💪', '✌️', '🤞', '👌', '🤙', '👋', '✋', '🫡', '🎉']
  },
  {
    label: 'Dev',
    emojis: ['💻', '⌨️', '🖥️', '🖱️', '🤖', '🧠', '⚡', '🔥', '💡', '🔧', '🛠️', '📊', '🧮', '📈', '🚀', '🐛', '🪲', '🔍', '📝', '✅']
  },
  {
    label: 'Hearts',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💖', '💗', '💓', '💕']
  }
];

const EmojiPicker = ({ anchorRef, open, onSelect, onClose }) => {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <DropdownMenu
      anchorRef={anchorRef}
      open={open}
      onClose={onClose}
      width={280}
      align="start"
      placement="top"
      className="dropdown-menu--compact"
    >
      <div className="emoji-picker">
        <div className="emoji-picker__header">
          <Smile size={16} />
          <span>Emoji</span>
        </div>
        <div className="emoji-picker__tabs">
          {EMOJI_GROUPS.map((group, i) => (
            <button
              key={group.label}
              className={`emoji-picker__tab ${i === activeGroup ? 'emoji-picker__tab--active' : ''}`}
              onClick={() => setActiveGroup(i)}
            >
              {group.emojis[0]}
            </button>
          ))}
        </div>
        <div className="emoji-picker__grid">
          {EMOJI_GROUPS[activeGroup].emojis.map((emoji) => (
            <button
              key={emoji}
              className="emoji-picker__item"
              onClick={() => onSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </DropdownMenu>
  );
};

export default EmojiPicker;
