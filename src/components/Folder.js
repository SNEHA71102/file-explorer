import { useState } from "react";

function Folder({ handleInsertNode, explorer }) {
    console.log(explorer);
    //when we click on any folder it should hide or show according to requirement
    const [expand,setExpand] = useState(false);
    //for showing and hiding our input box
    const [showInput,setShowInput]=useState({
        visible:false,
        isFolder:false
    });

    const handleNewFolder = (e, isFolder) =>{
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible:true,
            isFolder
        });
    };

    //adding new folder
    const onAddFolder =(e)=>{
        //keycode===13 means "enter" key, after pressing enter-key save the event(value)
        if(e.keyCode === 13 && e.target.value){
            handleInsertNode(explorer.id,e.target.value,showInput.isFolder)
            setShowInput({...showInput,visible:false});
        }
    };

    if(explorer.isFolder)
    {return (
    <div style={{marginTop:5}}>
        <div className="folder" onClick={()=> setExpand(!expand)}>
            {/* emoji==windows key + semicolon */}
            <span>📁{explorer.name}</span>

            <div>
                <button onClick={(e)=>handleNewFolder(e,true)}>Folder +</button>
                <button onClick={(e)=>handleNewFolder(e,false)}>File +</button>    
            </div>      
        </div>
        <div style={{display:expand ? "block" : "none", paddingLeft:25}}>
            {
                showInput.visible && (
                    <div className="inputContainer">
                        <span>{showInput.isFolder ? "📁" : "📃"}</span>
                        <input 
                        type="text"
                        onKeyDown={onAddFolder}
                        //when we click on any file/folder focus is on it and after clicking outside it is gone.
                        onBlur={() => setShowInput({...showInput,visible:false})}
                        autoFocus
                        className="inputContainer__input" />
                    </div>
                )
            }
            
            
            {explorer.items.map((exp)=>{
                return (
                <Folder 
                handleInsertNode={handleInsertNode}
                explorer={exp} 
                key={exp.id}
                />
                );
                })}
                {/* render infinitely by calling folder again*/}
                
        </div>
    </div>
    );
}else{
    return <span className="file">📃{explorer.name}</span>;
}
}

export default Folder;