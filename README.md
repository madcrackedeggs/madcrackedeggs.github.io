# Poyo's awesome guide for Madeline's awesome website

Hi there! If you're reading this, it means that the website is complete. (yey!)
But before you can see it live in action, you will need to deploy it to GitHub Pages.

To do so, you will need two things;
- A domain (you're already here)
- A GitHub.com account

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies, super needed at the beggining of each development environment setup.                          |
| `npm run dev`             | Starts local dev server at `localhost:4321`, useful for previewing live changes.      |
| `npm run build`           | Build your production site to `./dist/`, in a single (or more) static html files.          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## How to deploy to GitHub Pages

### 1. Create a GitHub Account
1. Go to https://github.com and click **Sign up**.
2. Enter your email, username, and password.
3. Verify your email address by clicking the link in the confirmation email.
4. Complete any profile setup prompts (you can skip or fill them in).

### 2. Create a Repository for GitHub Pages
1. On GitHub, click **+** (top right) → **New repository**.
2. Set **Repository name** to `<your-username>.github.io` (this will become your site URL, but don't worry, you can change it later).
3. Choose **Public**, then click **Create repository**.

### 3. Upload Your Site to GitHub
Go to your project's url from the GitHub website, and follow these steps:
1. Click **Add file** → **Upload files**.
2. Drag and drop these files from the root, **ALL** of them.
3. Now, go to **Settings** → **Pages**.
4. Under **Builds and deployments**, select **GitHub Actions**.
5. Click **Save** to enable GitHub Actions for your repo.
6. If you can, select Astro as the GitHub Action, and leave everything AS IS.

### 5. Access Your Deployed Site
Visit:
```
https://<your-username>.github.io/
```

### 6. Adding journal entries
To add journal entries, you can create a new markdown file in the `src/pages/content/posts/` directory. Doesn't matter the name, but it should end with `.md`. For example, `my-first-post.md`. The file should start with a frontmatter block like this:

```markdown
---
title: 'My First Blog Post'
pubDate: 2025-07-06
description: 'Description'
author: 'Madeleine M.'
---

REMEMBER TO PUT 
```markdown
---
title: 'My First Blog Post'
pubDate: 2025-07-06
description: 'Description'
author: 'Madeleine M.'
---
```
at the top of your markdown file, this is called frontmatter and is used by Astro to generate the page correctly.

After you create your markdown file, you can run the following command to build your site:

```bash
git add .
git commit -m "Add post"
git push
``` 

The GitHub Action will automatically build your site and deploy it to GitHub Pages.

### 7. Adding gallery images
To add images to your gallery/vynil bookshelf/blog, you can place them in the `public/` directory, or upload the files to https://catbox.moe/. You can then reference these images in your markdown files using a similar syntax: (remember, you will need a markdown file per each image)

```markdown
---
title: "My cat :333"
image: "/catto.jpg"
thumbnail: "/catto.jpg"
description: "mrrrreow :3"
layout: ../../layouts/Layout.astro
---

# Catto!!!1!

![Catto](/catto.jpg)

I took this photo of my catto, isn't he cute? :3
```

### 8. Adding poetry
To add poetry, you can create a new markdown file in the `src/pages/content/poetry/` directory. Doesn't matter the name, but it should end with `.md`. For example, `my-first-poem.md`. The file should start with a frontmatter block like this:

```markdown
---
title: "My First Poem"
author: "Madeleine M."
---
```

### 9. Adding new albums
To add a new album, you'll need to edit the `src/pages/music.astro` file.
You'll need to add a new object to the `vinyls` array. The object should have the following properties:

- `title`: The title of the album.
- `image`: The image of the album.
- `redirects`: A list of links to the album on spotify/youtube/bandcamp.

After doing that, you'll need to run the following command to build your site:

```bash
git add .
git commit -m "Add album"
git push
```

### 10. Linking the domain to GitHub Pages
To do so, you'll need to go to your domain registrar and point your domain to GitHub Pages' IP, which are `185.199.108.153` and `185.199.109.153`. 

Create an A record for `@` and `www` pointing to `185.199.108.153` and `185.199.109.153`.

After doing that, go to **Settings** → **Pages** and link your domain.

### 11. Changing the about page
To change the about page, you'll need to edit the `src/pages/about.astro` file. It's quite simple, but hit me up if you need help.

---

That's it! You have successfully deployed your website to GitHub Pages. You should see your built website live on GitHub Pages!

That's all, if I explained something wrong or you need help, DM me via Fiverr!