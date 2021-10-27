#include <iostream>
#include <fstream>
#include <string>

using namespace std;

string expander(string input, int depth = 1) {
  if (depth == 0) {
    return input;
  } else {
    int i = 0;
    while (i < input.length()) {
      if (input[i] == 'F') {
        input.insert((i+1), 1, '[');
        input.insert((i+2), 1, '+');
        input.insert((i+3), 1, 'F');
        input.insert((i+4), 1, ']');
        i += 5;
      } else {
        i++;
      }
    }
    depth--;
    return expander(input, depth);
  }
}

string grammar(string input, float len, float xrot, float yrot, float zrot) {
  /*

    Grammar rules:
    F - forward len
    f - forward len W/O drawing
    + (+) rot x-axis xrot deg
    - (-) rot x-axis xrot deg
    & (+) rot y-axis yrot deg
    ^ (-) rot y-axis yrot deg
    \ (+) rot z-axis zrot deg
    / (-) rot z-axis zrot deg
    | turn 180 deg
    [ push current state onto stack
    ] pop state on stack and make it the current state 

  */
}

int main() {
  string input;
  fstream myFile;
  myFile.open("file.in");
  if (!myFile) {
    cout << "File not found";
  }
  // Current file contents for testing F[+F]
  myFile >> input;
  myFile.close();
  string output = expander(input, 10);
  cout << output;
  myFile.open("file.out");
  myFile << output;
  myFile.close();
}