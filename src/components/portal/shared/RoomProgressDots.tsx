type RoomProgressDotsProps = {
  activeIndex: number;
  total?: number;
};

export function RoomProgressDots({
  activeIndex,
  total = 7,
}: RoomProgressDotsProps) {
  return (
    <div className="flex items-center gap-2" aria-label={`Room ${activeIndex + 1} of ${total}`}>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={
            index === activeIndex
              ? "h-0.5 w-6 bg-white"
              : "h-1 w-1 rounded-full bg-neutral-700"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}
