import React from "react";

export default function AuthHeader({
  title,
  subtitle,
  titleClassName = "",
  subtitleClassName = "",
}) {
  return (
    <>
      {title ? <h2 className={titleClassName}>{title}</h2> : null}
      {subtitle ? <p className={subtitleClassName}>{subtitle}</p> : null}
    </>
  );
}
