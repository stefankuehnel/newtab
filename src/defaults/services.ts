import type { Service, ServiceCategory, Services } from "@/types";

export const defaultService: Service = {
  bang: {
    long: "!google",
    short: "!g",
  },
  icon: "https://external-content.duckduckgo.com/ip3/google.com.ico",
  name: "Google",
  url: "https://www.google.com/search?q=",
};

export const defaultServices: Services = new Map<
  ServiceCategory,
  Array<Service>
>()
  .set("Education", [
    {
      bang: { long: "!wikipedia", short: "!w" },
      icon: "https://external-content.duckduckgo.com/ip3/en.wikipedia.org.ico",
      name: "Wikipedia",
      url: "https://en.wikipedia.org/w/index.php?search=",
    },
  ])
  .set("Entertainment", [
    {
      bang: { long: "!youtube", short: "!yt" },
      icon: "https://external-content.duckduckgo.com/ip3/youtube.com.ico",
      name: "YouTube",
      url: "https://www.youtube.com/results?search_query=",
    },
    {
      bang: { long: "!vimeo", short: "!vi" },
      icon: "https://external-content.duckduckgo.com/ip3/vimeo.com.ico",
      name: "Vimeo",
      url: "https://vimeo.com/search?q=",
    },
    {
      bang: { long: "!dailymotion", short: "!dm" },
      icon: "https://external-content.duckduckgo.com/ip3/dailymotion.com.ico",
      name: "Dailymotion",
      url: "https://www.dailymotion.com/search/",
    },
    {
      bang: { long: "!twitch", short: "!tw" },
      icon: "https://external-content.duckduckgo.com/ip3/twitch.tv.ico",
      name: "Twitch",
      url: "https://www.twitch.tv/search?term=",
    },
    {
      bang: { long: "!soundcloud", short: "!sc" },
      icon: "https://external-content.duckduckgo.com/ip3/soundcloud.com.ico",
      name: "SoundCloud",
      url: "https://soundcloud.com/search?q=",
    },
    {
      bang: { long: "!crunchyroll", short: "!cr" },
      icon: "https://external-content.duckduckgo.com/ip3/crunchyroll.com.ico",
      name: "Crunchyroll",
      url: "https://www.crunchyroll.com/search?q=",
    },
  ])
  .set("News", [
    {
      bang: { long: "!googlenews", short: "!gn" },
      icon: "https://external-content.duckduckgo.com/ip3/news.google.com.ico",
      name: "Google News",
      url: "https://news.google.com/search?q=",
    },
    {
      bang: { long: "!hackernews", short: "!hn" },
      icon: "https://external-content.duckduckgo.com/ip3/news.ycombinator.com.ico",
      name: "Hacker News",
      url: "https://hn.algolia.com/?q=",
    },
    {
      bang: { long: "!linkhut", short: "!lh" },
      icon: "https://external-content.duckduckgo.com/ip3/ln.ht.ico",
      name: "Linkhut",
      url: "https://ln.ht/search?q=",
    },
  ])
  .set("Search", [
    {
      bang: { long: "!google", short: "!g" },
      icon: "https://external-content.duckduckgo.com/ip3/google.com.ico",
      name: "Google",
      url: "https://www.google.com/search?q=",
    },
    {
      bang: { long: "!duckduckgo", short: "!ddg" },
      icon: "https://external-content.duckduckgo.com/ip3/duckduckgo.com.ico",
      name: "DuckDuckGo",
      url: "https://duckduckgo.com/?q=",
    },
    {
      bang: { long: "!bing", short: "!b" },
      icon: "https://external-content.duckduckgo.com/ip3/bing.com.ico",
      name: "Bing",
      url: "https://www.bing.com/search?q=",
    },
    {
      bang: { long: "!ecosia", short: "!eco" },
      icon: "https://external-content.duckduckgo.com/ip3/ecosia.org.ico",
      name: "Ecosia",
      url: "https://www.ecosia.org/search?q=",
    },
    {
      bang: { long: "!qwant", short: "!qw" },
      icon: "https://external-content.duckduckgo.com/ip3/qwant.com.ico",
      name: "Qwant",
      url: "https://www.qwant.com/?q=",
    },
    {
      bang: { long: "!baidu", short: "!ba" },
      icon: "https://external-content.duckduckgo.com/ip3/baidu.com.ico",
      name: "Baidu",
      url: "https://www.baidu.com/s?wd=",
    },
    {
      bang: { long: "!startpage", short: "!sp" },
      icon: "https://external-content.duckduckgo.com/ip3/startpage.com.ico",
      name: "Startpage",
      url: "https://www.startpage.com/do/search?q=",
    },
  ])
  .set("Shopping", [
    {
      bang: { long: "!amazon", short: "!a" },
      icon: "https://external-content.duckduckgo.com/ip3/amazon.com.ico",
      name: "Amazon",
      url: "https://www.amazon.com/s?k=",
    },
  ])
  .set("Social Media", [
    {
      bang: { long: "!facebook", short: "!fb" },
      icon: "https://external-content.duckduckgo.com/ip3/facebook.com.ico",
      name: "Facebook",
      url: "https://www.facebook.com/search/top/?q=",
    },
    {
      bang: { long: "!instagram", short: "!ig" },
      icon: "https://external-content.duckduckgo.com/ip3/instagram.com.ico",
      name: "Instagram",
      url: "https://www.instagram.com/explore/tags/",
    },
    {
      bang: { long: "!twitter", short: "!x" },
      icon: "https://external-content.duckduckgo.com/ip3/x.com.ico",
      name: "X / Twitter",
      url: "https://x.com/search?q=",
    },
    {
      bang: { long: "!tiktok", short: "!tk" },
      icon: "https://external-content.duckduckgo.com/ip3/tiktok.com.ico",
      name: "TikTok",
      url: "https://www.tiktok.com/search?q=",
    },
    {
      bang: { long: "!linkedin", short: "!li" },
      icon: "https://external-content.duckduckgo.com/ip3/linkedin.com.ico",
      name: "LinkedIn",
      url: "https://www.linkedin.com/search/results/all/?keywords=",
    },
    {
      bang: { long: "!reddit", short: "!r" },
      icon: "https://external-content.duckduckgo.com/ip3/reddit.com.ico",
      name: "Reddit",
      url: "https://reddit.com/search/?q=",
    },
    {
      bang: { long: "!redditold", short: "!ro" },
      icon: "https://external-content.duckduckgo.com/ip3/reddit.com.ico",
      name: "Reddit Old",
      url: "https://old.reddit.com/search/?q=",
    },
    {
      bang: { long: "!truthsocial", short: "!ts" },
      icon: "https://external-content.duckduckgo.com/ip3/truthsocial.com.ico",
      name: "Truth Social",
      url: "https://truthsocial.com/search?q=",
    },
  ])
  .set("Software Development", [
    {
      bang: { long: "!github", short: "!gh" },
      icon: "https://external-content.duckduckgo.com/ip3/github.com.ico",
      name: "GitHub",
      url: "https://github.com/search?q=",
    },
    {
      bang: { long: "!git", short: "!git" },
      icon: "https://external-content.duckduckgo.com/ip3/git-scm.com.ico",
      name: "Git (Docs)",
      url: "https://git-scm.com/search/results?search=",
    },
    {
      bang: { long: "!stackoverflow", short: "!so" },
      icon: "https://external-content.duckduckgo.com/ip3/stackoverflow.com.ico",
      name: "Stack Overflow",
      url: "https://stackoverflow.com/search?q=",
    },
    {
      bang: { long: "!mozilladevelopernetwork", short: "!mdn" },
      icon: "https://external-content.duckduckgo.com/ip3/developer.mozilla.org.ico",
      name: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/search?q=",
    },
    {
      bang: { long: "!noogle", short: "!ng" },
      icon: "https://external-content.duckduckgo.com/ip3/noogle.dev.ico",
      name: "Noogle",
      url: "https://www.noogle.dev/q?term=",
    },
    {
      bang: { long: "!nixospackages", short: "!nixpkgs" },
      icon: "https://external-content.duckduckgo.com/ip3/search.nixos.org.ico",
      name: "NixOS Packages",
      url: "https://search.nixos.org/packages?query=",
    },
    {
      bang: { long: "!nixoswiki", short: "!nixwiki" },
      icon: "https://external-content.duckduckgo.com/ip3/wiki.nixos.org.ico",
      name: "NixOS Wiki",
      url: "https://wiki.nixos.org/w/index.php?search=",
    },
    {
      bang: { long: "!nixosoptions", short: "!nixopts" },
      icon: "https://external-content.duckduckgo.com/ip3/search.nixos.org.ico",
      name: "NixOS Options",
      url: "https://search.nixos.org/options?query=",
    },
    {
      bang: { long: "!nixosdocs", short: "!nixdocs" },
      icon: "https://external-content.duckduckgo.com/ip3/nix.dev.ico",
      name: "NixOS Docs",
      url: "https://nix.dev/search.html?q=",
    },
    {
      bang: { long: "!dockerhub", short: "!dh" },
      icon: "https://external-content.duckduckgo.com/ip3/hub.docker.com.ico",
      name: "Docker Hub",
      url: "https://hub.docker.com/search?q=",
    },
  ])
  .set("Tools", [
    {
      bang: { long: "!deepl", short: "!dl" },
      icon: "https://external-content.duckduckgo.com/ip3/deepl.com.ico",
      name: "DeepL",
      url: "https://www.deepl.com/en/translator#en/en/",
    },
    {
      bang: { long: "!googlefonts", short: "!gf" },
      icon: "https://external-content.duckduckgo.com/ip3/fonts.google.com.ico",
      name: "Google Fonts",
      url: "https://fonts.google.com/?query=",
    },
    {
      bang: { long: "!googlemaps", short: "!gm" },
      icon: "https://external-content.duckduckgo.com/ip3/maps.google.com.ico",
      name: "Google Maps",
      url: "https://www.google.com/maps/search/",
    },
    {
      bang: { long: "!openstreetmap", short: "!osm" },
      icon: "https://external-content.duckduckgo.com/ip3/openstreetmap.org.ico",
      name: "OpenStreetMap",
      url: "https://www.openstreetmap.org/search?query=",
    },
    {
      bang: { long: "!virustotal", short: "!vt" },
      icon: "https://external-content.duckduckgo.com/ip3/virustotal.com.ico",
      name: "VirusTotal",
      url: "https://www.virustotal.com/gui/search/",
    },
    {
      bang: { long: "!wolframalpha", short: "!wa" },
      icon: "https://external-content.duckduckgo.com/ip3/wolframalpha.com.ico",
      name: "WolframAlpha",
      url: "https://www.wolframalpha.com/input/?i=",
    },
  ]);
