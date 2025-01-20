package Algorithms;
import java.util.Arrays;
import java.util.Scanner;

public class QuickSort {

    static int partition(int[] array, int low, int high){
        int pivot = array[high];
        int i = low-1;

        for(int j=low; j<=high; j++){
            if(array[j]<pivot){
                i++;
                swap(array, i, j);
            }
        }

        swap(array, i + 1, high);  
        return i + 1;
    }

    static void swap(int array[], int i, int j){
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    static void quickSort(int array[], int low, int high){
        if(low<high){

            int pi = partition(array, low, high);

            quickSort(array, low, pi-1);
            quickSort(array, pi+1, high);
        }
    }

    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the number of elements in the array: ");
        int n = sc.nextInt();

        int[] array = new int[n];

        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < n; i++) {
            array[i] = sc.nextInt();
        }

        System.out.println("Original array: " + Arrays.toString(array));

        long startTime = System.nanoTime();

        quickSort(array, 0, n-1);

        long endTime = System.nanoTime();

        long duration = (endTime - startTime);

        System.out.println("Sorted array: " + Arrays.toString(array));
        System.out.println("Time taken for sorting: " + duration + " milliseconds");

        sc.close();
    }
}
