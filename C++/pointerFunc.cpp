#include <iostream>
#include <utility>
#include <functional>



bool ascending(int x, int y){
    return x > y;
}

bool descending(int x, int y){
    return x < y;
}

void selectionSort(int *array, int size, std::function<bool(int, int)> comp = descending){

    for(int startIndex{0}; startIndex < (size - 1); ++startIndex){

        int smallestIndex{startIndex};

        for(int currentIndex{startIndex+1}; currentIndex < size; ++currentIndex){

            if(comp(array[smallestIndex], array[currentIndex])){

                smallestIndex = currentIndex;

            }

        }

        std::swap(array[startIndex], array[smallestIndex]);


    }
}

int main(){

    int array[5]{4, 2, 1, 5, 3}; 

    selectionSort(array, 5);

    for(int index{0}; index < 5; ++index){
        std::cout << array[index] << '\n';
    }




}
