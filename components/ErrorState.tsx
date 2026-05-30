interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  onReset: () => void;
}

export default function ErrorState({ message, onRetry, onReset }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-negative-light flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-negative"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-text-primary mb-2">分析失败</h2>
      <p className="text-sm text-text-secondary mb-6 max-w-md">{message}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={onRetry}
          className="px-5 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors shadow-sm"
        >
          重新分析
        </button>
        <button
          onClick={onReset}
          className="px-5 py-2 text-sm text-text-secondary rounded-lg border border-border hover:bg-surface-secondary transition-colors"
        >
          返回
        </button>
      </div>
    </div>
  );
}
