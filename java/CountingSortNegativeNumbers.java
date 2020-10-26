import java.util.Arrays;
import java.util.Scanner;

class CountingSortNegativeNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] in1 = sc.nextLine().split(" ");
        Integer max = sc.nextInt();
        Integer min = sc.nextInt();

        Integer[] numbers = new Integer[in1.length];

        for (int i = 0; i < in1.length; i++){
            numbers[i] = Integer.valueOf(in1[i]);
        }

        System.out.println(Arrays.toString(countingSort(numbers, max, min)));
        sc.close();
    }

    private static Integer[] countingSort(Integer[] numbers, Integer max, Integer min) {
        Integer[] count = new Integer[max-min+1];
        populate(count, 0);

        Integer[] numbersSorted = new Integer[numbers.length];

        for(int i=0; i<numbers.length; i++){
            count[numbers[i] - min] += 1;
            System.out.println(Arrays.toString(count));
        }

        for(int i=1; i<count.length; i++){
            count[i] += count[i-1];
        } 

        System.out.println("Cumulativa do vetor de contagem - " + Arrays.toString(count));
        
        for(int i=numbers.length-1; i>=0; i--) {
            numbersSorted[count[numbers[i] - min] - 1] = numbers[i];
            count[numbers[i]-min] -= 1;
        }

        for(int i=0; i<numbers.length; i++) {
            numbers[i] = numbersSorted[i];
        }

        System.out.println(Arrays.toString(count));
        return numbers;
    }

    private static void populate(Integer[] count, int value) {
        for(int i=0; i<count.length; i++){
            count[i] = value;
        }
    }
}
