import clsx from "clsx";

import { Card } from "@/components/layout";

/*
  Presentational frame shared by <SortableItemCard> (live, draggable) and
  <SortableItemCardOverlay> (the lifted clone). It owns only layout — the
  wrapper, the Card, and the handle/children row — so the two variants can
  differ in what they plug into the `handle` slot and `cardClassName` without
  duplicating this markup.
*/

type Props = {
  children: React.ReactNode;
  handle: React.ReactNode;
  shadowStyle?: string;
  className?: string;
  cardClassName?: string;
  outerRef?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
};

export const CardShell = ({
  children,
  handle,
  shadowStyle,
  className,
  cardClassName,
  outerRef,
  style,
}: Props) => (
  <div ref={outerRef} style={style} className={clsx("relative", className)}>
    <Card className={clsx("flex justify-between", shadowStyle, cardClassName)}>
      <div className="flex grow items-center gap-2">
        {handle}
        {children}
      </div>
    </Card>
  </div>
);
