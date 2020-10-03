import java.util.*;

public class BFS {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int[] sequencia = ConvertToInt(sc.nextLine().split(" "));
		//int element = sc.nextInt();
		//sc.nextLine();
		SearchBFS bst = new SearchBFS();
		for (int i : sequencia) {
			bst.add(i);
		}
		
		System.out.println(bst.search());
		sc.close();
	}
	
	// Método auxiliar para converter uma sequencia para inteiros.
	private static int[] ConvertToInt(String[] sequencia) {
		int[] sequenciaInt = new int[sequencia.length];
		
		for(int i=0; i<sequencia.length; i++) {
			sequenciaInt[i] = Integer.parseInt(sequencia[i]);
		}	
		return sequenciaInt;
	}
}

class SearchBFS{
	
	private NodeBST root; 
	
	public boolean isEmpty() {
		return this.root == null;
	}
	
	public void add(int element) {
		if(!isEmpty()) {
			this.root.add(element);
		} else {
			this.root = new NodeBST(element);
		}
	}
	
	public String search() {
		String out = "";
		if(!isEmpty()) {
			Deque<NodeBST> queue = new LinkedList<NodeBST>(); 
			queue.addLast(this.root);
			
			while(!isEmpty()) {
				NodeBST n = queue.removeFirst();
				out += n.getValue() + " ";
				
				if(this.root.getLeft() != null) {
					queue.addLast(n.getLeft());
				}
				if (n.getRight() != null) {
                    queue.addLast(n.getRight());
				}
			}
		}
		return out;
	}
}

