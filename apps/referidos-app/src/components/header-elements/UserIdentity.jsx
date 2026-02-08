import { Link } from "react-router-dom";

export default function UserIdentity({
  profilePath = "/cliente/perfil",
  avatarSrc,
  tier,
  displayName,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Link to={profilePath}>
          <img
            src={avatarSrc}
            alt="avatar"
            className="h-9 w-9 rounded-2xl border border-white/20 bg-white object-cover"
          />
          <span
            className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-semibold"
            style={{
              background: tier.accent,
              color: "white",
            }}
          >
            {tier.badge}
          </span>
        </Link>
      </div>
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-2">
          <Link
            to={profilePath}
            className="text-sm font-semibold text-white"
          >
            {displayName}
          </Link>
        </div>
      </div>
    </div>
  );
}
