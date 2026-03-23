export default function DesktopSignupProviderButton({ className, Icon, label }) {
  return (
    <button className={className} type="button">
      <Icon />
      <span>{label}</span>
    </button>
  );
}

