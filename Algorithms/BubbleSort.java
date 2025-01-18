package Algorithms;
import java.util.Arrays;
import java.util.Scanner;

public class BubbleSort {
    static void bubbleSort(int array[]){
        int size= array.length;

        for(int i=0; i<size-1; i++){
            for(int j=0; j<size-i-1; j++){
                if (array[j]>array[j+1]){
                    int temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
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

        bubbleSort(array);

        long endTime = System.nanoTime();

        long duration = (endTime - startTime);

        System.out.println("Sorted array: " + Arrays.toString(array));
        System.out.println("Time taken for sorting: " + duration + " milliseconds");

        sc.close();
    }
}
