export default function PrelaunchCheckpoint({ id, order, surface, position = "start" }) {
  return (
    <span
      aria-hidden="true"
      className={`prelaunch-checkpoint prelaunch-checkpoint--${position}`}
      data-prelaunch-checkpoint-id={id}
      data-prelaunch-checkpoint-order={String(order)}
      data-prelaunch-checkpoint-surface={surface || id}
    />
  );
}
