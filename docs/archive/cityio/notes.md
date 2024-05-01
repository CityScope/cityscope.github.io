---
id: Internal_Note
---

this section is for internal maintenance only.

cityio is using tmux's shared session for all the server admins to observe, stop, and restart the cityio instance.
The location of this session file is `/tmp/Shared`, so to attach the tmux session:

```
tmux attach -S /tmp/Shared
```

To run the process, it should follow instructions written in the doc's Build.md.
