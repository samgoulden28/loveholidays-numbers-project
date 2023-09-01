# loveholidays-numbers-project

Hello and thanks for taking the time to review my submission for this project as step 2 of the interview process for the Lead Engineer role at loveholidays.

When completing challenges like these I like to begin by writing the Readme before writing any code so I can capture all of my thought process as I work on the project.

I've decided to work in Typescript today because its my favourite language! I am going to use yargs to make it into a command line application

I like using a TDD approach as I have been provided some inputs and outputs, so that is what I will do!

# Running the project

1. `npm run build`
2. `./bin/numbers-to-words 52101`
3. `npm run tests`

## Step 1 - Initialize Project

The first step is to initialize my project and get Jest running so I will do that.

I added typescript and `@types/node` as dev dependencies to the project then ran `npx tsc --init` to make the tsconfig.

Then I installed `yargs` and followed their documentation to get it working with Typescript.

I added a build script to the project to ensure that the command shown in the project description could be used. I also included chmod 755 as this is necessary to run it

The following is an example from the yargs website I used as a starting point.

```➜ loveholidays-numbers-project ./build/index.js -a false
Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -a                                                  [boolean] [default: false]
  -b                                                         [string] [required]
  -c, --chill                                                           [number]
  -d                                                                     [array]
  -e                                                                     [count]
  -f                                                    [choices: "1", "2", "3"]

Missing required argument: b
➜  loveholidays-numbers-project ./build/index.js -a false -b "sam"
{ _: [], a: false, b: 'sam', e: 0, '$0': 'build/index.js' }
```

Now thats done, I added an `main.test.ts` file and changes my test script in package.json to "jest"

And `npm t` works now!

## Step 2 - Begin coding

So I had a general idea of how I wanted to do this project and it starts with writing some test cases for the TDD approach.

The first thing I did was create some tests that use it.each() and a bunch of results to ensure that as I code I can see the result working.

So I did that first.

Next it came to writing the functionality and I had the idea of looping through from the largest quantifiable number (quadrillion, trillion, billion, million... etc) and then printing those in order.

So I created 3 objects that convert single numbers to words from 1-20, then the tens to words (10-90), then the large numbers (hundreds, thousands, millions etc.)

Then I started by laying out a plan in my code file to run through each starting at the biggest and to print the number of millions followed by the number of thousands, etc.

I realised quickly that I could understand how many of each there were by using Math.floor with a different divisible, so to understand how many millions are in the number 11,543,211 I can simply use `Math.floor(11543211, 1000000)`.

So I essentilly began looping through each large number type and understanding how many of each there were. The output here was like:

```
[
  [11, 'million'],
  [543, 'thousand'],
  [211, 'hundred'],
]
```

## Step 3 converting to words.

So after this I realised I wouldnt need to write the hundred part in the final part of the number and the next steps were just going to be converting each of the numbers for each large number (million, thousand) to words. So my desired output would be

```
[
  ['eleven', 'million'],
  ['five hundred and fourty-three', 'thousand'],
  ['two hundred and 11', ''],
]
```

So I began by writing some tests that expect this output then got to work on a funciton that could do that.
The logic for this function is tricky but uses a combination of Math.floor and some conditions to print the numbers.

## Step 4 - Finishing.

Everything was in place now so I just needed to put it all together and use a function to combine all the arrays into a sentence. This was my final TDD function and wrote this as a test before getting to work on the function.

I had a few bugs - getting the 'and' to sit in the correct place all the time was one of the most challenging parts!

FinallY i realised that the code didnt have the commas in it between the numbers that didnt have "and" at the start, so I added that part in the final constructing method.

## Conclusion

I am happy with my solution. The key realisation for me was being able to use math.floor to get the base of each big number in turn so I could print them one by one.

If I wanted to improve this solution I would work on making the word conversion for the hundreds a little better such that the 'and' wouldnt be so difficult to get in the right place.
