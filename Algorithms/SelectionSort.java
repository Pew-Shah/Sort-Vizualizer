package Algorithms;
import java.util.Arrays;
import java.util.Scanner;

public class SelectionSort {
    static void selectionSort(int array[]){
        int size= array.length;

        for(int i=0; i< size-1; i++){

            int min = i;
            for(int j=i+1; j<size; j++){

                if(array[j] < array[min]){
                    min = j;
                }
            }

            int temp = array[i];
            array[i] = array[min];
            array[min] = temp;
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

        selectionSort(array);

        long endTime = System.nanoTime();

        long duration = (endTime - startTime);

        System.out.println("Sorted array: " + Arrays.toString(array));
        System.out.println("Time taken for sorting: " + duration + " milliseconds");

        sc.close();
    }
}
