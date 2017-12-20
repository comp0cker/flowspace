# flowspace
Initilaly inspired from [this stackoverflow article.](https://stackoverflow.com/questions/31592190/multiple-new-browser-windows-from-batch-file)

An inherit flaw of Google Chrome prevents creation of new windows via the command line in Windows. When the following code is run:

```start chrome --new-window --window-position=0,0 --window-size=640,512 www.google.com
start chrome --new-window --window-position=760,0 --window-size=640,512 www.google.com```

Two instances of Google Chrome are created in seperate Windows, but the `--window-position` and `--window-size` attributes are ocmpletely ignored. Until a workaround is implemented, I've decided to go the route of creating multiple users, so multiple completely seperate instances of Chrome are created. `start chrome` now turns into `start chrome --user-data-dir="C:\Users\username\AppData\Local\Google\Chrome\User Data\user1"`.

Hopefully I'll figure out a workaround soon.
