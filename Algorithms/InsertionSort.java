package Algorithms;
import java.util.Arrays;
import java.util.Scanner;

public class InsertionSort {
    static void insertionSort(int array[]){

        for(int i=1; i<array.length; i++){

            int cur = array[i];
            int j = i-1;
            while(j>=0 && cur < array[j]){
                array[j+1] = array[j];
                j--;
            }

            array[j+1] = cur;
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

        insertionSort(array);

        long endTime = System.nanoTime();

        long duration = (endTime - startTime);

        System.out.println("Sorted array: " + Arrays.toString(array));
        System.out.println("Time taken for sorting: " + duration + " milliseconds");

        sc.close();
    }
}
