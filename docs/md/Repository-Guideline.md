# CityScope Repository Guideline

The intention of this guideline is to make a minimal convention for handling git repositories for this city scope organization. Historically, the group's majority of the people have an architecture background which are self taught 'rogue' programmers. Version control has not been our tradition.

---
## 1. Familiar yourself with Git and GitHub
  - [GitHub Guides](https://guides.github.com/)
  - [git - the simple guide](http://rogerdudler.github.io/git-guide/) as well as the handy [cheat sheet](http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf)
  - [Learn Version Control with Git
](https://www.git-tower.com/learn/git/ebook)
  - If you are new to git, commit and push as much as possible.

## 2. Account Access Rights
  - Every current postdoctoral associate, student (master and phd), and research scientists (specialists) should have rights to create and contribute to any repository upon their request.
  - Researchers will have the right to delete repositories
  - When leaving the City Science research group, one should explicitly consult with at least one researcher if he/she wants to maintain the rights, in that case be sure to clarify the expiry date.
  - Abuse of this github organization or repositories will potentially loose rights

## 3. Binary data and Large Files
  - There is little chance that you want to version control binary data, these include compiled code, images, audio and video. Think twice whether you really need to add it, that file will be eternally (unless you delete the repository, or capable of [rewriting history](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)) saved to the history. You might consider putting them to other cloud data storage services like Dropbox.
  - The same applies to Large data files like database dumps and log files.
  - If you have compiled code, you should ```git tag``` and [mark it as a release](https://help.github.com/articles/creating-releases/). By this you will be able to upload and attach that executable as an archive. Attach other binary data to the release. This is a good way to crystalise the project.
  - One exception may be Grasshopper gh definition files, but again be considerate and make it light as possible.
  - The above points should stop you from adding most binary data, but if still need to add for some reason, ensure that its compressed to a moderate size. See [here](https://www.r-bloggers.com/data-on-github-the-easy-way-to-make-your-data-available/) for more details about storing data on gitub

## 4. External Libraries
  - **Avoid putting External Libraries into the repository**, no need to version control. It might be seen as stealing code, and/or may be considered as an act of obscuring the amount of contribution.   
    - Confirm that the code is okay to disclose if you plan to go open source.
    - See if there is a dependency management / packaging system. Thats way easier to maintain.
    - If the library has its own repository, you can use ```submodules``` to point to that. You will want to explicitly say to your cloners you need to ```git clone --recursive``` to get it working out of the box. This is good because if you want to modify that library, you can fork and still register it as a sub-module.
    - If it doesn't have its own repo, point to an URL or an archive file using the Guideline 2-3 technique. Be careful for licenses.

## 5. Branching
 - It is likely that one program or script will be modified to fit to different projects / situations. Effectively use **[branching](https://en.wikipedia.org/wiki/Branching_%28version_control%29)**. Leave the ```master``` branch as generic as possible, and let the branch develop project specific modifications. If there is a feature to update the ```master``` branch, its time to have a meeting with the team.
 - If you want to experiment and other people is working on the ```master``` branch, create your own development branch and use it as a sandbox.

## 6. Other Tricks
  1. `git clone --recursive git@github.com:ChangingPlaces/repository_name` will clone the repository and any related sub module.
  - `git clone --depth=1 git@github.com:ChangingPlaces/repository_name` will take only the latest history of the repository. Maybe better when cloning to a demo table.
  - Consider using ```git rebase``` if you just want to overwrite the repository, it will leave a cleaner history. +It's often better when your the only one coding. but **"do not rebase commits that exist outside your repository."**
  - For GitHub beginners, it might be helpful to use [GitHub Desktop](https://desktop.github.com/) -- the GUI of GitHub -- which provide you the basic functionalities of GitHub, including clone, create branches, commit changes, etc. But to a certain point, you will want to use **Git Shell**, which provide you full, more advanced functions.
  - It's good practice to add a predefined ```.gitignore``` file before your fist commit to maintain the repo clean and tidy. There is a [long list](https://github.com/github/gitignore) which you can choose, [even for Processing](https://github.com/github/gitignore/blob/master/Processing.gitignore).
  - Revert a commit `git push -f origin HEAD^:master`
