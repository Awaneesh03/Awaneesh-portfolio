import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description?: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase() || 
                       e.code.toLowerCase() === shortcut.key.toLowerCase();
      
      const ctrlMatch = shortcut.ctrlKey ? e.ctrlKey : !e.ctrlKey;
      const metaMatch = shortcut.metaKey ? e.metaKey : !e.metaKey;
      const shiftMatch = shortcut.shiftKey ? e.shiftKey : !e.shiftKey;
      const altMatch = shortcut.altKey ? e.altKey : !e.altKey;

      // For Mac, treat Cmd (meta) as Ctrl for cross-platform compatibility
      const cmdOrCtrl = (shortcut.ctrlKey || shortcut.metaKey) ? 
                        (e.ctrlKey || e.metaKey) : 
                        (!e.ctrlKey && !e.metaKey);

      if (keyMatch && (cmdOrCtrl || (ctrlMatch && metaMatch)) && shiftMatch && altMatch) {
        e.preventDefault();
        shortcut.action();
        break;
      }
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

// Common shortcuts for the portfolio
export const PORTFOLIO_SHORTCUTS = {
  LAUNCHPAD: { key: 'Space', metaKey: true, description: 'Open Launchpad' },
  CLOSE_WINDOW: { key: 'w', metaKey: true, description: 'Close Window' },
  SPOTLIGHT: { key: 'Space', metaKey: true, shiftKey: true, description: 'Spotlight Search' },
  MINIMIZE: { key: 'm', metaKey: true, description: 'Minimize Window' },
};
