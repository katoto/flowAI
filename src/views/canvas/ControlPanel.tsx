import React from "react";
import { button, Leva, useControls } from "leva";

export const values = {
  // 间距: {
  //   value: {
  //     x: 120,
  //     y: 50,
  //   },
  //   joystick: false,
  // },
  方向: {
    options: ["垂直", "水平"],
  },
} as const;


export const kReactflowLayoutConfig: {
  setState: any;
  state: typeof values;
} = {} as any;

function ControlPanel(params: any) {
   const { layoutFn } = params;

  const [state, setState] = useControls(() => ({
    ...values,
    layout: {
      order: 6,
      label: "调整布局",
      ...button((get) => {
        layoutFn({
          // 间距: get("间距"),
          direction: get("方向") === '水平' ? 'horizontal' : 'vertical',
        });
      }),
    }
  }));

  kReactflowLayoutConfig.state = state as any;

  kReactflowLayoutConfig.setState = setState;


  return (
    <div style={{ position: "absolute", right: 18, top: 18, zIndex: 100 }}>
      <Leva
        fill
        hideCopyButton
        titleBar={{
          filter: false,
        }}
      />
    </div>
  );
}

export default ControlPanel;
