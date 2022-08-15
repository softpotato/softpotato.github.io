t0~
# Creating Your Own GitHub Blog

Completion: 0%

_Created: 8/14/2022_

_Updated: 8/15/2022_

This is a comprehensive guide to creating your own GitHub blog.
This guide is aimed at beginners learning React for their first time. 
Some topics we cover in this tutorial is as follows.
- JavaScript
- React
- Function Components
- Hooks
- Material UI library
- gh-pages library
- Static page loading
- Markdown
- react-markdown library + extensions
- Grids (Flexbox Wrappers)

Additionally, I'll be avoiding the use of images due to github's repo size.
I don't want to overfill my page with just this tutorial.

## Installation and Setup of Page

This section covers basic installation and setup for a basic React application.

### Step 1: Install Node Package Manager

Also called **NPM** for short.
I'm not too sure what NPM is exactly, but it's like both the environment to run your code, library manager, and compiler. I guess it's like Java's JDK but if it also had a built in library manager that automatically imported external libraries and checked their dependencies. 

It's useful, but it's downside is that there are thousands of dead projects that are useless.

After installation, you can check if you've installed it successfully by opening powershell or your command terminal and running the following command.

```powershell
npm -v
```

This checks if your environment path is set up properly and you can call node from your terminal without specifying the full path. This also checks if you have the correct version installed.

My current installation is **8.11.0**. Generally though, I wouldn't worry too much if your node version is different from mine. What you want to worry more is if the packages are still compatible with one another.



### Step 2: Create the Template Page

Open powershell/cmd and run the following command in your target directory.

```powershell
npx create-react-app <app name>
```

replace ```<app name>``` with a valid no space folder name. Then enter the folder through the terminal once intallation is completed.

```powershell
cd ./<app name>
```

You want the terminal to be inside the same folder as the ```package.json``` to run.

Then run the command ```npm start``` to start the webpage locally at the url ```localhost:3000```. 

Congratulations! You created a simple webpage! NPM makes this easy, but pretty much everything after this gets very VERY annoyingly difficult.

### Step 3: (Optional) Visual Studio Code IDE Extensions

If you use Visual Studio Code, then I'd suggest using the following extensions.

- Bookmarks (very helpful for Redux/Flux code with very large individual files)
- ES7 + React/Redux/React-Native Snippets (idk, saw this in a YouTube tutorial)
- Git Graph (I just like to see commit graphs like this)
- HTML CSS Support (I forgot why I have this)
- LaTeX Workshop (all posts will be written in markdown)
- Simple React Snippets (This might be redundant)
- Markdown All in One (also possibly very redundant)
- Markdown + Math (I'm a mathematician and I just like writing LaTeX)

These are optional, but some recommendations from me.

### Step 4: Now Follow This Other Tutorial

[https://github.com/gitname/react-gh-pages](https://github.com/gitname/react-gh-pages)

This tutorial sets up your page to deploy to github. 
I didn't want to cover this, because I don't really understand it myself and the tutorial is straight-forward and simple enough. 

## Project Setup

This section covers setting up files and how we're going to organize this application.