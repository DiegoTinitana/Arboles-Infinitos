import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useCallback, useState } from 'react';
import Tree from "../components/Tree";
import TreeItem from "../components/TreeItem";
// const Item = ({ id, name, index }) => {
//   const [showChildren, setShowChildren] = useState(false);
//   const handleClick = useCallback(() => {
//     setShowChildren(!showChildren);
//   }, [showChildren, setShowChildren]);
//   return (
//     <div onClick={handleClick} style={{ fontWeight: showChildren ? 'bold' : 'normal' }}>
//       {`${name}: ${index}`}
//     </div>
//   );
// };

// const Tree = ({ obj, lavel, bbb }) => {
//   const newLavel = lavel + 1
//   return (
//     (obj ?? []).map((child, i) => {
//       const abc = bbb.split(',')
//       abc[newLavel] = i
//       abc.toString()
//       return (
//         <div key={child.id} className="items-tree">
//           {
//             child.children ? (
//               <div>
//                 <Item {...child} index={`${abc}` } />
//                 <Tree obj={child.children} lavel={newLavel} bbb={`${abc}`}/>
//               </div>
//             ) : (
//               <Item {...child} index={`${abc}`} />
//             )
//           }
//         </div>
//       )
//     })
//   )
// }

export default function Home() {
  const [data, setData] = useState([
    {
      id: 'Ropa',
      name: 'Ropa',
      children: [
        {
          id: 'seccion-1',
          name: 'seccion',
          children: [
            {
              id: 'item-1',
              name: 'item',
            },
            {
              id: 'item-2',
              name: 'item',
            },
            {
              id: 'item-3',
              name: 'item',
            },
          ],
        },
        {
          id: 'seccion-2',
          name: 'seccion',
          children: [
            {
              id: 'item-3',
              name: 'item',
            },
            {
              id: 'item-4',
              name: 'item',
            }
          ],
        },
      ],
    },
    {
      id: 'Carros',
      name: 'Carros',
      children: [
        {
          id: 'seccion-1',
          name: 'seccion',
          children: [
            {
              id: 'item-1',
              name: 'item',
            },
          ],
        },
        {
          id: 'seccion-2',
          name: 'seccion',
          children: [
            {
              id: 'item-1',
              name: 'item',
            },
            {
              id: 'item-2',
              name: 'item',
            },
          ],
        },
      ],
    },
  ])
  const [expanded, setExpanded] = useState([]);
  return (
    <div>
      {/* <div style={{ padding: 20 }}>
        <Tree obj={data} index={0} lavel={-1} bbb=""/>
      </div> */}
      <Tree expanded={expanded} onExpand={setExpanded}>
        <TreeItem label="Item 1" nodeId="1">
          <TreeItem label="Item 1.1" nodeId="1.1" />
          <TreeItem label="Item 1.2" nodeId="1.2" />
          <TreeItem label="Item 1.3" nodeId="1.3">
            <TreeItem label="Item 1.3.1" nodeId="1.3.1" />
          </TreeItem>
        </TreeItem>
        <TreeItem label="Item 2" nodeId="2" />
        <TreeItem label="Item 3" nodeId="3" />
      </Tree>
    </div>
  )
}
