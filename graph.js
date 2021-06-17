

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


    /**
     * Print all terminal paths from starting node
     * 
     * @param {*} startNode 
     * @returns 
     */
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
        return results.map(item => [startNode, ...item]);
    }


    /**
     * Print all  paths from starting node to destination
     * 
     * @param {*} startNode 
     * @returns all paths that can be reached from the starting node [] if cannot be reached
     */
    dfsPrintAllPaths(startNode){
        let visitedNodes = new Array(this.adjMatrix.length).fill(false);
        let parents = new Array(this.adjMatrix.length).fill(null);

        function dfsSearch(currentNode, graph, parent = null){

            let edges = graph[currentNode];
            visitedNodes[currentNode] = true;
            parents[currentNode] = parent;


            //Recurse
            for(let node = 0; node < edges.length; node++){
                if(edges[node] != null && visitedNodes[node] == false){
                    dfsSearch(node, graph, currentNode);
                }
            }


            return;
        }

        dfsSearch(startNode, this.adjMatrix);

        let resultPaths = [];

        for(let node = 0; node < parents.length; node++){
            if(parents[node] != null){
                let path = [node];
                let p = parents[node];
                while(p != null){
                    path.unshift(p);
                    p = parents[p];
                }

                resultPaths.push(path);
            }else if(node != startNode){
                resultPaths.push([]);
            }else{
                resultPaths.push(["startNode"]);
            }
        }

        return resultPaths;

    }

    /**
     * Get all connected components
     *  
     * @returns Connected Component
     */
    dfsGetAllConnectedComponents(){
        let visited = new Array(this.adjMatrix.length).fill(false);
        let results = [];


        function dfsSearch(node, graph, currentPath =[], memberConnectedComponent = []){

            let path = [...currentPath, node];
            visited[node] = true;
            memberConnectedComponent.push(node);
            let canTraverseChild = false;
            let edgeList = graph[node];

            //Recursive Call
            for(let n = 0; n < edgeList.length; n++){
                if(edgeList[n] != null && visited[n] == false){
                    canTraverseChild = true;
                    dfsSearch(n, graph, path, memberConnectedComponent);
                }
            }
            return memberConnectedComponent;
        }


        for(let i = 0; i < visited.length; i++){
            if(visited[i] == false){
               let component = dfsSearch(i, this.adjMatrix, [], []);
                results.push(component);
            }
        }


        return results;
    }


    /**
     * Returns a path from start to destination node
     * 
     * @param {*} startNode 
     * @param {*} endNode 
     * @returns an array of a path from start to destination node
     */
    dfsCanReach(startNode, endNode){

        let visited = new Array(this.adjMatrix.length).fill(false);
        let results = [];

        function dfsSearch(node, destNode, graph, path = []){
            //Base
            if(node == destNode){
                results.push([...path, node]);
            }
            visited[node] = true;

            //Recurse
            let edgeList = graph[node]
            let currPath = [...path, node];

            for(let n = 0; n < edgeList.length; n++){
                if(edgeList[n] != null && visited[n] == false){
                    dfsSearch(n, destNode, graph, currPath);
                }
            }

        }

        dfsSearch(startNode, endNode, this.adjMatrix, []);

        return results;
    }

    /**
     * For a graph where each node points to dependancy
     * @returns 
     */
    topologicalSort(){
        let permenentMarks = new Array(this.adjMatrix.length).fill(false);
        let tempMarks = new Array(this.adjMatrix.length).fill(false);
        let result = new Array();

        //Recursively Search UnMarked Nodes
        for(let node = 0; node < this.adjMatrix.length; node++){
            if(!permenentMarks[node]){
                //Search
                visit(node, this.adjMatrix)
    
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


     /**
     * For a graph where each dependancy points to child
     * @returns 
     */
      topologicalSort2(){
        let permenentMarks = new Array(this.adjMatrix.length).fill(false);
        let tempMarks = new Array(this.adjMatrix.length).fill(false);
        let result = new Array();

        //Recursively Search UnMarked Nodes
        for(let node = 0; node < this.adjMatrix.length; node++){
            if(!permenentMarks[node]){
                //Search
                visit(node, this.adjMatrix)
    
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
                result.unshift(node);

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

    /**
     * BFS listing level of each node
     * @param {*} startNode 
     * @returns 
     */
    bfsPrintLevels(startNode){
        let visited = new Array(this.adjMatrix.length).fill(false);
        let results = [];
        let queue = [];

        visited[startNode] = true;
        queue.push({node: startNode, level: 0});
        let currentLevel = 0;
        let currentLevelMembers = []

        while(queue.length > 0){
            let curNode = queue.shift();
            //Print Node
            if(curNode.level == currentLevel){
                currentLevelMembers.push(curNode);
            }else{
                currentLevel = curNode.level;
                results.push(currentLevelMembers);
                currentLevelMembers = [curNode];
            }

            let edgeList = this.adjMatrix[curNode.node];

            for(let n = 0; n < edgeList.length; n++){
                if(edgeList[n] != null && visited[n] == false){
                    queue.push({node: n, level: curNode.level + 1})
                    visited[n] = true;

                }
            }
        }

        if(currentLevelMembers.length != 0){
            results.push(currentLevelMembers);
        }

        return results;
    }


/**
 * Single Source Shortest Path using topsort
 * Works on DAG, negative edges, but only if topsort can be found
 * O(V+E)
 * @param {} start 
 * @returns 
 */
    singleSourceShortestPathTopSort(start){
        let topSort = this.topologicalSort2();
        let distance = new Array(topSort.length).fill(Number.POSITIVE_INFINITY);
        let parent = new Array(topSort.length).fill(null);
        distance[start] = 0;

        //Relax edges
        for(let i = 0; i < topSort.length; i++){
            let currNode = topSort[i];
            let edges = this.adjMatrix[currNode];

            for(let n = 0; n < edges.length; n++){
                if(edges[n] != null){
                    let dist = distance[currNode] + edges[n];
                    if(dist < distance[n]){
                        //Update to better val
                        parent[n] = currNode;
                        distance[n] = dist;
                    }
                }
            }
        }

        let resString = '';

        for(let n in distance){
            resString += n + ": Cost = " + distance[n] + "; Path - ";
            
            let path = [];
            let parentNode = parent[n];
            if(parentNode != null){
                path.unshift(n);
            }

            while(parentNode != null){
                path.unshift(parentNode);
                parentNode = parent[parentNode];
            }
            resString += path.join(", ") + "\n";
            
        }

        return resString;
    }

    /**
     * Works for no negative edge weights
     * O(E*log(V))
     * @param {*} start 
     */
    dijkstraSingleSourceShortestPath(start){
        let distance = new Array(this.adjMatrix.length).fill(Number.POSITIVE_INFINITY);
        let parent = new Array(this.adjMatrix.length).fill(null);
        let visited = new Array(this.adjMatrix.length).fill(false);
        distance[start] = 0;
        let pq = new MinPriorityQueue();
        pq.addItem(start, 0);

        while(pq.count != 0){
            let nodeObj = pq.removeMin();
            visited[nodeObj.node] = true;

            if(distance[nodeObj.node] < nodeObj.cost){
                continue;
            }

            let edges = this.adjMatrix[nodeObj.node];
            for(let i in edges){
                if(edges[i] != null && visited[i] == false){
                    let newDist = distance[nodeObj.node] + edges[i];
                    if(newDist < distance[i]){
                        parent[i] = nodeObj.node;
                        distance[i] = newDist;
                        pq.addItem(i, newDist);
                    }
                }
            }

        }

        let resString = '';

        for(let n in distance){
            resString += n + ": Cost = " + distance[n] + "; Path - ";
            
            let path = [];
            let parentNode = parent[n];
            if(parentNode != null){
                path.unshift(n);
            }

            while(parentNode != null){
                path.unshift(parentNode);
                parentNode = parent[parentNode];
            }
            resString += path.join(", ") + "\n";
            
        }

        return resString;

    }


    /**
     * SSSP O(EV)
     * Works on negative edges
     * Detects Negative Cycles
     * @param {*} source 
     * @returns 
     */
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


            
    getBridges(){
        let id = 0;
        let low = new Array(this.adjMatrix.length).fill(0);
        let ids = new Array(this.adjMatrix.length).fill(0);
        let visited = new Array(this.adjMatrix.length).fill(false);
        let bridges = [];

        for(let node = 0; node < visited.length; node++){
            if(visited[node] != true){
                dfs(node, -1, this.adjMatrix);
            }
        }

        function dfs(node, parent, graph){
            visited[node] = true;
            low[node] = id + 1;
            ids[node] = id + 1;
            id++;

            let edges = graph[node];

            for(let n = 0; n < edges.length; n++){
                if(edges[n] != null && n == parent){
                    continue;
                }

                if(edges[n] != null && !visited[n]){
                    dfs(n, node, graph);
                    low[node] = Math.min(low[node], low[n]);
                    if(ids[node] < low[n]){
                        bridges.push([node, n]);
                    }
                }else if(edges[n] != null){
                    low[node] = Math.min(low[node], ids[n]);
                }
            }
        }


        return bridges;
    }


    primsMinSpanTree(){

    
        let visited = new Array(this.adjMatrix.length).fill(false);
        let pq = new MinPriorityQueue();
        let startNode = 0;

        visited[startNode] = true;
        let edgeList = this.adjMatrix[startNode];
        let visitedNodeCount = 1;
        let minSpanTree = [];
        let mstCost = 0;
        

        //Load Queue
        for(let n = 0; n < edgeList.length; n++){
            if(edgeList[n] != null){
                pq.addItem(n, edgeList[n], startNode);
            }
        }

        while(pq.count != 0 && visitedNodeCount != visited.length){
            let nodeObj = pq.removeMin();

            if(visited[nodeObj.node] == false){
                let edgeList = this.adjMatrix[nodeObj.node];
                minSpanTree.push([[nodeObj.parent, nodeObj.node].join(" to "), nodeObj.cost])
                mstCost += nodeObj.cost;
                visited[nodeObj.node] = true;
                visitedNodeCount++;

                for(let n = 0; n < edgeList.length; n++){
                    if(edgeList[n] != null){
                        pq.addItem(n, edgeList[n], nodeObj.node);
                    }
                }

            }
        }

        
        return {minSpanTree, mstCost};
    }

}


class MinPriorityQueue{

    //Parent = Floor(i/2)
    //Right Child = i * 2 + 1
    //Left Child =  i * 2

    //Note - Start Heap Array at Index 1
    //Note - Javascript Arrays Grow Automatically If Adding to index == arr.length

    constructor(size = 8){
        this.heap = new Array(size).fill(null);
        this.count = 0;
    }


    addItem(node, cost, parent = null){
        if(this.count == 0){
            this.heap[1] = {node, cost, parent};
        }else{
            this.heap[this.count + 1] = {node, cost, parent};

            //Bubble Data Up
            let currentIndex = this.count + 1;
            let parentIndex = Math.floor(currentIndex/2);

            while(parentIndex >= 1){
                if(this.heap[parentIndex].cost > this.heap[currentIndex].cost){
                    //Swap items
                    let temp = this.heap[parentIndex];
                    this.heap[parentIndex] = this.heap[currentIndex];
                    this.heap[currentIndex] = temp;

                    //Recalculate Indexes
                    currentIndex = parentIndex;
                    parentIndex = Math.floor(currentIndex/2);
                }else{
                    break;
                }
            }
        }

        this.count++;
    }


    removeMin(){

        if(this.count == 0){
            return null;
        }

        let result = this.heap[1];
        //Move Last Item To Root
        this.heap[1] = this.heap[this.count];
        this.heap[this.count] = null;
        this.count--;


        //Bubble Root Down
        let currentIndex = 1;
        let leftChild = currentIndex * 2;
        let rightChild = currentIndex * 2 + 1;

        while(leftChild <= this.count || rightChild <= this.count){
            //Change Comp below to make max heap
            if(this.heap[currentIndex].cost > this.heap[leftChild]?.cost 
                || this.heap[currentIndex].cost > this.heap[rightChild]?.cost){
                //Swap items with smallest child
                if(rightChild > this.count || this.heap[leftChild].cost < this.heap[rightChild].cost){
                    let temp = this.heap[leftChild];
                    this.heap[leftChild] = this.heap[currentIndex];
                    this.heap[currentIndex] = temp;

                    //Recalculate Indexes
                    currentIndex = leftChild;
                    leftChild = currentIndex * 2;
                    rightChild = currentIndex * 2 + 1;

                }else{
                    let temp = this.heap[rightChild];
                    this.heap[rightChild] = this.heap[currentIndex];
                    this.heap[currentIndex] = temp;

                    //Recalculate Indexes
                    currentIndex = rightChild;
                    leftChild = currentIndex * 2;
                    rightChild = currentIndex * 2 + 1;
                }
            }else{
                break;
            }
        }

        return result;
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
//console.log(myGraph.dfsPrintTerminalPaths(1));
//console.log(myGraph.dfsPrintAllPaths(1));
//console.log(myGraph.dfsCanReach(9,10));
//console.log(myGraph.dfsGetAllConnectedComponents());
//console.log(myGraph.bfsPrintLevels(1));
//console.log(myGraph.bfsShortestPathIgnoreWeights(1, 9));
//console.log(myGraph.getBridges());


/**
 *  //Pointing to dependencies
 *  //Point to Children if unshift results
 * 
 *             -1 <----- 
 *           /           \
 *   0 <-----             <--3<---4
 *           \           /
 *            -2 <- 5 <--       
 * 
 * 
 */

 let myGraph2 = new GraphAdjMatrix(6);
 myGraph2.addDirectedEdge(1,0);
 myGraph2.addDirectedEdge(2,0);
 myGraph2.addDirectedEdge(3,1);
 myGraph2.addDirectedEdge(3,5);
 myGraph2.addDirectedEdge(5,2);
 myGraph2.addDirectedEdge(4,3);
 //console.log(myGraph2.dfsPrintTerminalPaths2(0));
 //console.log(myGraph2.topologicalSort2());




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
//console.log(myGraph3.singleSourceShortestPathTopSort(1));
//console.log(myGraph3.dijkstraSingleSourceShortestPath(1));


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

  myGraph4.addBidirectionalEdge(1,2);
  myGraph4.addBidirectionalEdge(1,3);
  myGraph4.addBidirectionalEdge(1,0);
  myGraph4.addBidirectionalEdge(2,5);
  myGraph4.addBidirectionalEdge(2,4);
  myGraph4.addBidirectionalEdge(2,7);
  myGraph4.addBidirectionalEdge(5,6,-10);
  myGraph4.addBidirectionalEdge(7,8,3);
  myGraph4.addBidirectionalEdge(4,9);
  myGraph4.addBidirectionalEdge(6,4);
  myGraph4.addBidirectionalEdge(8,4);
  //console.log(myGraph4.dfsPrintTerminalPaths(1));
  console.log(myGraph4.primsMinSpanTree());
