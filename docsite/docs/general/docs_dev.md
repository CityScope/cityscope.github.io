---
id: Docs Development
---

### How to Contribute to the Development of this documentation site?

Development of documentation takes place in `dev` branch. The `master` branch holds the build version of this website.

Building from `dev` to `master` branches include the following steps:

-   complete your code edits, push or PR to `dev`
-   run `GIT_USER=__USER WITH PUSH PREV__ yarn deploy`

**We appreciate your feedback via issues/pull requests.**


### Auto pull documentation from other repositories

In most cases, every model builder will develop their own independent documentation. We built a workflow using GitHub actions that will pull the relevant files from every downstream repository and add it to this documentation site. That way, the source of truth for every repository still lives in the repo where the code is. To add your repository to this documentation site, first ensure all your documentation is compiled in the same markdown file. Then, link this markdown file by adding a block to the `yml` file located at `.github/workflows/pull_docs.yml`. Use the following syntax:

```
  - name: Update REPO_NAME
    run: bash .github/scripts/update.sh REPO_NAME_OWNER REPO_NAME PATH_TO_FILE DESTINATION_PATH
```

In the `yml` file you'll probably see other repositories linked. Make sure to match the indentation level of them and that `name` and `run` are at the same level.

You can commit `DESTINATION_PATH` and your documentation will end up as part of the modules. If your documentation is in the `README.md`, you can also commit `PATH_TO_FILE`.

For example, a simple repo called `CS_MyModule` part of the `CityScope` organization that has all its documentation in `README.md` should be added as:
```
  - name: Update CS_MyModule
    run: bash .github/scripts/update.sh CityScope CS_MyModule
```
