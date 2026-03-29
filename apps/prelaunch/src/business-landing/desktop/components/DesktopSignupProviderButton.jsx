export default function DesktopSignupProviderButton({ className, Icon, label }) {
  const ProviderIcon = Icon;

  return (
    <button className={className} type="button">
      <ProviderIcon />
      <span>{label}</span>
    </button>
  );
}

