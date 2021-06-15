class BST_Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }



  class BinarySearchTree{
      constructor(){
          this.root = null;
      }

      addData(data){
          if(this.root == null){
              this.root = new BST_Node(data);
          }else{
              //Recursively Search Tree and Insert Node

              function search(data, node){
                if(data < node.data){
                    //Left Child Options
                    if(node.left == null){
                        //Insert New Node
                        node.left = new BST_Node(data);
                        return;
                    }else{
                        return search(data, node.left);
                    }
                }else{
                    //Right Child Options
                    if(node.right == null){
                        //Insert New Node
                        node.right = new BST_Node(data);
                        return
                    }else{
                        return search(data, node.right);
                    }
                }
              }

              return search(data, this.root);
          }
      }

      findMin(){
          function search(node){
              //Base
              if(node.left == null){
                  return node.data;
              }

              //Recursive Call
              if(node.left != null){
                  return search(node.left);
              }
          }

          return search(this.root);
      }


      findMax(){
        function search(node){
            //Base
            if(node.right == null){
                return node.data;
            }

            //Recursive Call
            if(node.right != null){
            return search(node.right);
            }
        }

        return search(this.root);
    }

    isInTree(data){
        function search(node, data){
            //Base Cases
            if(node.data == data){
                return [node.data];
            }else if(
                node.left == null && node.right == null 
                || data < node.data && node.left == null
                || data > node.data && node.right == null ){
                return null;
            }

            //Recursive Calls
            let result = null;
            let leftResult = null;
            let rightResult = null;

            if(data < node.data){
                leftResult = search(node.left, data);
            }else{
                rightResult = search(node.right, data);
            }

            if(leftResult != null){
                result = [node.data, ...leftResult];
            }else if(rightResult != null){
                result = [node.data, ...rightResult];            
            }

            return result;
        }

        return search(this.root, data);
    }

    removeData(data){

        function remove(node, data){
            //Base Cases

            if(node == null){
                return null;
            }

            if(node.data == data){
                //No Children
                if(node.left == null && node.right == null){
                    return null;
                }

                //No Left Return Right Child
                if(node.left == null){
                    return node.right;
                }

                //No Right Return Left Child
                if(node.right == null){
                    return node.left;
                }

                //Two Children
                let tempNode = node.right;
                while(tempNode.left != null){
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = remove(node.right, tempNode.data);
                return node;

            }else if(data < node.data){
                node.left = remove(node.left, data);
                return node;
            }else{
                node.right = remove(node.right, data);
                return node;
            }

        }

        this.root = remove(this.root, data);
    }

    minHeight(){
        
        function minH(node){
            //Base
            if( node == null){
                return -1;
            }

            let leftHeight = minH(node.left);
            let rightHeight = minH(node.right);

            if(leftHeight < rightHeight){

                return leftHeight + 1;
            }else{
                return rightHeight + 1;
            }

        }

        return minH(this.root);
    }


    maxHeight(){
        function maxH(node){
            //Base
            if( node == null){
                return -1;
            }

            let leftHeight = maxH(node.left);
            let rightHeight = maxH(node.right);

            if(leftHeight > rightHeight){
                return leftHeight + 1;
            }else{
                return rightHeight + 1;
            }

        }

       return maxH(this.root);
    }

    inOrderTraversal(){
        let result = [];

        if(this.root == null){
            return null;
        }

        function recursiveFcn(node){
            if(node.left != null){
                recursiveFcn(node.left);
            }

            result.push(node.data);

            if(node.right != null){
                recursiveFcn(node.right);
            }
        }

        recursiveFcn(this.root);

        return result;
    }

    preOrderTraversal(){
        let result = [];

        if(this.root == null){
            return null;
        }

        function recursiveFcn(node){

            result.push(node.data);

            if(node.left != null){
                recursiveFcn(node.left);
            }

            if(node.right != null){
                recursiveFcn(node.right);
            }
        }

        recursiveFcn(this.root);

        return result;
    }

    postOrderTraversal(){
        let result = [];

        if(this.root == null){
            return null;
        }

        function recursiveFcn(node){
            if(node.left != null){
                recursiveFcn(node.left);
            }


            if(node.right != null){
                recursiveFcn(node.right);
            }

            result.push(node.data);

        }

        recursiveFcn(this.root);

        return result;
    }

    levelOrder(){
        let queue = [];
        let result = [];

        if(this.root == null){
            return null;
        }

        queue.push(this.root);

        while(queue.length > 0){
            let node = queue.shift();
            result.push(node.data);

            if(node.left != null){
                queue.push(node.left);
            }


            if(node.right != null){
                queue.push(node.right);
            }

        }

        return result;

    }

    isValidBST(){

        function recursiveSearch(node){
            //Base Case
            if(node == null){
                return true;
            }

            //Recursive Call
            if(node.left != null && node.left.data > node.data){
                return false;
            }else if(node.right != null && node.right.data < node.data){
                return false
            }

            let leftResult = recursiveSearch(node.left);
            let rightResult = recursiveSearch(node.right);

            return leftResult && rightResult;
        }

        return recursiveSearch(this.root);
    }

    getLongestChain(){
        if(this.root == null){
            return []
        }

        function recursiveFCN(node, currentPath){
            //Base
            if(node == null){
                return [];
            }

            //Recursive Call
            let result = [];
            let leftResult = [node.data, ...recursiveFCN(node.left)]
            let rightResult = [node.data, ...recursiveFCN(node.right)]

            if(leftResult.length > rightResult.length){
                return leftResult;
            }else{
                return rightResult;
            }

        }

        return recursiveFCN(this.root);

    }

    getLongestChainIncreasingOrder(){
        if(this.root == null){
            return []
        }

        function recursiveFCN(node, currentPath){
            //Base
            if(node == null){
                return [];
            }

            //Recursive Call
            let leftResult = [node.data];
            let rightResult = [node.data];
            
            if(node.left != null && node.left.data > node.data){
                leftResult = [node.data, ...recursiveFCN(node.left)]
            } 

            if(node.right != null && node.right.data > node.data){
                rightResult = [node.data, ...recursiveFCN(node.right)]
            }

            if(leftResult.length > rightResult.length){
                return leftResult;
            }else{
                return rightResult;
            }

        }

        return recursiveFCN(this.root);

    }

    lowestCommonAncestor(data1, data2){
        let result = null;
        function search(node, data1, data2){

            if(node == null){
                return [];
            }

            let leftResult = [node.data, ...search(node.left, data1, data2)];
            let rightResult = [node.data, ...search(node.right, data1, data2)];

            let consolidatedResult = [...leftResult, ...rightResult];

            if(result == null 
                && consolidatedResult.indexOf(data1) != -1
                && consolidatedResult.indexOf(data2) != -1){
                    result = node.data;
                }

            return consolidatedResult;
            
        }

        search(this.root, data1, data2);

        return result;
    }
  }



  let bst = new BinarySearchTree();
  bst.addData(9);
  bst.addData(4);
  bst.addData(17);
  bst.addData(3);
  bst.addData(6);
  bst.addData(22);
  bst.addData(5);
  bst.addData(7);
  bst.addData(20);

  console.log(bst.findMin());
  console.log(bst.findMax());


  console.log(bst.minHeight());
  console.log(bst.maxHeight());


  bst.addData(10);
  console.log(bst.inOrderTraversal());
  console.log(bst.preOrderTraversal());
  console.log(bst.postOrderTraversal());
  console.log(bst.levelOrder());

  console.log(bst.isValidBST());
  console.log(bst.getLongestChain());
  console.log(bst.getLongestChainIncreasingOrder());

  console.log(bst.isInTree(7));
  console.log(bst.isInTree(111));
  console.log(bst.lowestCommonAncestor(5,20));










