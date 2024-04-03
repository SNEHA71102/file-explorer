//in our main "root" folder we have array of items inside it, basically it is like a tree data structure
//we require some tree-traversing-algorithm 
//whenever we find that particukar node we are supposed to add our elememnt inside of that particular node
//ALL OF OUR HOOKS SHOULD START WITH THIS "USE" KEYWORD   
const useTraverseTree = () => {
    
    function insertNode (tree, folderId, item, isFolder) {
        //chck whether first node the place we are supoosed to add our new item 
      if (tree.id === folderId && tree.isFolder) {
        //unshift add the item at the very first place
        tree.items.unshift({
          id:new Date().getTime(),
          name: item,
          isFolder,
          items: []
        });
        return tree;
        }
      //now looping the entire remaining tree through "DEPTH-FIRST-SEARCH"
      //first it take the root folder then go inside this public folder then its going 
      //inside public nested and check all of these if it doesn't find that its gonna come out 
      //and go inside src and in-depth check all file/folder and matches with ID 
      let latestNode =[]
      latestNode=tree.items.map((ob)=>{
        return insertNode(ob,folderId,item,isFolder);
      });
      return {...tree, items:latestNode};
    }
    return {insertNode};
};
export default useTraverseTree;