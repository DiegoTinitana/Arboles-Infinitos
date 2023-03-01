import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useCallback, useState } from 'react';


const Item = ({ id, name, index }) => {
  const [showChildren, setShowChildren] = useState(false);
  const handleClick = useCallback(() => {
    setShowChildren(!showChildren);
  }, [showChildren, setShowChildren]);
  return (
    <div onClick={handleClick} style={{fontWeight: showChildren ? 'bold': 'normal'}}>
      {`${name}: ${index}`}
    </div>
  );
};

const Tree = ({ obj, index }) => {
  return (
    (obj ?? []).map((child, i) => {
      return (
        <div key={child.id} className="items-tree">
          {
            child.children ? (
              <div>
                <Item {...child} index={i}/>
                <Tree obj={child.children} index={index + 1} />
              </div>
            ) : (
              <Item {...child} index={i}/>
            )
          }
        </div>
      )
    })
  )
}
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
            },
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
  return (
    <div>
      <div style={{ padding: 20 }}>
        <Tree obj={data} index={0} />
      </div>
    </div>
  )
}
