

class TrieNode {
    constructor(){
        this.keyMap = {};
        this.end = false;
    }

    setEnd(){
        this.end = true;
    }

    isEnd(){
        return this.end;
    }
}


class Trie{
    constructor(){
        this.root = new TrieNode();
    }

    addItem(item, node = this.root){
        if(item.length == 0){
            node.setEnd();
            return;
        }

        if(item[0] in node.keyMap){
            //Search Next Node & Search Recursively
            return this.addItem(item.slice(1),node.keyMap[item[0]]);
        }else{
            //Add To New Trie Node & Search Recursively
            node.keyMap[item[0]] = new TrieNode();
            return this.addItem(item.slice(1),node.keyMap[item[0]]);
        }
    }


    isValidWord(word, node = this.root){

        //Base Cases
        if(word.length == 0 && node.isEnd() == false){
            return false;
        }

        if(word.length == 0 && node.isEnd() == true){
            return true;
        }


        //Work & Recursive Call

        if(word[0] in node.keyMap){
            //Recursive Call
            return this.isValidWord(word.slice(1), node.keyMap[word[0]]);
        }else{
            //Return False
            return false;
        }

    }


    getArrayofAllWords(node = this.root){
        let wordArray = [];

        function searchTrie (st, node){
            //Base Cases
            if(node.keyMap.length == 0){
                if(st.length > 0){
                    wordArray.push(st);
                    return;
                }else{
                    wordArray.push(undefined);
                    return;
                }
            }

            if(node.isEnd()){
                wordArray.push(st);
            }


            //Work & Recursive Calls
            let keys = Object.keys(node.keyMap);
            for(let key of keys){
                searchTrie(st + key, node.keyMap[key]);
            }

            return;
        }
        searchTrie('', node);
        return wordArray;

    }


    getAutofillResults(st, node = this.root){
        //Base Cases
        if(st.length == 0){
            let autofillWords = this.getArrayofAllWords(node);
            return autofillWords;

        }

        //Recursive Call
        let resultWords = [];

        if(st[0] in node.keyMap){
            let recursiveResults = this.getAutofillResults(st.slice(1), node.keyMap[st[0]]);
            recursiveResults = recursiveResults.map(item => st[0] + item);
            resultWords.push(...recursiveResults);
        }else{
            //AutoCorrect Values
            let autoCorrectResults = this.getArrayofAllWords(node);
            resultWords.push(...autoCorrectResults);
        }

        //Return
        return resultWords;
    }



}






//Main Driver Test Code
let myTrie = new Trie();

let wordBank = ["test", "apple", "at", "atlas", "attic"];
let excludedWordBank = ["tests", "app", "boo"];

for(word of wordBank){
    myTrie.addItem(word);
}

//Check If Valid Word
for(word of wordBank){
    if(myTrie.isValidWord(word))
        console.log("Passed - Found: " + word);
}

for(word of excludedWordBank){
    if(!myTrie.isValidWord(word))
        console.log("Passed - Not Found: " + word);
}


console.log(myTrie.getArrayofAllWords());
console.log(myTrie.getAutofillResults("a"));
console.log(myTrie.getAutofillResults("atx"));

