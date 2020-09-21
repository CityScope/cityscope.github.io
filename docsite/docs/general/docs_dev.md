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

In most cases, every model builder will develop their own independent documentation. We built a workflow using GitHub actions that will pull the relevant files from every downstream repository and add it to this documentation site. That way, the source of truth for every repository still lives in the repo where the code is. 

To add your repository to this documentation site, link the markdown files by editing `pull_docs.yml` file located at `.github/workflows/pull_docs.yml`. Use the following syntax to add a new block:

```
  - name: Update REPO_NAME
    run: bash .github/scripts/update.sh REPO_NAME_OWNER REPO_NAME DESTINATION_PATH PATH_TO_FILE
```

In the `yml` file you'll probably see other repositories linked. Make sure to match the indentation level of them and that `name` and `run` are at the same level. 

Note that `PATH_TO_FILE` can link as many files as needed, and the action will ensure they are all concatenated in a single `md` file and will add the necessary front-matter. The documentation will be generated at: `<DESTINATION_PATH>/<REPO_LABEL>/<REPO_LABEL>.md`. `REPO_LABEL` is inferred from your `REPO_NAME` by removing the prefix `CS_` if it exists (e.g. `CS_Brix` becomes `Brix` and `MyRepo` stays as `MyRepo`).

You can skip `PATH_TO_FILE` if your documentation is in the `README.md`. 

If you are linking a wiki page, make sure to set `REPO_NAME_OWNER=wiki/REPO_NAME_OWNER`. If this is the case, the default `PATH_TO_FILE` will be `Home.md`.

If your documentation is in the `README.md` and your library is part of `modules`, you can also skip `DESTINATION_PATH`. In the future, we might want to make the default `docsite/docs/one-off-projects`.

For example, a simple module called `CS_MyModule` part of the `CityScope` organization that has all its documentation in `README.md` should be added as:
```
  - name: Update CS_MyModule
    run: bash .github/scripts/update.sh CityScope CS_MyModule
```

To add the `Home` wiki page of a module called `CS_MyModule`, part of the `CityScope` organization, use the following block:
```
  - name: Update CS_MyModule
    run: bash .github/scripts/update.sh wiki/CityScope CS_MyModule
```
