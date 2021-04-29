import React from "react";
import useResizeObserver from "use-resize-observer/polyfilled";

export interface ResponsiveWrapperProps {
  children: (width: number, height: number) => React.ReactNode;
}

const ResponsiveWrapper = (props: ResponsiveWrapperProps) => {
  const { ref, width = 0, height = 0 } = useResizeObserver<HTMLDivElement>();

  return (
    <div ref={ref} className="w-full">
      {/* This paddingTop trick forces height to be the same as width */}
      <div style={{ paddingTop: "100%" }} className="relative">
        <div style={{ height: height, top: "0" }} className="absolute">
          {props.children(width, height)}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveWrapper;
