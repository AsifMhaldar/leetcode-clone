import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './DropdownMenu.scss';

const MENU_GAP = 8;
const EDGE_MARGIN = 8;
const MIN_VISIBLE = 120;

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [role="menuitem"], a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

const DropdownMenu = ({
  anchorRef,
  open,
  onClose,
  children,
  width = 260,
  align = 'start',
  placement = 'bottom',
  className = '',
  role = 'menu'
}) => {
  const menuRef = useRef(null);
  const [openAbove, setOpenAbove] = useState(false);
  const [maxHeight, setMaxHeight] = useState(320);
  const [horizontal, setHorizontal] = useState({});

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const menu = menuRef.current;
    if (!anchor || !menu) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const a = anchor.getBoundingClientRect();
    const menuWidth = menu.offsetWidth || width;

    const spaceAbove = a.top - MENU_GAP - EDGE_MARGIN;
    const spaceBelow = vh - a.bottom - MENU_GAP - EDGE_MARGIN;
    const canAbove = spaceAbove >= MIN_VISIBLE;
    const canBelow = spaceBelow >= MIN_VISIBLE;

    let useAbove;
    if (placement === 'top') {
      useAbove = canAbove ? true : canBelow ? false : spaceAbove >= spaceBelow;
    } else {
      useAbove = canBelow ? false : canAbove ? true : spaceAbove >= spaceBelow;
    }

    const maxH = Math.max(
      MIN_VISIBLE,
      Math.min(useAbove ? spaceAbove : spaceBelow, vh - EDGE_MARGIN * 2)
    );

    const wrapper = menu.offsetParent || menu.parentElement;
    const wrapperRect = wrapper?.getBoundingClientRect();

    let horiz;
    if (wrapperRect) {
      if (align === 'end') {
        const rightMin = wrapperRect.right - (vw - EDGE_MARGIN);
        const rightMax = wrapperRect.right - EDGE_MARGIN - menuWidth;
        horiz = { right: Math.max(rightMin, Math.min(0, rightMax)) };
      } else {
        const leftMin = EDGE_MARGIN - wrapperRect.left;
        const leftMax = vw - EDGE_MARGIN - menuWidth - wrapperRect.left;
        horiz = { left: Math.max(leftMin, Math.min(0, leftMax)) };
      }
    } else {
      horiz = align === 'end' ? { right: 0 } : { left: 0 };
    }

    setOpenAbove(useAbove);
    setMaxHeight(maxH);
    setHorizontal(horiz);
  }, [anchorRef, align, placement, width]);

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const anchor = anchorRef.current;

    const focusFirst = () => {
      const first = menuRef.current?.querySelector(FOCUSABLE_SELECTOR);
      first?.focus();
    };
    focusFirst();

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      const menu = menuRef.current;
      if (!menu) return;

      const items = Array.from(menu.querySelectorAll(FOCUSABLE_SELECTOR));
      if (!items.length) return;

      let nextIndex = items.indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        nextIndex = nextIndex < 0 ? 0 : (nextIndex + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        nextIndex = nextIndex < 0 ? items.length - 1 : (nextIndex - 1 + items.length) % items.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = items.length - 1;
      } else {
        return;
      }

      e.preventDefault();
      items[nextIndex]?.focus();
    };
    const handleMouseDown = (e) => {
      const menu = menuRef.current;
      const anchor = anchorRef.current;
      if (menu && menu.contains(e.target)) return;
      if (anchor && anchor.contains(e.target)) return;
      onClose();
    };

    document.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('mousedown', handleMouseDown);
      anchor?.focus();
    };
  }, [open, onClose, anchorRef, updatePosition]);

  if (!open) return null;

  const placementClass = openAbove ? 'dropdown-menu--placement-top' : 'dropdown-menu--placement-bottom';

  return (
    <div
      ref={menuRef}
      className={`dropdown-menu ${placementClass} ${className}`}
      style={{
        width,
        maxHeight,
        [openAbove ? 'bottom' : 'top']: `calc(100% + ${MENU_GAP}px)`,
        ...horizontal
      }}
      role={role}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
