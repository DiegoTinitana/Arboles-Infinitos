import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useCallback, useState } from 'react';


const Item = ({ id, name, index }) => {
  const [showChildren, setShowChildren] = useState(false);
  const handleClick = useCallback(() => {
    setShowChildren(!showChildren);
  }, [showChildren, setShowChildren]);
  return (
    <div onClick={handleClick} style={{ fontWeight: showChildren ? 'bold' : 'normal' }}>
      {`${name}: ${index}`}
    </div>
  );
};

const Tree = ({ obj, lavel, bbb }) => {
  const newLavel = lavel + 1
  return (
    (obj ?? []).map((child, i) => {
      const abc = bbb.split(',')
      abc[newLavel] = i
      abc.toString()
      return (
        <div key={child.id} className="items-tree">
          {
            child.children ? (
              <div>
                <Item {...child} index={`${abc}` } />
                <Tree obj={child.children} lavel={newLavel} bbb={`${abc}`}/>
              </div>
            ) : (
              <Item {...child} index={`${abc}`} />
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
  return (
    <div>
      <div style={{ padding: 20 }}>
        <Tree obj={data} index={0} lavel={-1} bbb=""/>
      </div>
    </div>
  )
}
