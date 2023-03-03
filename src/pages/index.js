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
                children: [
                  {
                    "id": "MLA7890123456",
                    "title": "Super Acido"
                  },
                  {
                    "id": "MLA5678901234",
                    "title": "Caramelo bomba"
                  },
                  {
                    "id": "MLA1234567890",
                    "title": "Caramelo asesino"
                  }
                ],
                "items": {
                  "paging_data": {
                    "items_count": 3,
                    "current_page": 1
                  },
                }
              },
              {
                "id": "b9c65df2-34a1-4d1a-8faa-efecfbaea5d5",
                "title": "Dulces",
                "type": "list",
                "image": "https://picsum.photos/200?random=4",
                "items": {
                  "paging_data": {
                    "items_count": 2,
                    "current_page": 1
                  },
                  "values": [
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
              }
            ]
          },
          {
            "id": "c3f746a3-6203-4b8e-88e3-3de99cc9c180",
            "title": "Alfajores",
            "type": "list",
            "image": "https://picsum.photos/200?random=5",
            "items": {
              "paging_data": {
                "items_count": 2,
                "current_page": 1
              },
              "values": [
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
          }
        ]
      },
      {
        "id": "a1234567-89bc-4def-1234-56789abcdef0",
        "title": "Bebidas",
        "type": "list",
        "image": "https://picsum.photos/200?random=6",
        "items": {
          "paging_data": {
            "items_count": 3,
            "current_page": 1
          },
          "values": [
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
      }
    ]
  )
  const [expanded, setExpanded] = useState([]);
  
  const RenderItems = ({ obj, lavel = -1, tree = "" }) => {
    const newLavel = lavel + 1
    return (
      (obj ?? []).map((child, i) => {
        const newTree = tree.split('.')
        newTree[newLavel] = i
        const abc = newTree.toString().replaceAll(',','.')
        return (
          <div key={abc}>
            {
              child.children ? (
                <TreeItem label={`${child.title}: ${abc}`} nodeId={`${abc}`}>
                  <RenderItems obj={child.children} lavel={newLavel} tree={`${abc}`} />
                </TreeItem>
              ) : child.type === 'list' ? (
                <TreeItem label={`${child.title}: ${abc}`} nodeId={`${abc}`}>
                  <RenderItems obj={child.items.values} lavel={newLavel} tree={`${abc}`} />
                </TreeItem>
              ) : (<TreeItem label={`${child.title}: ${abc}`} nodeId={`${abc}`}/>)
            }
          </div>
        )
      })
    )
  }

  const HonClick =() =>{
    const newdata = [...data]
     newdata[0].children.push({
      id: 'seccion-3',
      title: 'seccion',
    },)
    setData(newdata)
  }

  const onDragEnd = (e) => {
    console.log(e)
    if( e.destination === null) {
      return
     }
   const id = e.destination.index

   const draggableId = e.draggableId
   const abc = document.getElementById(id)
   let text = abc.getAttribute("data-rbd-draggable-id");
   const elementDelete = draggableId.split('.').map((dragId) => parseInt(dragId))
   const elementInserted = text.split('.').map((dragId) => parseInt(dragId))

   console.log(elementDelete, elementInserted)
   //TODO actualizar el estado
  }
  return (
    <div>
      <Tree expanded={expanded} onExpand={setExpanded} onDragEnd={onDragEnd}>
        <RenderItems obj={data} />
      </Tree>
      <button onClick={HonClick}>click</button>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  resetServerContext();
  return { props: { data: [] } }
}