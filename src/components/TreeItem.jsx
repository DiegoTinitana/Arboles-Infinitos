import { useContext, Children, isValidElement } from "react";
import { Draggable } from "react-beautiful-dnd";

import TreeContext from "./TreeContext";
import TreeItemContext from "./TreeItemContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

export const getItemStyle = (isDragging, draggableStyle, level) => {
  return {
    userSelect: "none",
    marginBottom: 5,
    paddingLeft: 30 * level,
    with: 740 - 30 * level,
    ...draggableStyle
  };
};


function TreeItem(props) {
  const { children, label, nodeId } = props;

  const { isExpanded, toggleNode, getIndex } = useContext(TreeContext)

  const { level } = useContext(TreeItemContext)

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

  const expandedIcon = expanded ? <FontAwesomeIcon icon={faAngleUp} style={{ fontSize: 13, color: '#3483FA' }} /> : <FontAwesomeIcon icon={faAngleDown} style={{ fontSize: 13, color: '#3483FA' }} />;

  const absoluteIndex = getIndex(nodeId);

  return (
    <Draggable index={absoluteIndex} draggableId={nodeId}>
      {(provided, snapshot) => (
        <div style={{ position: 'relative' }}>
          {expanded && <span className="v_line" style={{ left: (30 * level) + 15, height: "90%" }}></span>}
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
              level
            )}
            level={level}
            id={absoluteIndex}
            tabIndex={0}
          >
            {level != 0 && <div className="h_line" style={{ width: 15, left: (30 * level) - 15 }}></div>}
            <div className="items-tree-section">
              <div className="items-tree-section-container">
                <div {...provided.dragHandleProps}>
                  <FontAwesomeIcon icon={faGripVertical} style={{ fontSize: 13, color: '#3483FA' }} />
                </div>
                <div onClick={() => toggleNode(nodeId)}>
                  {expandable && expandedIcon}
                </div>
                <div>{label}</div>
                <button onClick={() => console.log(nodeId)}> show node Id</button>
              </div>
              <div className="items-tree-section-end">
                <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: 13 }} />
              </div>
            </div>
          </div>
          {expanded && childrenIncreased}
        </div>
      )}
    </Draggable>
  );
}

export default TreeItem;
