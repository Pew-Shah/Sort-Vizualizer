package Algorithms;
import java.util.Arrays;
import java.util.Scanner;

public class HeapSort {
    
    static void heapify(int arr[], int n, int i){

        int largest = i;

        int l = 2 * i + 1;
        int r = 2 * i + 2;

        if(l <n && arr[l]> arr[largest]){
            largest = l;
        } 

        if(r <n && arr[r]> arr[largest]){
            largest = r;
        } 

        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;

            heapify(arr, n, largest);
        }
    }

    static void heapSort(int arr[]) {
        int n = arr.length;

        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        for (int i = n - 1; i > 0; i--) {

            int temp = arr[0]; 
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
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

        heapSort(array);

        long endTime = System.nanoTime();

        long duration = (endTime - startTime);

        System.out.println("Sorted array: " + Arrays.toString(array));
        System.out.println("Time taken for sorting: " + duration + " milliseconds");

        sc.close();
    }
}
