import java.util.Arrays;

public class Merge {

    private static void mergeSort(int[] array, int inicio, int fim) {
        int meio = array.length / 2;
        mergeSort(array, inicio, meio);
        mergeSort(array, meio+1, fim);
        merge(array, 0, meio, fim);
        System.out.println(Arrays.toString(array));
    }

    private static void merge(int[] a, int ini, int meio, int fim) {
        
        int[] v = new int[a.length];
        int k = 0;
        int i = ini;
        int j = meio + 1;

        while(i <= meio && j <= fim){
            if(a[i] < a[j]){
                v[k] = a[i];
                i++;
                k++;
            } else {
                v[k] = a[j];
                j++;
                k++;
            }
        }
        
        while(i <= meio){
            v[k] = a[i];
            i++;
            k++;
        }
        
        while(j <= a.length-1){
            v[k] = a[j];
            j++;
            k++;
        }

        System.out.println(Arrays.toString(v));
    }
}
