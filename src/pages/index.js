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

  const [expanded, setExpanded] = useState([]);

  const reorder = (starIndex, endIndex, list) => {
    const result = [...list]
    const [removed] = result.splice(starIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const getElementByCoord = (coord, children) => {
    const nextCoord = [...coord]
    if (nextCoord.length === 1) {
      const id = nextCoord.shift()
      const element = children.find((child) => child.id === id)
      const index = children.indexOf(element)
      children.splice(index, 1)
      return element
    }
    const nextId = nextCoord.shift()
    const nextChild = children.find((child) => child.id === nextId)
    return getElementByCoord(nextCoord, nextChild.children)
  }

  const insertElementByCoord = (coord, children, elementToInsert) => {
    const nextCoord = [...coord]
    if (nextCoord.length === 1) {
      const id = nextCoord.shift()
      const element = children.find((child) => child.id === id)
      const index = children.indexOf(element)
      children.splice(index, 0, elementToInsert)
      return
    }
    const nextId = nextCoord.shift()
    const nextChild = children.find((child) => child.id === nextId)
    insertElementByCoord(nextCoord, nextChild.children, elementToInsert)
  }

  const reorderElementsByCoord = (coordEnd, children, elementInsertId) => {
    const nextCoord = [...coordEnd]
    console.log(nextCoord,elementInsertId , '<<<<<<')
    if (nextCoord.length === 1) {
      const id = nextCoord.shift()
      const elementLocalPosition = children.find((child) => child.id === id)
      const elementDelete = children.find((child) => child.id === elementInsertId)
      const indexPosition = children.indexOf(elementLocalPosition)
      const indextDelete = children.indexOf(elementDelete)
      children.splice(indextDelete, 1)
      children.splice(indexPosition, 0, elementDelete)
      return
    }
    const nextId = nextCoord.shift()
    const nextChild = children.find((child) => child.id === nextId)
    reorderElementsByCoord(nextCoord, nextChild.children, elementInsertId)
  }

  const reorderWithCoorder = (start, end, obj) => {
    const coordStart = [...start]
    const coordEnd = [...end]
    const newObj = [...obj]

    const idElemetFromInsert = start[start.length - 1]
    const checkIfElementIfFather = coordEnd.some(coord => coord === idElemetFromInsert)
    if (checkIfElementIfFather) {
      return obj
    }
    if (JSON.stringify(start) === JSON.stringify(end)) {
      return obj
    }
    if (start.length === end.length) {
      reorderElementsByCoord(coordEnd, newObj, idElemetFromInsert)
      return newObj
    }
    const elementFromInsert = getElementByCoord(coordStart, newObj)
    insertElementByCoord(coordEnd, newObj, elementFromInsert)
    return newObj
  }


  const RenderItems = ({ obj, level = 0, tree = "" }) => {
    return (
      (obj ?? []).map((child, index) => {
        const newTree = tree.split('.')
        newTree[level] = child.id
        const nodeId = newTree.toString().replace(/,/g, '.');
        return (
          <div key={nodeId}>
            {
              child.children ? (
                <TreeItem label={`${child.title}`} nodeId={`${nodeId}`}>
                  <RenderItems obj={child.children} level={level + 1} tree={`${nodeId}`} />
                </TreeItem>
              ) : (<TreeItem label={`${child.title}`} nodeId={`${nodeId}`} />)
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
    const { destination, draggableId: elementStart } = e;
    if (destination === null) {
      return
    }
    const id = destination.index
    const element = document.getElementById(id)
    const elementEnd = element.getAttribute("data-rbd-draggable-id");
    const coordStart = elementStart.split('.')
    const coordEnd = elementEnd.split('.')
    const result = reorderWithCoorder(coordStart, coordEnd, data)
    setData(result)
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