# Pay Attention Before Writing the Docs
* Each folder should includes an index.md.
* Do not use uppercase for file names, and connect words with a hyphen('-').

# Add Docs Steps
1. Put the file or folder into apps/homepage/public/docs.
2. Add the file structure in apps/homepage/public/docs/fileStructure.json.
3. Following the format below
```
{
    name: String // name can include uppercase letters and spaces which will be shown on the page
    path: String // same with file name
    children: [] // folder has children
}
```


