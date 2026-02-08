import React from "react";

export default function HeaderPanelContainer({
  open,
  wrapperClassName = "",
  panelClassName = "",
  panelProps = {},
  children,
}) {
  const Wrapper = wrapperClassName ? "div" : React.Fragment;
  const wrapperProps = wrapperClassName ? { className: wrapperClassName } : {};

  return (
    <Wrapper {...wrapperProps}>
      <div
        className={panelClassName}
        data-state={open ? "open" : "closed"}
        {...panelProps}
      >
        {children}
      </div>
    </Wrapper>
  );
}
