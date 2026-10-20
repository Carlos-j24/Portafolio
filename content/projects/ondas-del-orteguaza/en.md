---
title: "Ondas del Orteguaza"
date: 2026-10-09
period: 2026
role: "I lead it end to end · live"
stack: [HTML5, CSS3, JavaScript, PWA, Service Worker, Media Session API, Netlify, Kotlin, Android]
repo: https://github.com/Carlos-j24/ondas-del-orteguaza
image: /projects/ondas-del-orteguaza.webp
readingTime: 4
summary: "Website and Android app for a Christian radio station in Florencia, Colombia: a live stream that reconnects on its own, weekly schedule, events and prayer requests."
---

## The problem

Ondas del Orteguaza is a Christian radio station in Florencia, Caquetá (Colombia) that streams online. Most listeners tune in **from their phones**, often on unreliable mobile data. The station needed a site where you just press play, see which show is on air, find out about upcoming events and send prayer requests. They also wanted an app on Google Play. I lead it end to end: from the proposal the station approved to the Google Play release.

## What it does

- **Live player** with an "On air now" indicator that shows the current show based on Colombia's time.
- Weekly **program schedule**, with today highlighted.
- **Upcoming events** with date, place and poster.
- **Verse of the day**, rotating through a list.
- **Prayer requests** with consent and a privacy policy.
- **Share on WhatsApp** and a link to the **Google Play app**.
- Installs as an app (PWA) and opens even without a connection.
- **Android app v1.0** published on Google Play, and a **native v2.0 in Kotlin** in progress.

## Architecture

```text
          content.json (schedule, events, verses, links)
             |                               |
+------------v---------------+  +------------v------------------+
| Web (PWA, a single HTML)   |  | Android app v2.0 (Kotlin)     |
| player + Media Session     |  | MediaPlayer in a foreground   |
| API                        |  | service, notification and     |
| custom service worker      |  | audio focus                   |
+------------+---------------+  +------------+------------------+
             |                               |
             +---------------+---------------+
                             v
                   Live stream (Zeno.fm)

GitHub (main) --push--> Netlify publishes the site automatically
```

## Decisions that matter

### One content file for the website and the app

The schedule, events, verses and links live in `content.json`. The website reads it, and the **native v2.0 app, in progress, downloads it from the website**. To announce an event, you change a single file and it shows up in both places, without releasing a new app version. That's also why some fields can't be removed: the app requires them.

### The stream reconnects on its own

On mobile data, audio drops. The player reconnects **just the stream**, without reloading the page: 4 retries (after 2, 4, 8 and 16 seconds), detection of a stalled connection after 15 seconds, and playback resumes when the internet comes back. If a phone call or the system controls pause the audio, the interface stops showing "playing".

### No build step, no framework

The website is HTML, CSS and JavaScript with no dependencies. Netlify publishes the repository root as is on every push to `main`. The service worker uses different strategies depending on the content: pages and `content.json` go to the network first (with a 4-second limit), images use the cached copy and refresh it in the background, and **live audio is never cached**.

### Built for each device

The "on air" show and "Today" use **Bogotá time**, not the phone's. On iOS the volume control is hidden, because Safari doesn't allow changing it from the web. Inside the Android app the prayer form is hidden, as its privacy policy states.

## Screenshots

![Weekly program schedule with today highlighted](/gallery/ondas-del-orteguaza/parrilla.webp)

*Weekly schedule. It's provisional and will be replaced with the real programming.*

![Three phone screens: home, schedule and events](/gallery/ondas-del-orteguaza/movil.webp)

*On the phone, where most listeners tune in.*

![Upcoming events with a poster and the prayer request form](/gallery/ondas-del-orteguaza/actividades-oracion.webp)

*Events with their poster, and prayer requests with consent.*

## What I take away

1. **Design for the user's real network.** Automatic reconnection matters more than any animation when people listen on mobile data.
2. **Keep content separate from code.** With `content.json`, the station updates the website and the app without touching code or releasing new versions.
3. **Simple things get versioned too.** Even for a single HTML file, every change goes through a branch, a pull request and automatic deployment from `main`.
