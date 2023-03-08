import { resetServerContext } from "react-beautiful-dnd";
import { useState } from 'react';
import Tree from "../components/Tree";
import TreeItem from "../components/TreeItem";

export default function Home() {
  const [data, setData] = useState(
    [
      {
        "id": "9b1c64b4-81ca-4b7f-b0c4-4d120dd04b0d",
        "title": "Comestibles",
        "type": "parent",
        "image": "https://picsum.photos/200?random=1",
        "children": [
          {
            "id": "bbd8a42a-1c03-4630-83d9-9c64dc1f0515",
            "title": "Caramelos",
            "type": "parent",
            "image": "https://picsum.photos/200?random=2",
            "children": [
              {
                "id": "9b92ccec-5a94-4631-8faa-0c82002ef757",
                "title": "Ácidos",
                "type": "list",
                "image": "https://picsum.photos/200?random=3",
                "paging_data": {
                  "items_count": 3,
                  "current_page": 1
                },
                "children": [
                  {
                    "id": "MLA7890123456",
                    "title": "Super Acido",
                    "children": [
                      {
                        "id": "MLA0123456789",
                        "title": "Agua"
                      },
                      {
                        "id": "MLB0987654321",
                        "title": "Cocacola"
                      },
                      {
                        "id": "MLC1357908642",
                        "title": "Seven Up"
                      }
                    ]
                  },
                  {
                    "id": "MLA5678901234",
                    "title": "Caramelo bomba"
                  },
                  {
                    "id": "MLA1234567890",
                    "title": "Caramelo asesino"
                  }
                ]
              },
              {
                "id": "b9c65df2-34a1-4d1a-8faa-efecfbaea5d5",
                "title": "Dulces",
                "type": "list",
                "image": "https://picsum.photos/200?random=4",
                "paging_data": {
                  "items_count": 2,
                  "current_page": 1
                },
                "children": [
                  {
                    "id": "MLB2468109753",
                    "title": "Sugus"
                  },
                  {
                    "id": "MLB8642097531",
                    "title": "De miel"
                  }
                ]

              }
            ]
          },
          {
            "id": "c3f746a3-6203-4b8e-88e3-3de99cc9c180",
            "title": "Alfajores",
            "type": "list",
            "image": "https://picsum.photos/200?random=5",
            "paging_data": {
              "items_count": 2,
              "current_page": 1
            },
            "children": [
              {
                "id": "MLC9753108642",
                "title": "Alfajor Jorgito"
              },
              {
                "id": "MCO1098765432",
                "title": "Alfajor Guaymayen"
              }
            ]
          }
        ]
      },
      {
        "id": "a1234567-89bc-4def-1234-56789abcdef0",
        "title": "Bebidas",
        "type": "list",
        "image": "https://picsum.photos/200?random=6",
        "children": [
          {
            "id": "MLA0123456789",
            "title": "Agua"
          },
          {
            "id": "MLB0987654321",
            "title": "Cocacola"
          },
          {
            "id": "MLC1357908642",
            "title": "Seven Up"
          }
        ]
      }
    ]
  )

  const reorder = (starIndex, endIndex, list) => {
    const result = [...list]
    const [removed] = result.splice(starIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const [expanded, setExpanded] = useState([]);

  const reorderWithCoorder = (start, end, obj) => {
    const coordStart = [...start]
    const coordEnd = [...end]
    const newObj = [...obj]
    let elementRemovie = undefined

    if(coordStart.length === 1 && coordEnd.length === 1) {
      return reorder(coordStart[0], coordEnd[0], newObj)
    }

    const getElementByCorrd = (newCoordStart, recurObj) => {
      if (newCoordStart.length === 2) {
        const coord = newCoordStart.shift()
        const result = recurObj[coord]
        const [removed] = result.children.splice(newCoordStart[0], 1)
        elementRemovie = removed
        return
      }
      const coord = newCoordStart.shift()
      getElementByCorrd(newCoordStart, recurObj[coord].children)
    }
    getElementByCorrd(coordStart, newObj)

    const insertElemetByCord = (newCoordEnd, newObj) => {
      if (newCoordEnd.length === 2) {
        const coord = newCoordEnd.shift()
        const result = newObj[coord]
        result.children.splice(newCoordEnd[0], 0, elementRemovie)
        return
      }
      const coord = newCoordEnd.shift()
      insertElemetByCord(newCoordEnd, newObj[coord].children)
    }

    insertElemetByCord(coordEnd, newObj)

    return newObj
  }


  const RenderItems = ({ obj, level = 0, tree = "" }) => {
    return (
      (obj ?? []).map((child, index) => {
        const newTree = tree.split('.')
        newTree[level] = index
        const nodeId = newTree.toString().replace(/,/g, '.');
        return (
          <div key={nodeId}>
            {
              child.children ? (
                <TreeItem label={`${child.title}: ${nodeId}`} nodeId={`${nodeId}`}>
                  <RenderItems obj={child.children} level={level + 1} tree={`${nodeId}`} />
                </TreeItem>
              ) : child.type === 'list' ? (
                <TreeItem label={`${child.title}:  ${nodeId}`} nodeId={`${nodeId}`}>
                  <RenderItems obj={child.items.values} level={level + 1} tree={`${nodeId}`} />
                </TreeItem>
              ) : (<TreeItem label={`${child.title}:  ${nodeId}`} nodeId={`${nodeId}`} />)
            }
          </div>
        )
      })
    )
  }

  const HonClick = () => {
    const newdata = [...data]
    newdata[0].children.push({
      id: 'seccion-3',
      title: 'seccion',
    },)
    setData(newdata)
  }

  const onDragEnd = (e) => {
    const { source, destination, draggableId } = e;
    if (destination === null) {
      return
    }

    const id = destination.index

    const abc = document.getElementById(id)
    let text = abc.getAttribute("data-rbd-draggable-id");
    const startElements = draggableId.split('.').map((dragId) => parseInt(dragId))
    const endElements = text.split('.').map((dragId) => parseInt(dragId))

    const result = reorderWithCoorder(startElements, endElements, data)
    console.log(startElements, 'startElements', endElements, 'endElements')
    setData(result)
    //TODO actualizar el estado
  }
  return (
    <div className="root">
      <Tree expanded={expanded} onExpand={setExpanded} onDragEnd={onDragEnd}>
        <RenderItems obj={data} />
      </Tree>
      {/* <button onClick={HonClick}>click</button> */}
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  resetServerContext();
  return { props: { data: [] } }
}