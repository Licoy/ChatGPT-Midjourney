<div align="center">

<h1 align="center">🌻 ChatAny</h1>

[中文](./README.md) | English

One-click to own your own `ChatGPT` + `many AI` aggregation web service (based on [ChatGPT-Next-Web](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web) development)

[QQ Exchange Group](https://github.com/ChatAnyTeam/ChatAny/issues/30) | [💥PRO VERSION](https://github.com/Licoy/GoAmzAI)

[![WordPress+ChatGPT support](https://img.shields.io/badge/WordPress-AIGC%20deployment-red.svg?logo=wordpress&logoColor=red)](https://github.com/Licoy/wordpress-theme-puock)

![Main interface](./docs/images/step-2-en.png)

</div>

## Function support
> 🍭 PRO version supports more powerful functions:
> - Servers with a minimum of 1C1G can run smoothly
> - Baota's extremely fast visual deployment and easy-to-understand configuration
> - The site is fully adaptive and supports PC, tablet, and mobile phones
> - Low memory usage, Golang development native high concurrency support
> - Contains many AI modules such as AI dialogue, AI painting, AI music, AI video, AI generated PPT, PDF parsing dialogue, AI application support, etc.
> - Has a very complete operating mechanism, including but not limited to package system, redemption code system, invitation rewards, sign-in benefits, promotion rebates, etc.
> - [🫱 Click me to learn and experience the PRO version immediately](https://github.com/Licoy/GoAmzAI)

### Already supported
- [x] All functions of the original `ChatGPT-Next-Web`
- [x] MiniMax (MiniMax-M2.7 / MiniMax-M2.5 / MiniMax-M2.5-highspeed)
- [x] StabilityAI
  - [x] Support for Stable Image Ultra
  - [x] Support for Stable Image Core
  - [x] Support for Stable Diffusion 3
- [x] Midjourney `(unofficial)`
  - [x] Midjourney `Imgine` `Upscale` `Variation` `Zoom` `Vary` `Pan` `Reroll` `Describe` `Blend` and many other operations, perfectly supporting any operation after Midjourney image generation
  - [x] Midjourney region redrawing (Vary Region) support
  - [x] Midjourney reference image
  - [x] Drawing progress percentage, real-time image display

## MidjourneyAPI description
> The Midjourney-related API interface of this project uses the following open source projects or similar projects to provide API generation capability support. Before using this project, you need to build this service yourself, or use the API of a third-party transit platform.

### Open Source Midjourney-Proxy
- Project address: [trueai-org/midjourney-proxy](https://github.com/trueai-org/midjourney-proxy)

## Parameter Description
### `MJ_PROXY_URL`
MJ Proxy API link address
### `MJ_PROXY_KEY`
MJ Proxy API key
### `MINIMAX_API_KEY`
(Optional) MiniMax API key for using MiniMax models (MiniMax-M2.7, MiniMax-M2.5, etc.)
### `CODE`
(Optional) Set the access password on the page
### `...Other parameters`
Same as ChatGPT-Next-Web

## Deployment
### Docker
```shell
docker run -d -p 3000:3000 \
-e OPENAI_API_KEY="sk-xxx" \
-e BASE_URL="https://api.openai.com" \
-e MJ_PROXY_URL="" \
-e MJ_PROXY_KEY="" \ licoy/chatany:latest
```
### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FChatAnyTeam%2FChatAny&env=OPENAI_API_KEY&env=MJ_PROXY_URL&env=MJ_PROXY_KEY&env=CODE&project-name=chat-any&repository-name=ChatAny)
### Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/1g6vDL?referralCode=vvEj-K)
### Sealos
[![](https://raw.githubusercontent.com/labring-actions/templates/main/Deploy-on-Sealos.svg)](https://cloud.sealos.io/?openapp=system-template%3FtemplateName%3Dchatany)

### Manual deployment
- Clone this project to local
- Install dependencies
```shell
npm install
npm run build
npm run start // #Or start in development mode: npm run dev
```

## Use
### Create a painting
After deployment, click the painting in the upper left corner and select the painting model you need to use to enter:
![step-1](./docs/images/step-1-en.png)
## Screenshots
### Midjourney generates the main interface
![step-1](./docs/images/step-2-en.png)
### Midjourney Vary Region
![step-1](./docs/images/step-5-en.png)
### StabilityAI generates the main interface
![step-1](./docs/images/step-3-en.png)
### Custom configuration interface
![step-1](./docs/images/step-4-en.png)
### More features
Waiting for you to discover

## Third-party transfer API
> The following is a third-party transfer API. This project does not provide any guarantee. Please choose to use it by yourself. If you encounter any questions, please contact the corresponding platform customer service.

[![GPTNB transfer API](https://img.shields.io/badge/GPTNB%20API-2E8B57.svg?logo=openai&logoColor=green&style=for-the-badge)](https://goapi.gptnb.ai)

[![VMAN transfer API](https://img.shields.io/badge/VMAN%20API-50616D.svg?logo=openai&logoColor=green&style=for-the-badge)](https://api.mjdjourney.cn)


## Open source agreement
[MIT](./LICENSE)