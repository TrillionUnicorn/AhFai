# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]: "500"
    - heading "Internal Error" [level=1] [ref=e5]
  - generic [ref=e8]:
    - generic [ref=e9]: "[plugin:@tailwindcss/vite:generate:serve] Cannot convert undefined or null to object"
    - generic [ref=e10]: /mnt/persist/workspace/src/app.css
    - generic [ref=e11]: "TypeError: Cannot convert undefined or null to object at B.generate (file:///mnt/persist/workspace/node_modules/@tailwindcss/vite/dist/index.mjs:1:5598) at async TransformPluginContext.transform (file:///mnt/persist/workspace/node_modules/@tailwindcss/vite/dist/index.mjs:1:3291) at async EnvironmentPluginContainer.transform (file:///mnt/persist/workspace/node_modules/vite/dist/node/chunks/dep-Bu492Fnd.js:42312:18) at async loadAndTransform (file:///mnt/persist/workspace/node_modules/vite/dist/node/chunks/dep-Bu492Fnd.js:35738:27) at async fetchModule (file:///mnt/persist/workspace/node_modules/vite/dist/node/chunks/dep-Bu492Fnd.js:46847:16) at async handleInvoke (file:///mnt/persist/workspace/node_modules/vite/dist/node/chunks/dep-Bu492Fnd.js:38991:22) at async EventEmitter.listenerForInvokeHandler (file:///mnt/persist/workspace/node_modules/vite/dist/node/chunks/dep-Bu492Fnd.js:39064:19"
    - generic [ref=e12]:
      - text: Click outside, press Esc key, or fix the code to dismiss.
      - text: You can also disable this overlay by setting
      - code [ref=e13]: server.hmr.overlay
      - text: to
      - code [ref=e14]: "false"
      - text: in
      - code [ref=e15]: vite.config.ts
      - text: .
```