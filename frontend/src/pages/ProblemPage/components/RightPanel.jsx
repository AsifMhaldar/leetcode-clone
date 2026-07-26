import React from 'react';
import Editor from '@monaco-editor/react';
import { languages, getLanguageForMonaco } from '../utils/problemData';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => (
  <div className="editor-toolbar">
    <div className="lang-tabs">
      {languages.map((lang) => (
        <button
          key={lang}
          className={`lang-tab ${selectedLanguage === lang ? 'lang-tab--active' : ''}`}
          onClick={() => onLanguageChange(lang)}
        >
          {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
        </button>
      ))}
    </div>
  </div>
);

const CodeEditor = ({ selectedLanguage, code, onEditorChange, onEditorMount }) => (
  <div className="editor">
    <Editor
      height="100%"
      language={getLanguageForMonaco(selectedLanguage)}
      value={code}
      onChange={onEditorChange}
      onMount={onEditorMount}
      theme="vs-dark"
      options={{
        fontSize: 12,
        lineHeight: 1.6,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
        fontLigatures: true,
        fontWeight: '400',
        letterSpacing: 0.3,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        wordWrap: 'on',
        lineNumbers: 'on',
        glyphMargin: false,
        folding: true,
        lineDecorationsWidth: 12,
        lineNumbersMinChars: 4,
        renderLineHighlight: 'all',
        renderWhitespace: 'selection',
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        smoothScrolling: true,
        mouseWheelZoom: true,
        padding: { top: 12, bottom: 12 },
      }}
    />
  </div>
);

const RightPanel = ({
  selectedLanguage,
  code,
  onLanguageChange,
  onEditorChange,
  onEditorMount,
}) => {
  return (
    <div className="right-panel__editor">
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
      />
      <CodeEditor
        selectedLanguage={selectedLanguage}
        code={code}
        onEditorChange={onEditorChange}
        onEditorMount={onEditorMount}
      />
    </div>
  );
};

export default RightPanel;
