public class Queue {

	private int[] array;
	private int tail;
	
	public Queue(int size) {
		array = new int[size];
		tail = -1;
	}
	
	public void enqueue(int element) {
		if (isFull()) throw new Exception("full queue");
		
		tail++;
		array[tail] = element;
	}
	
	public int dequeue() {
		if (isEmpty()) throw new Exception("empty queue");
		
		int elem = array[0];
		shiftLeft();
		tail--;
		
		return elem;
	}
	
	public int head() {
		int elem = -1;
		
		if (!isEmpty())
			elem = array[0];
			
		return elem;
	}
	
	public boolean isEmpty() {
		return tail == -1;
	}
	
	public boolean isFull() {
		return tail == (array.length - 1);
	}
	
	private void shiftLeft() {
		for (int i = 0; i < tail; i++) {
			array[i] = array[i+1];
		}
	}
}
