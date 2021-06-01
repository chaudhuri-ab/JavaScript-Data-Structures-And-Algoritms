

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


    dfsListAllPaths(startNode){
        let visitedNodes = new Array(this.adjMatrix.length).fill(false);

        function dfsSearch(startNode, nodesVisited, graph){

            //Base
            if(visitedNodes[startNode] == true){
                return null;
            }

            //Mark As Visited
            nodesVisited[startNode] = true;



            //Recurse

            let result = [[]]
            let edgeList = graph[startNode];

            for(let node = 0; node < edgeList.length; node++){
                if(edgeList[node] != null){
                    let recursiveResult = dfsSearch(node, nodesVisited, graph);

                    if(recursiveResult != null){
                        recursiveResult = recursiveResult.map(item => [node, ...item]);
                        result.push(...recursiveResult);
                    }
                }
            }



            //Result
            return result;
        }

        return dfsSearch(startNode, visitedNodes, this.adjMatrix);

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
}

/**
 *  8
 *           7 ------ 
 *           |       |   
 *  1  ----- 2 ----- 4
 *  |        |       |
 *  3        5 ------          0---6
 * 
 * 
 */

let myGraph = new GraphAdjMatrix(9);

myGraph.addBidirectionalEdge(1,2);
myGraph.addBidirectionalEdge(1,3);
myGraph.addBidirectionalEdge(2,5);
myGraph.addBidirectionalEdge(4,5);
myGraph.addBidirectionalEdge(0,6);
myGraph.addBidirectionalEdge(2,7);
myGraph.addBidirectionalEdge(4,7);






//console.log(myGraph.adjMatrix);

//console.log(myGraph.getConnectedComponent(1));
//console.log(myGraph.getAllConnectedComponents());
console.log(myGraph.dfsListAllPaths(1));