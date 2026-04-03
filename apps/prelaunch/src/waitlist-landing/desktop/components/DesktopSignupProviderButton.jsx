export default function DesktopSignupProviderButton({ className, Icon, label, onClick }) {
  const ProviderIcon = Icon;

  return (
    <button className={className} type="button" onClick={onClick}>
      <ProviderIcon />
      <span>{label}</span>
    </button>
  );
}
