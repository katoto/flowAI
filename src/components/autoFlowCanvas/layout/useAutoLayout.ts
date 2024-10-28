import { useState } from "react";
import { getReactflowData, kReactflow } from "../states/reactflow";
import { getRootNode } from "./metadata";
import { ILayoutReactflow, layoutReactflow } from "./node";
import { nextTick } from "@/utils/tools";

export const layoutWithFlush = async (options: ILayoutReactflow) => {

  const layout = await layoutReactflow(options);
  kReactflow.instance?.setNodes(layout.nodes);
  kReactflow.instance?.setEdges(layout.edges);
  // Wait for render to complete
  await nextTick(10);
  const { nodes, edges } = getReactflowData();
  return { layout, nodes, edges };
};

export const useAutoLayout = () => {
  const [layouting, setLayouting] = useState(false);

  // ILayoutReactflow
  const layout = async (options: any) => {

    if (!kReactflow.instance || layouting || options.nodes.length < 1) {
      return;
    }
    setLayouting(true);

    /**
     * 首次算居中 避免跳跃
     */
    let layoutData = undefined
    if(options && !options.nodes[0].position || (options.nodes[0].position.x === 0 && options.nodes[0].position.y === 0)) {
      layoutData = await layoutWithFlush({
        ...options,
        visibility: "hidden", // Hide layout during the first layout pass
      });

      const root = getRootNode(layoutData.layout.nodes);
      const offset = {
        x: 0 * document.body.clientHeight,
        y: 0.3 * document.body.clientHeight,
      };

      console.log('root', root, document.body.clientWidth);
      if (root) {

        layoutWithFlush({
          ...options,
          visibility: "visible", // Hide layout during the first layout pass
        });

        kReactflow.instance.setCenter(
          root.position.x + offset.x,
          root.position.y + offset.y,
          {
            zoom: 0.5,
          }
        );
      }
      setLayouting(false);

    } else {
      layoutData = await layoutWithFlush({
        ...options,
        visibility: "visible",
      });
    }
    setLayouting(false);
    return layoutData.layout
  };

  return { layout, layouting };
};
