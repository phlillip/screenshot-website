# Screenshot Website

## Description

**This is used to generate screenshots from a website.**

It relies on the presence of a sitemap at `http://www.<domain>/sitemap.xml`

## Usage

```
npm run start <domain> <limit>
```

`domain` should comprise of the main domain and extension only, e.g. `google.com`.
`limit` is optional and sets the maximum number of screenshots that will be generated.