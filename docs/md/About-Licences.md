# guidelines for selecting an open source license
The following is not a official nor a fixed statement.
descend if the prior guideline doesn't apply.

## 1. stay to the existing upstream license.
  If you are forking/customizing something that is already licensed, respect the original developer and stay to that one.

  1. if the library you are using is under GPL, you should generally stick to it. weather static or dynamic linking
  2. [although there are ways to go around with it](https://www.softwarefreedom.org/resources/2007/gpl-non-gpl-collaboration.html) 
  3. [LGPL](https://stackoverflow.com/questions/10130143/gpl-lgpl-and-static-linking) means you don't need to if your using the library dynamically

## 2. Discuss
  EACH PROJECT/REPOSITORY should be considered separately. 

## 3. when possible use GPL v3.
  The code will not be something that everyone will develop, since it has a relatively narrow application domain, and don't want to add another reason to be hidden and utilized. 
  > To address the concern when going for profit in the future, I will share my standpoint that the city science projects and relations with cities are more like services, or consulting (Noyman, 2017) rather selling the direct code. Moreover, GPL seems better if we want to build a community starting small and later expand. (Bonsen, 2018)

## 4. if 3. does not apply use Apache 2.0
  Reason: It has extra protection than MIT (and more words) by Patents.

# About licenses and their concepts
In a nut shell, we have two diverging paths.

## copyleft (aggresivly opensource) : ex GPL
- sticky license
- cannot hide it, sell it.
- may bite you back when you want to go for profit

## permissive (open without ties): ex MIT, Apache 2.0
- broadly open.
- Apple, or potential collaboration cities, alumni may hide it, sell it, without permission
- OK if you do startup in the future
- "sit back, relax and see what happens" approach.