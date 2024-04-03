import { useState } from 'react';
import './styles.css';
import explorer from './data/folderData';
import Folder from './components/Folder';
import useTraverseTree from './hooks/use-traverse-tree';

export default function App() {
  //usestate-returns us two things inside of this array-
  //1. actualState or variable= explorer data and 2.to change the state =setexplorerData 
  const [explorerData,setExplorerData] = useState(explorer)
  const {insertNode} = useTraverseTree();
  //creating a func over here for inserting the node which i'm going to send to our folder component
  const handleInsertNode = (folderId,item,isFolder)=>{
    const finalTree = insertNode(explorerData,folderId,item,isFolder)
    //after we have our finalTree we're going to update our originalTree
    setExplorerData(finalTree);
  
  };
  return (
  <div className="App">
    {/* sending explorer data TO FOLDER components */}
    < Folder handleInsertNode={handleInsertNode} explorer = {explorerData} />
  </div>
  );
}


