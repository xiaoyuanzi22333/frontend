import React, {useState} from 'react';
import Sidernodes from './SiderNodes'
import classnames from 'classnames';
import './Sider.css'
import { useStore } from 'reactflow';



function Sider() {
  const onDragStart = (event: any, nodeType: any) => {
    console.log("output the nodetype");
    console.log(nodeType);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };  

  const edges = useStore(state => state.edges);
  const state = useStore((state) => state);

  function OnClickButton(){
    console.log(edges);
    console.log(state.getNodes());
  };


  return (
    <div className='sider'>
      <span className='sider_title'> Layer Choice </ span>
      <div className="nodes">
          {Sidernodes?.map((x) => (
            <div
              key = {x.data.label}
              className={classnames(["sider-node", x.data.label])}
              onDragStart={(event: any) => onDragStart(event, x.type)}
              draggable
            >
              {x.data.label}
            </div>
          ))}
      </div>
      <button  className="save"  onClick={OnClickButton}>show the state</button>
    </div>
  );
}

export default Sider;