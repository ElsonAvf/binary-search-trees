# Binary Search Trees

Binary Search Tree (BST) é uma estrurura de dados não linear baseada em nodes. O primeiro node da árvore é chamada de root e a partir dele se percorre os outros ramos da árvore.

Cada node é construído dessa forma:

> {data, left -> leftNode, right -> rightNode}

**data**: o valor do node  
**left**: o ponteiro que liga o node com o node à esquerda  
**right**: o ponteiro que liga o node com o node à direita

A árvore é construída de forma que o node à esquerda deve ter um valor menor e o node à direita um valor maior que o valor do node pai

Um exemplo visual de uma BST seria o seguinte:

         4  
       /   \  
      2     6  
     / \   / \  
    1   3 5   7

Para criar uma BST basta importar a classe `Tree` do arquivo BinaryTree.js e a instanciar passando um array como parâmetro

    import {Tree} from './BinaryTree.js'
    
    const tree = new Tree([1, 2, 3])
    
## Inserir um elemento na árvore

Para inserir um novo item na BST é preciso começar pelo root e comparar o item que deseja adicionar com o valor de cada node até encontrar um espaço vazio para que esse novo valor possa ser adicionado

1 - comece pelo root
2 - compare o valor que deseja adicionar com o valor do node atual
3 - se o valor for maior que o valor do node, vá para direita se for menor vá para esquerda
4 - repita o passo 3 até que encontre um node que o ponteiro da esquerda ou direita seja `null`, ou seja, até encontrar um espaço para por o valor

### Insert(value)

Chame o método insert e passe o valor que deseja inserir

    tree.insert(5)

## Deletar um elemento da árvore

Para deletar um elemento da árvore é preciso primeiro encontrá-lo e então checar se ele é uma folha (não possui filhos), se possui um filho ou se possui dois filhos

**Caso seja uma leaf**: apenas mude a referência desse node no node pai para `null`  
Ex:  
> nodePai.left ou nodePai.right = null

**Caso o node tenha apenas um filho**: mude a referência desse node no node pai para o único filho desse node 
Ex:  
> nodePai.left ou nodePai.right = nodeAtual.left ou nodeAtual.right

**Caso o node tenha dois filhos**: procure no node.right o node mais a esquerda (aquele que possui node.left === null) confira se esse node é um leaf ou se possui um filho e siga um dos passos anteriores. Então substitua a referência do node que deseja remover no node pai para esse node mais a esquerda
Ex:  
> nodeMaisAEsquerda.left = nodeASerRemovido.left  
> nodeMaisAEsquerda.right = nodeASerRemovido.right  
> nodePai.left ou nodePai.right = nodeMaisAEsquerda  

Isso, obviamente, depois depois de checar se o node mais à esquerda possui ou não filho

### deleteNode(value)

Chame o método deleteNode e passe o valor que deseja deletar

    tree.deleteNode(6)
    
## Encontrar um elemento na árvore

Para encontrar um elemento na árvore apenas atravesse ela comparando os valores até chegar onde deseja

### find(value)

Chame o método find e passe o valor que deseja encontrar

    tree.find(3)
    
## levelOrder(callback)

Passe uma callback para esse método para