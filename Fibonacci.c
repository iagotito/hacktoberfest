#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

int main()      //Elabore um algoritmo que a partir de um dado n, seja capaz de obter o n − ´esimo
{               //termo da Seqüência de Fibonacci
                //a sequencia de fibonacci é dada pela soma dos dois termos anteriores
setlocale(LC_ALL,"portuguese");

unsigned int x, y, z, n, i;
char R;
                            //reinicialização do algoritmo
do
{
system("cls");
 printf("\n Elabore um algoritmo que a partir de um dado n, seja capaz de obter o n esimo\n termo da Sequencia de Fibonacci");
 printf("\n Insira um numero n: ");
 scanf("%u", &n);
                        //núcleo do algoritmo
if(n == 0) printf("\n\n ERRO!! Insira um numero positivo");
else
{
 x = 1;
 y = 0;
    switch(n)
    {
        case 1: printf("\n %cO termo na posicao 1 da sequencia de Fibonacci e: 1\n\n\n", 7);break;
        case 2: printf("\n %cO termo na posicao 2 da sequencia de Fibonacci e: 1\n\n\n", 7);break;
        default
        :                           //início default
            for(i = 1; i < n; i++)
            {
                z = x + y;
                if(i == n)break;
                y = x;
                x = z;
            }
            printf("\n %cO termo na posicao %u da sequencia de Fibonacci e: %u\n\n\n", 7, n, z);
        ;                          //fim default
    }                              //fim switch
 }
                                //fim do núcleo do algoritmo
 printf("\n\n Gostaria de rodar o programa de novo? [S/N]: ");
 fflush(stdin);
 scanf("%c", &R);
}while(R == 's' || R == 'S');
system("pause");
return 0;
}
