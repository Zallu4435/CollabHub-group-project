"use client";
import React from "react";

type Props = {
  onFontSizeChange?: (size: number) => void;
  onToggleFocus?: (focus: boolean) => void;
  contentForTTS?: string;
};

export default function ReadingControls({ onFontSizeChange, onToggleFocus, contentForTTS }: Props) {
  const [fontSize, setFontSize] = React.useState(18);
  const [focus, setFocus] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);

  React.useEffect(() => {
    onFontSizeChange?.(fontSize);
  }, [fontSize, onFontSizeChange]);

  React.useEffect(() => {
    onToggleFocus?.(focus);
  }, [focus, onToggleFocus]);

  const startSpeak = () => {
    if (!contentForTTS || typeof window === "undefined") return;
    const utterance = new SpeechSynthesisUtterance(contentForTTS);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const stopSpeak = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const handleFontDecrease = () => {
    setFontSize(s => Math.max(14, s - 2));
  };

  const handleFontIncrease = () => {
    setFontSize(s => Math.min(28, s + 2));
  };

  return (
    <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Font Size Controls */}
      <div className="flex items-center px-4 py-2 border-r border-gray-200">
        <span className="text-sm font-medium text-gray-700 mr-3">Font Size</span>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleFontDecrease}
            className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-150"
            disabled={fontSize <= 14}
            title="Decrease font size"
          >
            A⁻
          </button>
          <span className="text-xs text-gray-500 w-8 text-center font-mono">{fontSize}</span>
          <button
            onClick={handleFontIncrease}
            className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-150"
            disabled={fontSize >= 28}
            title="Increase font size"
          >
            A⁺
          </button>
        </div>
      </div>

      {/* Focus Mode Toggle */}
      <div className="px-4 py-2 border-r border-gray-200">
        <button
          onClick={() => setFocus(f => !f)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${
            focus
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
          }`}
          title={focus ? "Exit focus mode" : "Enter focus mode"}
        >
          {focus ? (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Exit Focus
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Focus
            </span>
          )}
        </button>
      </div>

      {/* Text-to-Speech Controls */}
      <div className="px-4 py-2">
        {!speaking ? (
          <button
            onClick={startSpeak}
            disabled={!contentForTTS}
            className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Read article aloud"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M12 2l3 3H9l3-3zM9 19h6" />
            </svg>
            Read Aloud
          </button>
        ) : (
          <button
            onClick={stopSpeak}
            className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-150"
            title="Stop reading"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
            </svg>
            Stop
          </button>
        )}
      </div>
    </div>
  );
}