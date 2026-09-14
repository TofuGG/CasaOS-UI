[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=IceWhaleTech_CasaOS-UI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=IceWhaleTech_CasaOS-UI)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=IceWhaleTech_CasaOS-UI&metric=bugs)](https://sonarcloud.io/summary/new_code?id=IceWhaleTech_CasaOS-UI)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=IceWhaleTech_CasaOS-UI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=IceWhaleTech_CasaOS-UI)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=IceWhaleTech_CasaOS-UI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=IceWhaleTech_CasaOS-UI)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=IceWhaleTech_CasaOS-UI&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=IceWhaleTech_CasaOS-UI)

> ⚠️ **UNOFFICIAL FORK — NOT THE OFFICIAL RELEASE.** This is a **TofuGG** community
> fork of the CasaOS UI, not affiliated with or endorsed by the official
> CasaOS / IceWhaleTech team. It is provided **AS-IS** with **no warranty** and
> **no official support**. **USE AT YOUR OWN RISK.**

## TofuGG fork additions

- **Dark mode** — full dark theme (`html[data-theme="dark"]`) with its own
  palette, toggle in the top-bar settings, stored per-browser, applied before
  first paint (no white flash).
- **Time format setting** — 12 / 24-hour choice in the top-bar settings;
  live-updates the dashboard clock.
- **Dashboard refresh rate** — configurable hardware-statistics push interval
  (0.25 s – 5 s) in the widget settings.
- **Pixelated Elegance clock font** — retro pixel digits for the Clock widget
  and CPU/RAM percentages (CC0 font, shipped locally).
- **App store / hover visibility fixes** — readable text in dark mode across
  app cards, dropdowns, markdown detail pages and merge-storage panels.
- **Resilience fixes** — hang-safe app-store loading (empty grids, missing
  `installed` list), guarded Disks widget, SPA deep-link fallback on the
  gateway, no unhandled promise rejections from best-effort message-bus
  telemetry.
- **Real production builds** — `npm run build` now emits minified bundles
  (`.env.production` uses `NODE_ENV=production`; ~60 % smaller JS) and only
  `VUE_APP_*` environment variables are baked into the bundle.

# How to develop this project

## Prerequisites
1. Node 18 ([installation instructions](https://github.com/nvm-sh/nvm?tab=readme-ov-file#usage))
2. pnpm@9.0.6 ([installation instructions](https://pnpm.io/installation))

## Environment variables
If you want to connect dev UI version to your local CasaOS server, you will need to set up a couple of env variables:
1. Copy `.env.dev` to `.env.dev.local` (this file is git-ignored)
2. Set `VUE_APP_DEV_IP` to IP address of your local CasaOS server

## Set up dev server
```shell
# install dependencies
pnpm install

# build
pnpm dev 
```

# How to build this project

```shell
# install dependencies
pnpm install

# build
pnpm build
```

The production bundle is emitted to `build/sysroot/var/lib/casaos/www/`
(nginx/static-server root of a CasaOS install). Building with `npm run build`
is equivalent to `pnpm build`.

# How to test this project

```shell
pnpm test
```

# How to contribute to this project

CasaOS is a community-driven open source project and the people involved are CasaOS users. That means CasaOS will always
need contributions from community members just like you!

- See <https://wiki.casaos.io/en/contribute> for ways of contribution to CasaOS
- See <https://wiki.casaos.io/en/contribute/development> if you want to be involved in code contribution specificially


# How to contact this project

The word Casa comes from the Spanish word for "home". Project CasaOS originated as a pre-installed system for
crowdfunded product [ZimaBoard](https://www.zimaboard.com) on Kickstarter.

After looking at many systems and software on the market, the team found no server system designed for home scenarios,
sadly true.

So, we set out to build this open source project to develop CasaOS with our own hands, everyone in the community, and
you.

We believes that through community-driven collaborative innovation and open communication with global developers, we can
reshape the digital home experience like never before.

**A warm welcome for you to get help or share great ideas in the [Discord](https://discord.gg/knqAbbBbeX)!**

[![Discord Card](https://discordapp.com/api/guilds/884667213326463016/widget.png?style=banner2)](https://discord.gg/knqAbbBbeX)