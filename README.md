# What is this?

This is an interview project that I did in 2025. I was asked to bring a working React + Rails stack to the interview so I forked a public template with the least boilerplate that I could find.

From there, I worked on site for one day and presented my project. It's a little ugly, but I was pretty happy to have this much done over the course of a day.

## Prompt

Create an RSS feed viewer.

## Features

- [x] Page with accordions to display RSS feed items
- [x] Embedded images
- [x] Embedded audio
- [x] Search function by title
- [x] Ability to add new feeds via url
- [x] Rake task to reload saved feed content from source feeds
- [x] Backend models for `Feeds` and `FeedItems`
- [x] All styling with custom CSS
- [x] Mark as Viewed button to clear seen content
- [x] Error handling (general + duplicate RSS errors)

## AI usage

I used Copilot in VSCode for some code completion, but nothing too significant. I paired with the engineers I was interviewing with, and proofread all AI code.

## To Run

- `bundle && bin/rake db:setup && cd client && npm install`

- In one console: `rails s`
- In another: `npm start`
- Navigate to `localhost:3000`
