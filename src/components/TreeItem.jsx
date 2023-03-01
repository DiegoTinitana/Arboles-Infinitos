import {useContext, Children, isValidElement} from "react";
import { Draggable } from "react-beautiful-dnd";

import TreeContext from "./TreeContext";
import TreeItemContext from "./TreeItemContext";


function TreeItem(props) {
  const { children, label, nodeId } = props;

  const { isExpanded, toggleNode, getIndex } = useContext(TreeContext)

  const { level, siblingsLength, index } = useContext(TreeItemContext)

  const arr = Children.toArray(children);

  const childrenIncreased = arr.map((child, index) => {
    if (isValidElement(child)) {
      const contextValue = {
        index,
        level: level + 1,
        siblingsLength: arr.length
      };
      return (
        <TreeItemContext.Provider key={child.key} value={contextValue}>
          {child}
        </TreeItemContext.Provider>
      );
    }
    return null;
  });

  const expandable = arr.length > 0;

  const expanded = expandable ? isExpanded(nodeId) : undefined;

  const expandedIcon = expanded ? "-" : "+";

  const absoluteIndex = getIndex(nodeId);

  return (
    <Draggable index={absoluteIndex} draggableId={nodeId}>
      {(provided) => (
        <>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="items-tree "
            level={level}
            id={nodeId}
            tabIndex={0}
          >
            <div onClick={() => toggleNode(nodeId)}>
              {expandable && expandedIcon}
            </div>
            <div>{label}</div>
          </div>
          {expanded && childrenIncreased}
        </>
      )}
    </Draggable>
  );
}

export default TreeItem;
