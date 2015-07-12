#include <string>
#include <time.h>
#include <stdlib.h>
#include <vector>

#define TRAILS true

//Hash a string, returns int* terminated by a 0.
//Heap memory, so delete when finished
int* HashString(std::string str);

//Calculates how much random chars should be appended
//to string to obscure string length
int TrailingChars(int* shifts);

//Shifts a given string forward using previously
//calculated hash for HashString
std::string ShiftForward(std::string str, int* shifts);

//Shifts a given string backward using previously
//calculated hash from HashString
std::string ShiftBack(std::string str, int* shifts);

extern "C" const char* strEncrypt(char* cPlaintext, char* cKeyword)
{
    std::string plaintext= cPlaintext;
    std::string keyword= cKeyword;
    bool trailingChars = TRAILS;

    if (plaintext.empty() ||
            keyword.empty())
        return std::string(plaintext + keyword).c_str();

    int* keywordShift = HashString(keyword);
    int* tempShift;
    std::vector<std::string> strblocks;
    std::string temp;

    //Break up plaintext into blocks of chars the size of the keyword
    //and copy into vector
    for (int i = 0; i < plaintext.size();) {
        temp.clear();

        for (; (i < plaintext.size()) && (temp.size() < keyword.size()); i++)
            temp += plaintext[i];

        strblocks.push_back(temp);
    }

    //First shift plaintext forward with dynamic shift,
    //add that to cipherText vector, then shift it again
    //with keyword and use that as the keyword for the next string block
    std::string currKeyword = keyword;
    std::vector<std::string> ciphertext;
    ciphertext.reserve(strblocks.size());
    for (int i = 0; i < strblocks.size(); i++) {
        //Get next ciphertext block with dynamic keyword
        tempShift = HashString(currKeyword);
        temp = ShiftForward(strblocks[i], tempShift);
        delete tempShift;

        //Get next keyword
        ciphertext.push_back(temp);
        currKeyword = ShiftForward(temp, keywordShift);
    }

    temp.clear();
    for (int i = 0; i < ciphertext.size(); i++)
        temp += ciphertext[i];

    //Add a calculated amount (calculated using the keyword)
    //of random chars to the cipherText to obscure text
    //length
    if (trailingChars) {
        int trailChars = TrailingChars(keywordShift);
        srand(clock());
        for (int i = 0; i < trailChars; i++)
            temp += char(rand() % 95 + 32);
    }

    delete keywordShift;
    return temp.c_str();
}

extern "C" const char* strDecrypt(char* cCiphertext, char* cKeyword)
{
    std::string ciphertext = cCiphertext;
    std::string keyword = cKeyword;
    bool trailingChars = TRAILS;

    if (ciphertext.empty() ||
            keyword.empty())
        return std::string().c_str();

    int* keywordShift = HashString(keyword);
    int trailChars = TrailingChars(keywordShift);

    if (trailingChars) {
        for (int i = 0; i < trailChars; i ++) {
            if (ciphertext.empty())
                return std::string().c_str();

            ciphertext.pop_back();
        }
    }

    //Break up the ciphertext into blocks the
    //size of the keyword
    std::vector<std::string> strblocks;
    std::string temp;
    for (int i = 0; i < ciphertext.size();) {
        temp.clear();

        for (; (i < ciphertext.size()) && (temp.size() < keyword.size()); i++)
            temp += ciphertext[i];

        strblocks.push_back(temp);
    }

    //Shift the strblock back once with the dynamic shifts
    //and add it to plaintext vector. Also shift strblock
    //forward to obtain next dynamixc shift
    std::string currKeyword = keyword;
    std::vector<std::string> plaintext;
    plaintext.reserve(strblocks.size());
    int* tempShift;

    for (int i = 0; i < strblocks.size(); i++) {
        //Get plaintext with dynamic keyword
        tempShift = HashString(currKeyword);
        temp = ShiftBack(strblocks[i], tempShift);
        delete tempShift;
        plaintext.push_back(temp);

        //Get next keyword
        currKeyword = ShiftForward(strblocks[i], keywordShift);
    }

    temp.clear();

    for (int i = 0; i < plaintext.size(); i++)
        temp += plaintext[i];

    return temp.c_str();
}

int* HashString(std::string str)
{
    int* shifts = new int[str.size() + 1];
    shifts[str.size()] = 0;

    //Calculates an integer, "total" by using the
    //ASCII value of the char if the char's position
    //is an even number, or the ASCII value * 2 if
    //it is an uneven value
    int total = 0;
    for (int i = 0; i < str.size(); i++) {
        if (i % 2 == 0)
            total += int(str[i]);
        else
            total += int(str[i]) * 2;
    }

    //Calculate the shift for each value
    //using (total / ASCII value) + remainder as
    //formula
    for (int i = 0; i < str.size(); i++)
        shifts[i] = (total / int(str[i])) + (total % int(str[i]));

    return shifts;
}

int TrailingChars(int* shifts)
{
    int total = 0;
    for (int i = 0; shifts[i] != 0; i++)
        total += shifts[i];

    return total % 25;
}

std::string ShiftForward(std::string str, int* shifts)
{
    int ascii;
    std::string temp;

    for (int i = 0; i < str.size(); i++) {
        //Increase ascii value with shift
        ascii = int(str[i]) + shifts[i];

        //Reduce ascci value until it is in the standard
        //ASCII table
        while (ascii > 126)
            ascii -= 95;

        temp += char(ascii);
    }

    return temp;
}

std::string ShiftBack(std::string str, int* shifts)
{
    int ascii;
    std::string temp;

    for (int i = 0; i < str.size(); i++) {
        //Decrease ascii with shift
        ascii = int(str[i]) - shifts[i];

        //Increase asscii until it is in
        //the standard ASCII table
        while (ascii < 32)
            ascii += 95;

        temp += char(ascii);
    }

    return temp;
}