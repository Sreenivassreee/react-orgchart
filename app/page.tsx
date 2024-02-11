"use client";
import React, { useState } from "react";
import * as go from "gojs";
import DiagramWrapper from "./components/Diagram";

interface NodeData {
  key: number;
  text: string;
  color: string;
  loc: string;
}

interface LinkData {
  key: number;
  from: number;
  to: number;
}

interface ModelData {
  canRelink: boolean;
}

const Home: React.FC = () => {
  const [state, setState] = useState<{
    nodeDataArray: NodeData[];
    linkDataArray: LinkData[];
    modelData: ModelData;
    selectedKey: number | null;
    skipsDiagramUpdate: boolean;
  }>({
    nodeDataArray: [
      { key: 0, text: "Alpha", color: "lightblue", loc: "0 0" },
      { key: 1, text: "Beta", color: "orange", loc: "150 0" },
      { key: 2, text: "Gamma", color: "lightgreen", loc: "0 150" },
      { key: 3, text: "Delta", color: "pink", loc: "150 150" },
    ],
    linkDataArray: [
      { key: -1, from: 0, to: 1 },
      { key: -2, from: 0, to: 2 },
      { key: -3, from: 1, to: 1 },
      { key: -4, from: 2, to: 3 },
      { key: -5, from: 3, to: 0 },
    ],
    modelData: {
      canRelink: true,
    },
    selectedKey: null,
    skipsDiagramUpdate: false,
  });

  const handleDiagramEvent = (e: go.DiagramEvent) => {
    const name = e.name;
    switch (name) {
      case "ChangedSelection": {
        const sel = e.subject.first();
        if (sel) {
          setState((prevState) => ({ ...prevState, selectedKey: sel.key }));
        } else {
          setState((prevState) => ({ ...prevState, selectedKey: null }));
        }
        break;
      }
      default:
        break;
    }
  };

  const handleModelChange = (obj: go.IncrementalData) => {
    const {
      insertedNodeKeys,
      modifiedNodeData,
      removedNodeKeys,
      insertedLinkKeys,
      modifiedLinkData,
      removedLinkKeys,
    } = obj;
    console.log(
      insertedNodeKeys,
      modifiedNodeData,
      removedNodeKeys,
      insertedLinkKeys,
      modifiedLinkData,
      removedLinkKeys
      // modifiedModelData
    );
    // see gojs-react-basic for an example model change handler
    // when setting state, be sure to set skipsDiagramUpdate: true since GoJS already has this update
  };

  const handleRelinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setState((prevState) => ({
      ...prevState,
      modelData: { canRelink: value },
      skipsDiagramUpdate: false,
    }));
  };

  let selKey;
  if (state.selectedKey !== null) {
    selKey = <p>Selected key: {state.selectedKey}</p>;
  }

  return (
    <div>
      <DiagramWrapper
        nodeDataArray={state.nodeDataArray}
        linkDataArray={state.linkDataArray}
        modelData={state.modelData}
        skipsDiagramUpdate={state.skipsDiagramUpdate}
        onDiagramEvent={handleDiagramEvent}
        onModelChange={handleModelChange}
      />
      <label>
        Allow Relinking?
        <input
          type="checkbox"
          id="relink"
          checked={state.modelData.canRelink}
          onChange={handleRelinkChange}
        />
      </label>
      {selKey}
    </div>
  );
};

export default Home;
