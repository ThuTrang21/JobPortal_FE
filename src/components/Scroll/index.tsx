import { forwardRef } from "react";
import Scrollbar from "simplebar-react";

const Scroll = forwardRef(
  (
    {
      children,
      className,
      style,
    }: React.PropsWithChildren & {
      className?: string;
      style?: React.CSSProperties;
    },
    ref: any
  ) => {
    return (
      <Scrollbar forceVisible="y" className={className} style={style} ref={ref}>
        {children}
      </Scrollbar>
    );
  }
);

export default Scroll;
