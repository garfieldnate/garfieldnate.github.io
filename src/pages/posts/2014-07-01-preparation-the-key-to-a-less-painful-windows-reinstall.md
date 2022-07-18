---
categories:
- Windows
- Windows restore
- reinstall
- batch
- devops
- Chocolatey
comments: true
date: 2014-07-01T21:00:38Z
title: 'Preparation: The Key to a Less Painful Windows Reinstall'
---

Recently I decided to work on an [easy ticket](https://github.com/stepmania/stepmania/issues/196) in StepMania to get into the source code. It turned out that I (gasp!) actually needed to build the project on my computer, but of course I was missing required libraries: DirectX 9 and the DirectX SDK. No matter what I tried, neither of these would successfully install on my computer, and I decided that the only way to install it would be to reinstall Windows (which worked, but ugh!). Usually reinstalling Windows is a terrible process that can take days and leave you lost on your own computer, which is now missing all of your favorite programs and customizations. This time, I thought, I should make it as painless as possible.

I should note that many Windows users can just pop in the restore disk they got from their computer manufacturer and be happy with the results. Users like myself, however, hate the extra programs and files that come from the manufacturer, opting instead for a vanilla install disk. If you're like me, then you've also built up a library of programs and configurations over time, and reinstalling Windows threatens to destroy your precious setup.

The key to a less painfull reinstall is preparation. The following will make your life a lot easier:

## Use the Cloud

"The cloud", of course, meaning some service that will store your files for you. I prefer not to have the entirety of my hard drive synched with an online service, so I cannot make recommendations there. But the most important files, my current coding projects, are all on GitHub, so I don't have to worry about losing them. When I do manual backups, I don't have to bother with local copies of GitHub projects. Some of my application settings are synched through DropBox, as well (see this tutorial to do it for Sublime Text), as well as many documents I feel are too important to have just one copy of.

## Organize Your Files

If you're like me, you might try to stay organized but fail to do so completely. Reinstall time is a good opportunity to clean up unneeded files and to gather what's left into centralized directories. I keep archived work (school, projects, research, work) in a single place. This turned out to be a good opportunity to decide that several projects were done and should be archived. Make your files as clean as possible before reinstalling so that backup is as simple as possible.

## Backup on a Hard Drive Partition

Reinstalling Windows only wipes out the C: drive, so if you have another partition (D: on my computer) this will be saved during reinstall. This is useful for backing up large amounts of data. It is much faster to move files between partitions than it is to move them between completely different drives. I recommend you make a large partition for keeping permanent files (archived work, pictures, videos) that you need ready access to but don't necessarily make constant use of. Ones you don't need ready access to can be stored on external drives and put away somewhere safe.

Files that you do need constant access to are usually in My Documents, on the Desktop, or elswhere in the C: drive. Back up these files in your other partition and they will be easy to replace after the the reinstall.

## Download Drivers Before Reinstalling

It is always so nice when your computer restarts with a brand new copy of Windows. Like a newborn, so clean and shiny and unsoiled by the world. But then, you realize that it is as also as helpless as a baby. The screen resolution is off, the sound doesn't work, the touchpad is jumpy, etc., etc. Navigating the internet without good drivers is a pain in the butt, so do yourself a favor and download and save all of the driver installers *before* you reinstall windows.

## Find Chocolatey Package for Your Favorite Programs

Usually after reinstalling Windows you end up reinstalling all of your programs as you need them for the next several weeks or months. This is time-consuming and distracting. Chocolatey, a package manager for Windows, can do the tedious part for you. After you install Chocolatey, find the names of the packages containing the programs you like on the [web site](http://chocolatey.org/). Then instead of downloading and running an installer, simply type `cinst packageName` into your cmd and let Chocolatey do the boring part!

For example, I know I will need Evernote again after the reinstall. Instead of installing it manually, I can type `cinst Evernote5` into my cmd and be done with it!

Before you delete your Windows partition, look at all of the programs you have installed and decide which ones you actually want to reinstall later. That's right, I know you have 5 bajillion programs that you never use. Don't worry, me too. Save the names of Chocolatey packages you want and the names of other programs that don't have an available Chocolatey package into a single file. This will easily save you hours of work later.

## Save Product Keys with ProduKey

ProduKey comes as a Chocolatey package. When run, it gives you the product keys used for both Windows and Microsoft Office. These can sometimes be hard to track down, and retrieving and saving them this way *before* reinstall will save time.

## Create an Executable Master Plan

As if each Chocolatey command didn't cut out enough work, why not put all of the chocolatey install commands into a batch script and have them all run while we go eat lunch or something? A simple batch script will work fine:

```console
cinst GoogleChrome
cinst Evernote5
cinst dropbox
cinst adobereader
```

To make this file really useful, however, you should comment it with your complete reinstall plan. `rem` is how you do comments in batch scripts:

```console
rem Windows post-installation setup
rem You must download and install Chocolatey before running this: chocolatey.com
rem Before reinstalling:
rem   1. backup xyz directory
rem   2. download and save drivers in external hard drive
rem   3. save registration keys using ProduKey

rem Fun Stuff
cinst GoogleChrome
cinst Evernote5
cinst dropbox

rem General Development
cinst kdiff3
cinst git
cinst git-credential-winstore
cinst sublimetext2

rem Java Development
cinst jdk8
cinst eclipse-standard-kepler
cinst ant
cinst maven
cinst gradle

rem Configure Git
git config --global user.name "Nathan Glenn"
git config --global user.email "garfieldnate@gmail.com"

echo "Now install KeyTweak by hand"
```

In the comments or echos you can record all of the programs that need to be installed manually, all of the settings you should copy or set manually, all of the files that you need to restore, etc. Usually trying to remember what your computer needs can take a lot of time and some stress ("I swear I'm forgetting something!"), so saving a master plan is really a must.

You can view or fork mine on [GitHub](https://github.com/garfieldnate/windows_home_setup).

## Conclusion

This time around I had the least painful Windows reinstall ever. It still took some time, but I was able to cut out the guesswork and most of the manual installing. Taking a page out of the dev-ops book, an executable master plan really simplified the whole process. If you have lots of computers that need to be configured quickly and automatically, then take a look at BoxStarter.
