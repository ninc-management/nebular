## Creating modified version

1. Update to the newer upstream version `git rebase nebular/master`
2. Add the new modification
3. Compile packages with `npm run release:prepare`
4. Get the compiled theme folder in `src/.lib/theme`
5. Copy the folder to tag repository and publish the tag with `git tag themex.x.x && git push origin themex.x.x`
