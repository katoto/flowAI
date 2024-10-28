import { NodeTypes } from '@xyflow/react';
import BaseNode from './BaseNode';
import FirstNode from './FirstNode';
import WorkFlow from './WorkFlow';
import IntentionNode from './IntentionNode';
import QuestionNode from './QuestionNode';

// EDGE
import CustomEdge from './Edges';

export const kNodeTypes: NodeTypes = {
  base: BaseNode,
  first: FirstNode,
  workFlow: WorkFlow,
  intention: IntentionNode,
  question: QuestionNode,
};


export const kEdgeTypes = {
  custom: CustomEdge
}
