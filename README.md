# Coug Courses Frontend

Disclaimer: This isn't written to the standards of production software.

## Screenshots

![main page](./readme/main_page.png)
![subject page](./readme/subject_page.png)
![grade dist](./readme/course_page_grade_dist.png)
![instructor alloc](./readme/course_page_instructor_alloc.png)

## Formatting

Do `npx prettier . --write` or just add it to your git hooks:

```
echo -e '#!/bin/bash\nnpx prettier . --write' > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
```
