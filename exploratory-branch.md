# Agentic Discipline One

## First example - Stack

1. You can use Claude without tests, but that's dangerous and it will bite you.
2. You can follow conventional TDD, but that burns tokens, burns cycles, and is not the best for an AI. This is more for humans.
3. The best seems to be `bundling`: write a few tests, then a little code, then a few more tests, then a little more code.

## How to talk to Claude in an Inteligent way

Here Bob is using a Skill called `test-driven development` and he mentioned it asked to follow TDD loosely.

Notice how easy it is to just converse with Claude.
Notice also how imprecise the directives where. Don't go to the limit of N, use a large prime, etc.

Question: Where do the precision come from?

## Legacy code

When dealing with issues of coverage / coupling, it is a good idea to refactor the tests first, before proceeding with the code.
I imagine this allows you have a proper safety net to ensure the refactor went well.

We changed our attitude.
Note how as the demo went on, the prompt became higher and higher level. Stopped worrying about the code, and more about design / structure / architecture.

# Agentic Discipline Two

IMPORTANT history lesson:

We programmers initially programmed by punching hole in paper tape.
We then invented assemblers.
Once we got good at assemblers, we stopped looking at the holes that we punched.

Then we invented compilers.
Once we got good at compilers, we stopped looking at the assembly code.
It took a little while, we didn't trust the compilers at first.

So now, in this day of AI and Agents, what's the source code?
What's what we are going to talk about today.

## Game of HTW

You can have a pretty detailed spec file of a thing. And is that the source code? No
The spec file has ambiguities

However, the scenarios, inefficient as they are, were the source code for the compiled program.
