import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

function InputTensor() {
  return (
    <div className="text-updater-node">
      <span className='Input Tensor'>Input Tensor</span>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} isConnectable={isConnectable}/> */}
      <Handle type="source" position={Position.Right} id="b" isConnectable={true}/>
    </div>
  );
}

function OutputTensor() {
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} id="b" isConnectable={true}/>
      <span className='Output Tensor'>Output Tensor</span>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} isConnectable={isConnectable}/> */}
    </div>
  );
}

function Conv2D() {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable={true}/>
      <span className='conv2d-title'>Conv2D</span>
      <br/>
      <div>
        <span>in_channels:</span> <br/>
        <input name="text" onChange={onChange} className="nodrag" />
      </div>
      <div>
        <span>out_channels:</span> <br/>
        <input name="text" onChange={onChange} className="nodrag" />
      </div>
      <div>
        <span>kernel_size:</span> <br/>
        <input name="text" onChange={onChange} className="nodrag" />
      </div>
      <div>
        <span>stride:</span> <br/>
        <input name="text" onChange={onChange} className="nodrag" value={"None"}/>
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} isConnectable={isConnectable}/> */}
      <Handle type="source" position={Position.Right} id="b" isConnectable={true}/>
    </div>
  );
}

function AvgPool2d() {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable={true}/>
      <span className='conv2d-title'>AvgPool2d</span>
      <br/>
      <div>
        <span>kernel_size:</span> <br/>
        <input name="text" onChange={onChange} className="nodrag" />
      </div>
      <div>
        <span>stride:</span> <br/>
        <input name="text" onChange={onChange} className="nodrag" value={"None"}/>
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} isConnectable={isConnectable}/> */}
      <Handle type="source" position={Position.Right} id="b" isConnectable={true}/>
    </div>
  );
}

function BatchNorm2D(){
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable={true}/>
      <span className='conv2d-title'>BatchNorm2D</span>
      <br/>
      <div>
        <span>num_feature:</span> <br/>
        <input  name="text" onChange={onChange} className="nodrag" />
      </div>
      <div>
        <span>eps:</span> <br/>
        <input  name="text" onChange={onChange} className="nodrag" value={"1e-5"}/>
      </div>
      <div>
        <span>momentum:</span> <br/>
        <input name="text" onChange={onChange} className="nodrag" value={"0.1"}/>
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} isConnectable={isConnectable}/> */}
      <Handle type="source" position={Position.Right} id="b" isConnectable={true}/>
    </div>
  );
}

export {InputTensor, OutputTensor, Conv2D, AvgPool2d, BatchNorm2D};
