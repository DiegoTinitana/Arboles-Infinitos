import React, { useCallback, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TreeContext from "./TreeContext";
import TreeItemContext from "./TreeItemContext";

function Tree(props) {
  const { children, expanded, onExpand, onDragEnd } = props;

  const nodeIndexRef = useRef(0);
  let relativeIndex = 0

  const arr = React.Children.toArray(children);
  const isExpanded = useCallback(
    (nodeId) => {
      return expanded ? expanded.includes(nodeId) : false;
    },
    [expanded]
  );

  const getIndex = useCallback(
    (nodeId) => {
      const firstNodeElement = arr[0];
      if (nodeId === firstNodeElement.props.nodeId) {
        nodeIndexRef.current = 0;
        return 0;
      } else {
        return ++nodeIndexRef.current;
      }
    },
    [arr]
  );

  const toggleNode = useCallback(
    (nodeId) => {
      if (onExpand && expanded) {
        nodeIndexRef.current = 0;
        if (isExpanded(nodeId)) {
          onExpand(expanded.filter((id) => id !== nodeId));
        } else {
          onExpand([...expanded, nodeId]);
        }
      }
    },
    [onExpand, isExpanded, expanded]
  );

  const childrenIncreased = arr.map((child, index) => {
    if (React.isValidElement(child)) {
      const childContextValue = {
        index,
        level: 0,
        siblingsLength: arr.length
      };
      return (
        <TreeItemContext.Provider key={child.key} value={childContextValue}>
          {child}
        </TreeItemContext.Provider>
      );
    }
    return null;
  });

  const contextValue = {
    isExpanded,
    toggleNode,
    getIndex
  };

  return (
    <TreeContext.Provider value={contextValue}>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId="test">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {childrenIncreased}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </TreeContext.Provider>
  );
}

export default Tree;
