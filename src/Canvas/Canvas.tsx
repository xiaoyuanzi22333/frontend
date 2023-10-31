import { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, addEdge, applyEdgeChanges, applyNodeChanges, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

import {InputTensor, OutputTensor, Conv2D, AvgPool2d, BatchNorm2D} from './LayerNode';

import './Canvas.css';
import { initialNodes,initialEdges } from './defaultelements';


// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { 
  Input: InputTensor,
  Output: OutputTensor,
  conv2dUpdater: Conv2D, 
  poolUpdater: AvgPool2d,
  BatchNormUpdater: BatchNorm2D
};

let id = initialNodes.length;
const getId = () => `node(${++id})`;

function Canvas() {
  const reactFlowWrapper = useRef<HTMLInputElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // console.log(reactFlowInstance);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any): any => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any): any => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      
      const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds!.left,
        y: event.clientY - reactFlowBounds!.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onConnect = useCallback(
    (connection: any): any => {
      const { source, target } = connection;
      let src_num: any = source.slice(4);
      let tag_num: any = target.slice(4);

      const newEdge: any = {
        id: `edge${src_num}-${tag_num}`,
        source,
        target,
        // type: 'customEdge',
        style: { strokeWidth: 3 },
      };
      setEdges((prevElements: any):any => addEdge(newEdge, prevElements));
    },[]
  );

  return (
    <div className='canvas' ref={reactFlowWrapper} >
      <ReactFlow
        
        edges={edges}
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
      <Controls position='bottom-right'/>
      <Background  variant={BackgroundVariant.Lines}/>
      </ReactFlow>
    </div>
  );
}

export default Canvas;
