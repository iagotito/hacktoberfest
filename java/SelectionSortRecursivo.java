import java.util.Arrays;
import java.util.Scanner;

class SelectionSortRecursivo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        String[] in = sc.nextLine().split(" ");
        Integer[] numbersParsed = new Integer[in.length];

        for (int i = 0; i < in.length; i++){
            numbersParsed[i] = Integer.valueOf(in[i]);
        }

        recursiveSelectionSort(numbersParsed, 0, numbersParsed.length-1);

        sc.close();
        
    }

    private static void recursiveSelectionSort(Integer[] numbersParsed, int leftIndex, int rightIndex) {

        if(leftIndex<rightIndex){
            int lowestIndex = leftIndex;

            for(int i=leftIndex+1; i<=rightIndex; i++){
                if(numbersParsed[i] < numbersParsed[lowestIndex]) {
                    lowestIndex = i;
                }
            }
    
            swap(numbersParsed, lowestIndex, leftIndex);
            System.out.println(Arrays.toString(numbersParsed));
            recursiveSelectionSort(numbersParsed, leftIndex+1, rightIndex);
        }
    }

    private static void swap(Object[] array, int i, int j) {
		Object temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
