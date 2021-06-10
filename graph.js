

class GraphAdjMatrix{
    constructor(numNodes){
        this.adjMatrix = new Array(numNodes).fill(null);
        this.adjMatrix = this.adjMatrix.map(item => new Array(numNodes).fill(null));
        //console.log(this.adjMatrix)
    }

    /**
     * Add edge from node1 to node2 with weight
     * @param {*} node1 
     * @param {*} node2 
     */
    addDirectedEdge(node1, node2, weight = 1){
        this.adjMatrix[node1][node2] = weight;
    }

    /**
     * Add edge from node1 to node2 with weight
     * and node2 to node1 with weight
     * @param {*} node1 
     * @param {*} node2 
     */
    addBidirectionalEdge(node1, node2, weight = 1){
        this.adjMatrix[node1][node2] = weight;
        this.adjMatrix[node2][node1] = weight;
    }


    dfsPrintTerminalPaths(startNode){
        let visitedNodes = new Array(this.adjMatrix.length).fill(false);

        function dfsSearch(startNode, graph){
            let result = [];
            visitedNodes[startNode] = true;

            //Base Case No Outward Edges or Visited Noded - Terminal Node
            let edgelist = graph[startNode];
            let canTraverserChild = false;
 
            for(let node = 0; node < edgelist.length; node++){
                if(edgelist[node] != null && visitedNodes[node] == false){
                    canTraverserChild = true;
                    break;
                }
            }

            if(!canTraverserChild){
                result.push([]);
                return result;
            }

            //Recursive Call
            for(let node = 0; node < edgelist.length; node++){
                if(edgelist[node] != null && visitedNodes[node] == false){
                    let recursiveResults = dfsSearch(node, graph);
                    recursiveResults = recursiveResults.map(item => [node, ...item]);
                    result.push(...recursiveResults);
                    
                }

            }


            //Return Result
            return result;

        }

        let results = dfsSearch(startNode, this.adjMatrix);
        return results.map(item => [startNode, ... item]);
    }


    topologicalSort(){
        let permenentMarks = new Array(this.adjMatrix.length).fill(false);
        let tempMarks = new Array(this.adjMatrix.length).fill(false);
        let result = new Array();

        //Recursively Search UnMarked Nodes
        for(let node = 0; node < this.adjMatrix.length; node++){
            if(!permenentMarks[node]){
                //Search
                visit(node, this.adjMatrix, tempMarks, permenentMarks, result)
    
            }
        }

        return result;


        function visit(node, graph){
            if(tempMarks[node]){
                return;
            }

            if(permenentMarks[node] == false){
                tempMarks[node] = true;
                let edgeList = graph[node];

                for(let node = 0; node < edgeList.length; node++){
                    if(edgeList[node] != null){
                        visit(node, graph)
                    }
                }

                //Update Markings
                permenentMarks[node] = true;
                tempMarks[node] = false;
                result.push(node);

            }


        }

        
        

    }


     getConnectedComponent(startNode){
        let visitedNodes = new Array(this.adjMatrix.length).fill(false);

        function dfsSearch (startNode, nodesVisited, graph){

            //Base 

            if(nodesVisited[startNode] == true){
                return null;
            }

            nodesVisited[startNode] = true;

        
            //Working Logic & Recursive Calls
            let edgeList = graph[startNode];

            for(let i = 0; i < graph.length; i++){
                if(edgeList[i] == null){
                    //No Edge Continue
                    continue;
                } 
                
                dfsSearch(i, nodesVisited, graph);
            }


            //Return Result
            return;
        }

        dfsSearch(startNode, visitedNodes, this.adjMatrix);

        return visitedNodes;
    }



    getAllConnectedComponents(){
        let visitedNode = new Array(this.adjMatrix.length).fill(false);
        let connectedComponents = [];


        for(let node = 0; node < visitedNode.length; node++){

            if(visitedNode[node]){
                continue;
            }

            //Add Connected Comp To Array
            let conComp = this.getConnectedComponent(node);
            let compIndexes = []
            for(let node = 0; node < conComp.length; node++){
                if(conComp[node]){
                    compIndexes.push(node);
                }
            }
            connectedComponents.push(compIndexes);


            //Update Visited Nodes
            for(let node = 0; node < conComp.length; node++){
                if(conComp[node]){
                    visitedNode[node] = true;
                }
            }
        }


        return connectedComponents;

    }


    bfsShortestPathIgnoreWeights(startNode, endNode){
        let parents = new Array(this.adjMatrix.length).fill(null);
        let visitedNodes = new Array(this.adjMatrix.length).fill(null);

        let queue = new Array();

        visitedNodes[startNode] = true;
        queue.push(startNode);


        while(queue.length > 0){
            let curNode = queue.shift();
            let edgeList = this.adjMatrix[curNode];

            for(let i = 0; i < edgeList.length; i++){
                if(edgeList[i] != null && visitedNodes[i] != true){
                    //Edge to not visited node
                    visitedNodes[i] = true;
                    parents[i] = curNode;
                    queue.push(i);
                }
            }

        }

        let path = [];


        if(parents[endNode] != null){

            let index = endNode;
            while(index != null){
                path.unshift(index);
                index = parents[index];
            }
        }
        return path;



    }


     bellmanFordSingleSourceShortestPaths(source){
        let distanceArray = new Array(this.adjMatrix.length).fill(Number.POSITIVE_INFINITY);
        let parentsArray = new Array(this.adjMatrix.length).fill(null);
        let paths = new Array(this.adjMatrix.length).fill(null);

        //Starting Node
        distanceArray[source] = 0;

        //Optimal Distance
        for(let v = 0; v < this.adjMatrix.length - 1; v++){
            //Relax edges v - 1 times
            for(let i = 0; i < this.adjMatrix.length; i++){
                for(let j = 0; j < this.adjMatrix.length; j++){
                    if(this.adjMatrix[i][j] != null && distanceArray[i] + this.adjMatrix[i][j] < distanceArray[j]){
                        //Update Distance
                        distanceArray[j] = distanceArray[i] + this.adjMatrix[i][j];
                        parentsArray[j] = i;
                    }
                }
            }
        }

        //Negative Cycle Detection
        for(let v = 0; v < this.adjMatrix.length - 1; v++){
            //Relax edges v - 1 times
            for(let i = 0; i < this.adjMatrix.length; i++){
                for(let j = 0; j < this.adjMatrix.length; j++){
                    if(this.adjMatrix[i][j] != null && distanceArray[i] + this.adjMatrix[i][j] < distanceArray[j]){
                        //Update Distance
                        distanceArray[j] = Number.NEGATIVE_INFINITY;
                        parentsArray[j] = -1;
                    }
                }
            }
        }


        //Reconstruct Paths
        let path = new Array();
        for(let i = 0; i < this.adjMatrix.length; i++){
            if(distanceArray[i] == Number.POSITIVE_INFINITY){
                paths[i] = path;
            }

            //Add Parents
            let index = i;
            while(parentsArray[index] != null){
                if(parentsArray[index] == -1){
                    paths[i] = null; //neg loop
                    break;
                }
                path.unshift(parentsArray[index]);
                index = parentsArray[index];
            }

            path.push(i);
            paths[i] = path;
            path = new Array();
        }


        //Return

        return {"shortestPathWeight": distanceArray, "paths": paths};
        
    }
}

/**
 *  8
 *           7 ------ 
 *           |       |   
 *  1  ----- 2 ----- 4 --- 9
 *  |        |       |
 *  3        5 -----10         0---6
 * 
 * 
 */

let myGraph = new GraphAdjMatrix(11);

myGraph.addBidirectionalEdge(1,2);
myGraph.addBidirectionalEdge(1,3);
myGraph.addBidirectionalEdge(2,5);
myGraph.addBidirectionalEdge(2,4);
myGraph.addBidirectionalEdge(5,10);
myGraph.addBidirectionalEdge(10,4);
myGraph.addBidirectionalEdge(0,6);
myGraph.addBidirectionalEdge(2,7);
myGraph.addBidirectionalEdge(4,7);
myGraph.addBidirectionalEdge(4,9);


//console.log(myGraph.adjMatrix);

//console.log(myGraph.getConnectedComponent(1));
//console.log(myGraph.getAllConnectedComponents());
console.log(myGraph.dfsPrintTerminalPaths(1));
//console.log(myGraph.bfsShortestPathIgnoreWeights(1, 9));



/**
 *  
 *             -1 <----- 
 *           /           \
 *   4 <-----             <--3<---0
 *           \           /
 *            -2 <- 5 <--       
 * 
 * 
 */

 let myGraph2 = new GraphAdjMatrix(6);
 myGraph2.addDirectedEdge(1,4);
 myGraph2.addDirectedEdge(2,4);
 myGraph2.addDirectedEdge(3,1);
 myGraph2.addDirectedEdge(3,5);
 myGraph2.addDirectedEdge(5,2);
 myGraph2.addDirectedEdge(0,3);
 //console.log(myGraph2.dfsPrintTerminalPaths(0));
 //console.log(myGraph2.topologicalSort());




 /**
 *  8           3
 *           7 ------ 
 *           |       |   
 *  1  ----- 2 ----- 4 --- 9
 *  |        |       |
 *  3        5 -----10         0---6
 *              10
 * 
 */

let myGraph3 = new GraphAdjMatrix(11);

myGraph3.addBidirectionalEdge(1,2);
myGraph3.addBidirectionalEdge(1,3);
myGraph3.addBidirectionalEdge(2,5);
myGraph3.addBidirectionalEdge(2,4);
myGraph3.addBidirectionalEdge(5,10, 10);
myGraph3.addBidirectionalEdge(10,4);
myGraph3.addBidirectionalEdge(0,6);
myGraph3.addBidirectionalEdge(2,7);
myGraph3.addBidirectionalEdge(4,7, 3);
myGraph3.addBidirectionalEdge(4,9);
//console.log(myGraph3.bellmanFordSingleSourceShortestPaths(9));


 /**
 *              3
 *           7 ------8 
 *           |       |   
 *  1  ----- 2 ----- 4 --- 9
 *  | \      |       |
 *  3  0     5 ----- 6         
 *              10
 * 
 */


  let myGraph4 = new GraphAdjMatrix(11);

  myGraph3.addBidirectionalEdge(1,2);
  myGraph3.addBidirectionalEdge(1,3);
  myGraph3.addBidirectionalEdge(2,5);
  myGraph3.addBidirectionalEdge(2,4);
  myGraph3.addBidirectionalEdge(5,10, 10);
  myGraph3.addBidirectionalEdge(10,4);
  myGraph3.addBidirectionalEdge(0,6);
  myGraph3.addBidirectionalEdge(2,7);
  myGraph3.addBidirectionalEdge(4,7, 3);
  myGraph3.addBidirectionalEdge(4,9);