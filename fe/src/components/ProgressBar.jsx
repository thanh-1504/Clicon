// eslint-disable-next-line react/prop-types
function ProgressBar({ progress }) {
  return (
    <div className="progress-bg w-full h-1 bg-[rgba(0,0,0,0.076)] absolute -bottom-0">
      <div
        style={{ width: `${progress}%`, maxWidth: "100%" }}
        className={`progess rounded-sm bg-green-500 h-1 transition-all`}
      ></div>
    </div>
  );
}

export default ProgressBar;
