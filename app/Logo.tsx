export default function Logo() {
  return (
    <div className="logo">
      <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="5" y="42" width="14" height="14" rx="3" fill="#eda084" />
        <rect x="25" y="32" width="14" height="24" rx="3" fill="#eda084" />
        <rect x="45" y="22" width="14" height="34" rx="3" fill="#e17a5f" />
        <polygon
          points="52,3 54.3,9.6 61.3,9.9 55.7,14 57.8,20.6 52,16.6 46.2,20.6 48.3,14 42.7,9.9 49.7,9.6"
          fill="#e17a5f"
        />
      </svg>
      <span className="logo-word">ontop</span>
    </div>
  );
}
