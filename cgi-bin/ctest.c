#include <stdio.h>
#include <stdlib.h>

static void writeHeaders();

int main(void)
{
    writeHeaders();
    printf("HIROB\n");

    return 0;
}

static void writeHeaders()
{
    printf("content-type: text/plain;charset=UTF-8\n\n");
}
